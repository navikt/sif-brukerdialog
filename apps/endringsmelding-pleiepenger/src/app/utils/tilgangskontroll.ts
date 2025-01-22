import { DateRange, durationToDecimalDuration, ensureDateRange, sortDateRange } from '@navikt/sif-common-utils';
import {
    ArbeidsgiverMedAnsettelseperioder,
    IngenTilgangÅrsak,
    K9Sak,
    K9SakArbeidstaker,
    K9SakArbeidstid,
    K9SakArbeidstidInfo,
} from '@types';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import { IngenTilgangMeta } from '../hooks/useSøknadInitialData';
import { finnesArbeidsgiverIK9Sak, getSamletDateRangeForK9Saker } from './k9SakUtils';

dayjs.extend(isSameOrAfter);

type TilgangNektet = {
    kanBrukeSøknad: false;
    årsak: IngenTilgangÅrsak[];
    ingenTilgangMeta?: IngenTilgangMeta;
};

type TilgangTillatt = {
    kanBrukeSøknad: true;
};

export type TilgangKontrollResultat = TilgangNektet | TilgangTillatt;

export const tilgangskontroll = (
    saker: K9Sak[],
    tillattEndringsperiode: DateRange,
    arbeidsgivere: ArbeidsgiverMedAnsettelseperioder[],
): TilgangKontrollResultat => {
    /** Har ingen saker */
    if (saker.length === 0) {
        return {
            kanBrukeSøknad: false,
            årsak: [IngenTilgangÅrsak.harIngenSak],
        };
    }

    /** Har flere saker */
    if (saker.length > 1) {
        return {
            kanBrukeSøknad: false,
            årsak: [IngenTilgangÅrsak.harMerEnnEnSak],
        };
    }

    /** Bruker har bare én sak */
    const sak = saker[0];
    const ingenTilgangÅrsak: IngenTilgangÅrsak[] = [];

    /** Søknadsperiode er før tillatt endringsperiode */
    if (!harSøknadsperiodeInnenforTillattEndringsperiode(getSamletDateRangeForK9Saker([sak]), tillattEndringsperiode)) {
        ingenTilgangÅrsak.push(IngenTilgangÅrsak.søknadsperioderUtenforTillattEndringsperiode);
    }

    /** Bruker er SN */
    if (harArbeidstidSomSelvstendigNæringsdrivende(sak)) {
        ingenTilgangÅrsak.push(IngenTilgangÅrsak.harArbeidstidSomSelvstendigNæringsdrivende);
    }

    /** Bruker har ansettelsperioder hos samme arbeidsgiver som starter og stopper samme uke, med opphold mellom */
    if (harAnsettelsesforholdSomStarterOgSlutterSammeUkeMedOpphold(sak, tillattEndringsperiode, arbeidsgivere)) {
        ingenTilgangÅrsak.push(IngenTilgangÅrsak.enArbeidsgiverToAnsettelserSammeUkeMedOpphold);
    }

    if (ingenTilgangÅrsak.length > 0) {
        return {
            kanBrukeSøknad: false,
            årsak: ingenTilgangÅrsak,
            ingenTilgangMeta: getIngenTilgangMeta(sak.ytelse.arbeidstid),
        };
    }

    return {
        kanBrukeSøknad: true,
    };
};

const harArbeidstidPerioder = (arbeidstidInfo?: K9SakArbeidstidInfo): boolean => {
    return (
        arbeidstidInfo !== undefined &&
        Object.keys(arbeidstidInfo.perioder).length > 0 &&
        Object.keys(arbeidstidInfo.perioder)
            .map((key) => durationToDecimalDuration(arbeidstidInfo.perioder[key].jobberNormaltTimerPerDag))
            .some((decimalDuration) => {
                return decimalDuration > 0;
            })
    );
};

const getIngenTilgangMeta = (arbeidstid: K9SakArbeidstid): IngenTilgangMeta => {
    const { arbeidstakerList, frilanserArbeidstidInfo, selvstendigNæringsdrivendeArbeidstidInfo } = arbeidstid;
    return {
        erArbeidstaker: arbeidstakerList?.some((a) => harArbeidstidPerioder(a.arbeidstidInfo)),
        erFrilanser: harArbeidstidPerioder(frilanserArbeidstidInfo),
        erSN: harArbeidstidPerioder(selvstendigNæringsdrivendeArbeidstidInfo),
    };
};

const harArbeidsgiverUtenArbeidsaktivitet = (
    arbeidsgivere: ArbeidsgiverMedAnsettelseperioder[],
    k9SakArbeidstaker: K9SakArbeidstaker[] = [],
): boolean => {
    return arbeidsgivere.some((arbeidsgiver) => {
        return finnesArbeidsgiverIK9Sak(arbeidsgiver, k9SakArbeidstaker) === false;
    });
};

const harArbeidstidSomSelvstendigNæringsdrivende = (sak: K9Sak) => {
    const { selvstendigNæringsdrivendeArbeidstidInfo: sn } = sak.ytelse.arbeidstid;
    return sn !== undefined && sn.perioder && Object.keys(sn.perioder).length > 0;
};

const harSøknadsperiodeInnenforTillattEndringsperiode = (
    samletSøknadsperiode: DateRange | undefined,
    tillattEndringsperiode: DateRange,
): boolean => {
    return samletSøknadsperiode
        ? dayjs(samletSøknadsperiode.to).isSameOrAfter(tillattEndringsperiode.from, 'day')
        : false;
};

const harAnsettelsesforholdSomStarterOgSlutterSammeUkeMedOpphold = (
    sak: K9Sak,
    tillatEndringsperiode: DateRange,
    arbeidsgivere: ArbeidsgiverMedAnsettelseperioder[],
): boolean => {
    const orgnrISak = (sak.ytelse.arbeidstid.arbeidstakerList || []).map((a) => a.organisasjonsnummer);
    return arbeidsgivere
        .filter((a) => orgnrISak.includes(a.organisasjonsnummer))
        .some((arbeidsgiver) => {
            const ansettelserInnenforEndringsperiode = arbeidsgiver.ansettelsesperioder.map((d) =>
                ensureDateRange(d, tillatEndringsperiode),
            );
            return perioderSlutterOgStarterSammeUkeMedOpphold(ansettelserInnenforEndringsperiode);
        });
};

/**
 * Går gjennom array for å se om det er perioder som slutter og starter innenfor samme
 * uke, og hvor det er opphold på en dag mellom periodene.
 * @param ansettelsesperioder DateRange
 * @returns boolean
 */
const perioderSlutterOgStarterSammeUkeMedOpphold = (ansettelsesperioder: DateRange[]) => {
    return ansettelsesperioder.sort(sortDateRange).some((periode, index) => {
        if (index === 0) {
            return false;
        }
        const forrigePeriode = ansettelsesperioder[index - 1];

        /** Slutter og starter periodene innenfor samme uke */
        if (!dayjs(periode.from).isSame(dayjs(forrigePeriode.to), 'isoWeek')) {
            return false;
        }
        /** Periodene er sammenhengende */
        if (dayjs(periode.from).diff(forrigePeriode.to, 'day') === 1) {
            return false;
        }

        return true;
    });
};

export const tilgangskontrollUtils = {
    getIngenTilgangMeta,
    harArbeidsgiverUtenArbeidsaktivitet,
    harSøknadsperiodeInnenforTillattEndringsperiode,
    slutterOgStarterHosArbeidsgiverSammeUke: perioderSlutterOgStarterSammeUkeMedOpphold,
};
