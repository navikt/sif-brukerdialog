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
import { ArbeidssituasjonSøknadsdata } from '../types/søknadsdata/ArbeidssituasjonSøknadsdata';
import { getArbeidsukeFromEnkeltdagerIUken } from './arbeidsukeUtils';
import { beregnSnittTimerPerDag } from './beregnUtils';

export const getSøknadsperioderForUkjentArbeidsgiver = (
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

export const getPerioderMedArbeidstidForUkjentArbeidsgiver = (
    søknadsperioder: DateRange[],
    { ansattFom, ansattTom }: Arbeidsgiver,
    normalarbeidstidPerUke: Duration,
    faktiskArbeidstidPerUke: Duration | undefined
): PeriodeMedArbeidstid[] => {
    const søknadsperioderForArbeidsforhold = getSøknadsperioderForUkjentArbeidsgiver(
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

export const getFaktiskArbeidstidPerUkeForUkjentArbeidsgiver = (
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

export const getArbeidAktivitetForUkjentArbeidsgiver = (
    søknadsperioder: DateRange[],
    arbeidsgiver: Arbeidsgiver,
    arbeidsforhold: ArbeidsforholdAktivt,
    arbeiderIPerioden?: ArbeiderIPeriodenSvar
): ArbeidAktivitet => {
    const faktiskArbeidstid = getFaktiskArbeidstidPerUkeForUkjentArbeidsgiver(arbeidsforhold, arbeiderIPerioden);

    const aktivitet: ArbeidAktivitet = {
        key: arbeidsgiver.key,
        type: ArbeidAktivitetType.arbeidstaker,
        arbeidsgiver,
        erUkjentArbeidsaktivitet: true,
        navn: arbeidsgiver.navn,
        harPerioderEtterTillattEndringsperiode: false,
        harPerioderFørTillattEndringsperiode: false,
        perioderMedArbeidstid: getPerioderMedArbeidstidForUkjentArbeidsgiver(
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
    arbeidssituasjon?: ArbeidssituasjonSøknadsdata
): ArbeidAktivitet[] => {
    const aktiviteter: ArbeidAktivitet[] = [];
    ukjenteArbeidsgivere.forEach((arbeidsgiver) => {
        const arbeidsforhold = arbeidssituasjon?.arbeidsforhold.find((s) => s.arbeidsgiverKey === arbeidsgiver.key);
        if (!arbeidsforhold) {
            throw 'Arbeidssituasjoninfo mangler for arbeidsgiver';
        }
        if (arbeidsforhold.erAnsatt === false) {
            return;
        }
        const arbeiderIPerioden = arbeidAktivitetFormValues[arbeidsgiver.key]?.arbeiderIPerioden;
        aktiviteter.push(
            getArbeidAktivitetForUkjentArbeidsgiver(søknadsperioder, arbeidsgiver, arbeidsforhold, arbeiderIPerioden)
        );
    });
    return aktiviteter;
};
