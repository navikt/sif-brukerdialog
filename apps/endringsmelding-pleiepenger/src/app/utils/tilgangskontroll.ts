import { DateRange, durationToDecimalDuration } from '@navikt/sif-common-utils';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import { IngenTilgangMeta } from '../hooks/useSøknadInitialData';
import { Arbeidsgiver } from '../types/Arbeidsgiver';
import { IngenTilgangÅrsak } from '../types/IngenTilgangÅrsak';
import { K9Sak, K9SakArbeidstaker, K9SakArbeidstid, K9SakArbeidstidInfo } from '../types/K9Sak';
import { getSamletDateRangeForK9Saker } from './k9SakUtils';
import { Feature, isFeatureEnabled } from './featureToggleUtils';

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
    arbeidsgivere: Arbeidsgiver[],
    tillattEndringsperiode: DateRange
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

    /** Bruker har registrert arbeidsaktivitet i sak på arbeidsgiver som ikke er registrert i AAreg */
    if (harArbeidsaktivitetUtenArbeidsgiver(sak.ytelse.arbeidstid.arbeidstakerList, arbeidsgivere)) {
        ingenTilgangÅrsak.push(IngenTilgangÅrsak.harArbeidsaktivitetUtenArbeidsgiver);
    }

    /** Bruker er SN */
    if (harArbeidstidSomSelvstendigNæringsdrivende(sak)) {
        ingenTilgangÅrsak.push(IngenTilgangÅrsak.harArbeidstidSomSelvstendigNæringsdrivende);
    }

    /**
     * Bruker har arbeidsgiver i aareg som ikke har informasjon i sak = nytt arbeidsforhold
     */
    if (isFeatureEnabled(Feature.NY_ARBEIDSGIVER) === false) {
        if (harArbeidsgiverUtenArbeidsaktivitet(arbeidsgivere, sak.ytelse.arbeidstid.arbeidstakerList)) {
            ingenTilgangÅrsak.push(IngenTilgangÅrsak.harArbeidsgiverUtenArbeidsaktivitet);
        }
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
    arbeidsgivere: Arbeidsgiver[],
    k9SakArbeidstaker: K9SakArbeidstaker[] = []
): boolean => {
    return arbeidsgivere.some((arbeidsgiver) => {
        return finnesArbeidsgiverIK9Sak(arbeidsgiver, k9SakArbeidstaker) === false;
    });
};

const harArbeidsaktivitetUtenArbeidsgiver = (
    arbeidsaktiviteter: K9SakArbeidstaker[] = [],
    arbeidsgivere: Arbeidsgiver[]
) => {
    return arbeidsaktiviteter
        .map(getArbeidsaktivitetId)
        .some((id) => arbeidsgivere.some((aISak) => aISak.id === id) === false);
};

export const finnesArbeidsgiverIK9Sak = (
    arbeidsgiver: Arbeidsgiver,
    arbeidsgivereISak: K9SakArbeidstaker[]
): boolean => {
    return arbeidsgivereISak.map(getArbeidsaktivitetId).some((id) => id === arbeidsgiver.id);
};

const harArbeidstidSomSelvstendigNæringsdrivende = (sak: K9Sak) => {
    const { selvstendigNæringsdrivendeArbeidstidInfo: sn } = sak.ytelse.arbeidstid;
    return sn !== undefined && sn.perioder && Object.keys(sn.perioder).length > 0;
};

const getArbeidsaktivitetId = (arbeidsaktivitet: K9SakArbeidstaker): string => {
    return arbeidsaktivitet.norskIdentitetsnummer || arbeidsaktivitet.organisasjonsnummer;
};

const harSøknadsperiodeInnenforTillattEndringsperiode = (
    samletSøknadsperiode: DateRange | undefined,
    tillattEndringsperiode: DateRange
): boolean => {
    return samletSøknadsperiode
        ? dayjs(samletSøknadsperiode.to).isSameOrAfter(tillattEndringsperiode.from, 'day')
        : false;
};

export const tilgangskontrollUtils = {
    getIngenTilgangMeta,
    harArbeidsgiverUtenArbeidsaktivitet,
    harArbeidsaktivitetUtenArbeidsgiver,
    harSøknadsperiodeInnenforTillattEndringsperiode,
};
