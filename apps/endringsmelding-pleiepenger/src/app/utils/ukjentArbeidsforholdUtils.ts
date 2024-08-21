import {
    DateRange,
    dateRangeToISODateRange,
    dateToISODate,
    Duration,
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
    Arbeidsgiver,
    ArbeidstidEnkeltdagMap,
    ArbeidstidPerDag,
    ArbeidsukeMap,
    PeriodeMedArbeidstid,
    UkjentArbeidsforholdSøknadsdata,
} from '@types';
import { ArbeidsaktivitetFormValuesMap } from '../søknad/steps/arbeidstid/ArbeidstidForm';
import { getArbeidsukeFromEnkeltdagerIUken } from './arbeidsukeUtils';
import { beregnSnittTimerPerDag } from './beregnUtils';

export const getSøknadsperioderForUkjentArbeidsforhold = (
    søknadsperioder: DateRange[],
    ansattFom: Date | undefined,
    ansattTom: Date | undefined,
): DateRange[] => {
    const alleSøknadsperioder: DateRange = getDateRangeFromDateRanges(søknadsperioder);
    const ansettelsesperiode = {
        from: ansattFom || alleSøknadsperioder.from,
        to: ansattTom || alleSøknadsperioder.to,
    };
    return ansettelsesperiode ? getDateRangesWithinDateRange(søknadsperioder, ansettelsesperiode) : søknadsperioder;
};

export const getPerioderMedArbeidstidForUkjentArbeidsforhold = (
    søknadsperioder: DateRange[],
    { ansattFom, ansattTom }: Arbeidsgiver,
    normalarbeidstidPerUke: Duration,
    faktiskArbeidstidPerUke: Duration | undefined,
): PeriodeMedArbeidstid[] => {
    const søknadsperioderForArbeidsforhold = getSøknadsperioderForUkjentArbeidsforhold(
        søknadsperioder,
        ansattFom,
        ansattTom,
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
            arbeidsuker[dateRangeToISODateRange(uke)] = getArbeidsukeFromEnkeltdagerIUken(uke, enkeldagerMap);
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

export const getArbeidsaktivitetForUkjentArbeidsforhold = (
    søknadsperioder: DateRange[],
    arbeidsgiver: Arbeidsgiver,
    arbeidsforhold: ArbeidsforholdAktivt,
    arbeiderIPerioden?: ArbeiderIPeriodenSvar,
): Arbeidsaktivitet => {
    const faktiskArbeidstid = getFaktiskArbeidstidPerUkeForUkjentArbeidsforhold(arbeidsforhold, arbeiderIPerioden);

    const aktivitet: Arbeidsaktivitet = {
        key: arbeidsgiver.key,
        type: ArbeidsaktivitetType.arbeidstaker,
        arbeidsgiver,
        erUkjentArbeidsforhold: true,
        navn: arbeidsgiver.navn,
        harPerioderEtterTillattEndringsperiode: false,
        harPerioderFørTillattEndringsperiode: false,
        perioderMedArbeidstid: getPerioderMedArbeidstidForUkjentArbeidsforhold(
            søknadsperioder,
            arbeidsgiver,
            arbeidsforhold.normalarbeidstid.timerPerUke,
            faktiskArbeidstid,
        ),
    };
    return aktivitet;
};

export const getArbeidsaktiviteterForUkjenteArbeidsforhold = (
    søknadsperioder: DateRange[],
    arbeidsgivereIkkeISak: Arbeidsgiver[],
    arbeidsaktivitetFormValues: ArbeidsaktivitetFormValuesMap,
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
                arbeiderIPerioden,
            ),
        );
    });
    return aktiviteter;
};
