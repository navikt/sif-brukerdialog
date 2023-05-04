import {
    DateRange,
    dateRangeToISODateRange,
    dateToISODate,
    Duration,
    getDateRangesWithinDateRange,
    getDatesInDateRange,
    getWeeksInDateRange,
} from '@navikt/sif-common-utils';
import { getDateRangeFromDateRanges } from '@navikt/sif-common-utils/lib';
import { Arbeidsgiver } from '../types/Arbeidsgiver';
import {
    ArbeidAktivitet,
    ArbeidAktivitetType,
    ArbeidstidEnkeltdagMap,
    ArbeidsukeMap,
    FaktiskOgNormalArbeidstid,
    PeriodeMedArbeidstid,
} from '../types/Sak';
import { ArbeidssituasjonSøknadsdata } from '../types/søknadsdata/ArbeidssituasjonSøknadsdata';
import { getArbeidsukeFromEnkeltdagerIUken } from './arbeidsukeUtils';
import { beregnSnittTimerPerDag } from './beregnUtils';
import { ArbeiderIPeriodenSvar } from '../søknad/steps/arbeidssituasjon/components/ArbeidsforholdForm';

export const getSøknadsperioderForNyttArbeidsforhold = (
    søknadsperioder: DateRange[],
    ansattFom: Date | undefined,
    ansattTom: Date | undefined
): DateRange[] => {
    const alleSøknadsperioder: DateRange = getDateRangeFromDateRanges(søknadsperioder);
    const ansettelsesperiode = {
        from: ansattFom || alleSøknadsperioder.from,
        to: ansattTom || alleSøknadsperioder.to,
    };
    return ansettelsesperiode ? getDateRangesWithinDateRange(søknadsperioder, ansettelsesperiode) : søknadsperioder;
};

export const getPerioderMedArbeidstidForNyArbeidsgiver = (
    søknadsperioder: DateRange[],
    { ansattFom, ansattTom }: Arbeidsgiver,
    normalarbeidstidPerUke: Duration,
    faktiskArbeidstidPerUke: Duration
): PeriodeMedArbeidstid[] => {
    const søknadsperioderForArbeidsforhold = getSøknadsperioderForNyttArbeidsforhold(
        søknadsperioder,
        ansattFom,
        ansattTom
    );
    const perioderMedArbeidstid: PeriodeMedArbeidstid[] = [];

    const arbeidstidPerDag: FaktiskOgNormalArbeidstid = {
        faktisk: beregnSnittTimerPerDag(faktiskArbeidstidPerUke, 5),
        normalt: beregnSnittTimerPerDag(normalarbeidstidPerUke, 5),
    };
    søknadsperioderForArbeidsforhold.forEach((periode) => {
        const uker = getWeeksInDateRange(periode);
        const arbeidsuker: ArbeidsukeMap = {};
        uker.forEach((uke) => {
            const enkeldagerMap: ArbeidstidEnkeltdagMap = {};
            getDatesInDateRange(uke, true).forEach((date) => {
                enkeldagerMap[dateToISODate(date)] = arbeidstidPerDag;
            });
            arbeidsuker[dateRangeToISODateRange(uke)] = getArbeidsukeFromEnkeltdagerIUken(uke, enkeldagerMap);
        });
        perioderMedArbeidstid.push({
            arbeidsuker,
            ...periode,
        });
    });
    return perioderMedArbeidstid;
};

export const getArbeidAktiviteterFromNyeArbeidsforhold = (
    søknadsperioder: DateRange[],
    nyeArbeidsgivere: Arbeidsgiver[],
    arbeidssituasjon?: ArbeidssituasjonSøknadsdata
): ArbeidAktivitet[] => {
    const aktiviteter: ArbeidAktivitet[] = [];
    nyeArbeidsgivere.forEach((arbeidsgiver) => {
        const arbeidsforhold = arbeidssituasjon?.arbeidsforhold.find(
            (s) => s.arbeidsgiverId === arbeidsgiver.organisasjonsnummer
        );
        if (!arbeidsforhold || arbeidsforhold.erAnsatt === false) {
            throw 'Arbeidssituasjoninfo mangler for arbeidsgiver';
        }

        const faktiskArbeidstid: Duration =
            arbeidsforhold.arbeiderIPerioden === ArbeiderIPeriodenSvar.somVanlig
                ? arbeidsforhold.normalarbeidstid.timerPerUke
                : { hours: '0', minutes: '0' };

        const aktivitet: ArbeidAktivitet = {
            type: ArbeidAktivitetType.arbeidstaker,
            arbeidsgiver,
            erNyArbeidsaktivitet: true,
            id: arbeidsgiver.organisasjonsnummer,
            navn: arbeidsgiver.navn,
            harPerioderEtterTillattEndringsperiode: false,
            harPerioderFørTillattEndringsperiode: false,
            perioderMedArbeidstid: getPerioderMedArbeidstidForNyArbeidsgiver(
                søknadsperioder,
                arbeidsgiver,
                arbeidsforhold.normalarbeidstid.timerPerUke,
                faktiskArbeidstid
            ),
        };
        aktiviteter.push(aktivitet);
    });
    return aktiviteter;
};
