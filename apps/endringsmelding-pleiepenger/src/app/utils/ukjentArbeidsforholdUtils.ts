import {
    DateRange,
    dateRangeToISODateRange,
    dateToISODate,
    Duration,
    ensureDateRange,
    getDateRangeFromDateRanges,
    getDateRangesWithinDateRange,
    getDatesInDateRange,
    getWeeksInDateRange,
} from '@navikt/sif-common-utils';
import {
    ArbeiderIPeriodenSvar,
    Arbeidsaktivitet,
    ArbeidsaktivitetType,
    ArbeidsforholdAktivt,
    ArbeidsgiverMedAnsettelseperioder,
    ArbeidstidEnkeltdagMap,
    ArbeidstidPerDag,
    ArbeidsukeMap,
    PeriodeMedArbeidstid,
    UkjentArbeidsforholdSøknadsdata,
} from '@types';
import { ArbeidsaktivitetFormValuesMap } from '../søknad/steps/arbeidstid/ArbeidstidForm';
// import { getArbeidsukeFromEnkeltdagerIUken } from './arbeidsukeUtils';
import { beregnSnittTimerPerDag } from './beregnUtils';
import { getArbeidsukeFromEnkeltdagerIUken } from './getSakFromK9Sak';

export const getSøknadsperioderForUkjentArbeidsforhold = (
    søknadsperioder: DateRange[],
    ansattFom: Date | undefined,
    ansattTom: Date | undefined,
): DateRange[] => {
    const alleSøknadsperioder: DateRange = getDateRangeFromDateRanges(søknadsperioder);
    /** TODO - sjekke denne opp mot flere ansattelsesperioder */
    const ansettelsesperiode = {
        from: ansattFom || alleSøknadsperioder.from,
        to: ansattTom || alleSøknadsperioder.to,
    };
    return ansettelsesperiode ? getDateRangesWithinDateRange(søknadsperioder, ansettelsesperiode) : søknadsperioder;
};

export const getPerioderMedArbeidstidForUkjentArbeidsforhold = (
    søknadsperioder: DateRange[],
    ansettelsesperiode: DateRange,
    normalarbeidstidPerUke: Duration,
    faktiskArbeidstidPerUke: Duration | undefined,
): PeriodeMedArbeidstid[] => {
    const søknadsperioderForArbeidsforhold = getSøknadsperioderForUkjentArbeidsforhold(
        søknadsperioder,
        ansettelsesperiode.from,
        ansettelsesperiode.to,
    );

    const perioderMedArbeidstid: PeriodeMedArbeidstid[] = [];

    const arbeidstidPerDag: ArbeidstidPerDag = {
        faktisk: faktiskArbeidstidPerUke ? beregnSnittTimerPerDag(faktiskArbeidstidPerUke, 5) : undefined,
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
            if (Object.keys(enkeldagerMap).length > 0) {
                arbeidsuker[dateRangeToISODateRange(uke)] = getArbeidsukeFromEnkeltdagerIUken(uke, enkeldagerMap);
            }
        });
        perioderMedArbeidstid.push({
            arbeidsuker,
            ...periode,
        });
    });
    return perioderMedArbeidstid;
};

export const getFaktiskArbeidstidPerUkeForUkjentArbeidsforhold = (
    arbeidsforhold: ArbeidsforholdAktivt,
    arbeiderIPerioden?: ArbeiderIPeriodenSvar,
): Duration | undefined => {
    switch (arbeiderIPerioden) {
        case ArbeiderIPeriodenSvar.heltFravær:
            return { hours: '0', minutes: '0' };
        case ArbeiderIPeriodenSvar.somVanlig:
            return { ...arbeidsforhold.normalarbeidstid.timerPerUke };
        case ArbeiderIPeriodenSvar.redusert:
        default:
            return undefined;
    }
};

/**
 * Henter ut Arbeidsaktiviet for ukjent arbeidsforhold
 * @param søknadsperioder Alle perioder som er søkt for
 * @param arbeidsgiver  Arbeidsgiveren det gjelder som ikke er registrert i sak
 * @param arbeidsforhold Arbeidsforhold utledet tidligere - holder om en er ansatt eller ikke, og evt. normalarbeidstid. Hentes på eget steg
 * @param endringsperiode tidsrommet som en kan gjøre endringer i
 * @param arbeiderIPerioden om bruker sier en arbeider, arbeider delvis eller arbeider ikke i perioden
 * @returns Arbeidsaktivitet
 */
export const getArbeidsaktivitetForUkjentArbeidsforhold = (
    søknadsperioder: DateRange[],
    arbeidsgiver: ArbeidsgiverMedAnsettelseperioder,
    arbeidsforhold: ArbeidsforholdAktivt,
    endringsperiode: DateRange,
    arbeiderIPerioden?: ArbeiderIPeriodenSvar,
): Arbeidsaktivitet => {
    const faktiskArbeidstid = getFaktiskArbeidstidPerUkeForUkjentArbeidsforhold(arbeidsforhold, arbeiderIPerioden);
    if (arbeidsgiver.ansettelsesperioder.length !== 1) {
        throw 'Ukjent arbeidsforhold kan kun ha en ansettelsesperiode';
    }
    const ansettelsesperiode = ensureDateRange(arbeidsgiver.ansettelsesperioder[0], endringsperiode);

    const aktivitet: Arbeidsaktivitet = {
        key: arbeidsgiver.key,
        type: ArbeidsaktivitetType.arbeidstaker,
        arbeidsgiver,
        erUkjentArbeidsforhold: true,
        navn: arbeidsgiver.navn,
        harPerioderEtterTillattEndringsperiode: false,
        harPerioderFørTillattEndringsperiode: false,
        ansettelsesperioderInnenforEndringsperiode: [ansettelsesperiode],
        perioderMedArbeidstid: getPerioderMedArbeidstidForUkjentArbeidsforhold(
            søknadsperioder,
            ansettelsesperiode,
            arbeidsforhold.normalarbeidstid.timerPerUke,
            faktiskArbeidstid,
        ),
    };
    return aktivitet;
};

export const getArbeidsaktiviteterForUkjenteArbeidsforhold = (
    søknadsperioder: DateRange[],
    arbeidsgivereIkkeISak: ArbeidsgiverMedAnsettelseperioder[],
    arbeidsaktivitetFormValues: ArbeidsaktivitetFormValuesMap,
    endringsperiode: DateRange,
    ukjentArbeidsforhold?: UkjentArbeidsforholdSøknadsdata,
): Arbeidsaktivitet[] => {
    const aktiviteter: Arbeidsaktivitet[] = [];
    arbeidsgivereIkkeISak.forEach((arbeidsgiver) => {
        const arbeidsforhold = ukjentArbeidsforhold?.arbeidsforhold.find((s) => s.arbeidsgiverKey === arbeidsgiver.key);
        if (!arbeidsforhold) {
            throw 'UkjentArbeidsforholdinfo mangler for arbeidsgiver';
        }
        if (arbeidsforhold.erAnsatt === false) {
            return;
        }
        const arbeiderIPerioden = arbeidsaktivitetFormValues[arbeidsgiver.key]?.arbeiderIPerioden;
        aktiviteter.push(
            getArbeidsaktivitetForUkjentArbeidsforhold(
                søknadsperioder,
                arbeidsgiver,
                arbeidsforhold,
                endringsperiode,
                arbeiderIPerioden,
            ),
        );
    });
    return aktiviteter;
};
