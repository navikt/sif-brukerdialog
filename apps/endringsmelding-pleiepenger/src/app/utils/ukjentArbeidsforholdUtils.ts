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
import { ArbeidAktivitetFormValuesMap } from '../søknad/steps/arbeidstid/ArbeidstidForm';
import { ArbeiderIPeriodenSvar } from '../types/arbeiderIPeriodenSvar';
import { ArbeidsforholdAktivt } from '../types/Arbeidsforhold';
import { Arbeidsgiver } from '../types/Arbeidsgiver';
import {
    ArbeidAktivitet,
    ArbeidAktivitetType,
    ArbeidstidEnkeltdagMap,
    ArbeidstidPerDag,
    ArbeidsukeMap,
    PeriodeMedArbeidstid,
} from '../types/Sak';
import { UkjentArbeidsforholdSøknadsdata } from '../types/søknadsdata/UkjentArbeidsforholdSøknadsdata';
import { getArbeidsukeFromEnkeltdagerIUken } from './arbeidsukeUtils';
import { beregnSnittTimerPerDag } from './beregnUtils';

export const getSøknadsperioderForUkjentArbeidsforhold = (
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

export const getPerioderMedArbeidstidForUkjentArbeidsforhold = (
    søknadsperioder: DateRange[],
    { ansattFom, ansattTom }: Arbeidsgiver,
    normalarbeidstidPerUke: Duration,
    faktiskArbeidstidPerUke: Duration | undefined
): PeriodeMedArbeidstid[] => {
    const søknadsperioderForArbeidsforhold = getSøknadsperioderForUkjentArbeidsforhold(
        søknadsperioder,
        ansattFom,
        ansattTom
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
    arbeiderIPerioden?: ArbeiderIPeriodenSvar
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

export const getArbeidAktivitetForUkjentArbeidsforhold = (
    søknadsperioder: DateRange[],
    arbeidsgiver: Arbeidsgiver,
    arbeidsforhold: ArbeidsforholdAktivt,
    arbeiderIPerioden?: ArbeiderIPeriodenSvar
): ArbeidAktivitet => {
    const faktiskArbeidstid = getFaktiskArbeidstidPerUkeForUkjentArbeidsforhold(arbeidsforhold, arbeiderIPerioden);

    const aktivitet: ArbeidAktivitet = {
        key: arbeidsgiver.key,
        type: ArbeidAktivitetType.arbeidstaker,
        arbeidsgiver,
        erUkjentArbeidsaktivitet: true,
        navn: arbeidsgiver.navn,
        harPerioderEtterTillattEndringsperiode: false,
        harPerioderFørTillattEndringsperiode: false,
        perioderMedArbeidstid: getPerioderMedArbeidstidForUkjentArbeidsforhold(
            søknadsperioder,
            arbeidsgiver,
            arbeidsforhold.normalarbeidstid.timerPerUke,
            faktiskArbeidstid
        ),
    };
    return aktivitet;
};

export const getArbeidAktiviteterForUkjenteArbeidsgivere = (
    søknadsperioder: DateRange[],
    ukjenteArbeidsgivere: Arbeidsgiver[],
    arbeidAktivitetFormValues: ArbeidAktivitetFormValuesMap,
    ukjentArbeidsforhold?: UkjentArbeidsforholdSøknadsdata
): ArbeidAktivitet[] => {
    const aktiviteter: ArbeidAktivitet[] = [];
    ukjenteArbeidsgivere.forEach((arbeidsgiver) => {
        const arbeidsforhold = ukjentArbeidsforhold?.arbeidsforhold.find((s) => s.arbeidsgiverKey === arbeidsgiver.key);
        if (!arbeidsforhold) {
            throw 'UkjentArbeidsforholdinfo mangler for arbeidsgiver';
        }
        if (arbeidsforhold.erAnsatt === false) {
            return;
        }
        const arbeiderIPerioden = arbeidAktivitetFormValues[arbeidsgiver.key]?.arbeiderIPerioden;
        aktiviteter.push(
            getArbeidAktivitetForUkjentArbeidsforhold(søknadsperioder, arbeidsgiver, arbeidsforhold, arbeiderIPerioden)
        );
    });
    return aktiviteter;
};
