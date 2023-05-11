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
import { ArbeiderIPeriodenSvar } from '../søknad/steps/arbeidssituasjon/components/ArbeidsforholdForm';
import { Arbeidsforhold, ArbeidsforholdAktivt } from '../types/Arbeidsforhold';
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

export const getFaktiskArbeidstidForUkjentArbeidsgiver = (
    arbeidsforhold: ArbeidsforholdAktivt
): Duration | undefined => {
    switch (arbeidsforhold.arbeiderIPerioden) {
        case ArbeiderIPeriodenSvar.heltFravær:
            return { hours: '0', minutes: '0' };
        case ArbeiderIPeriodenSvar.somVanlig:
            return { ...arbeidsforhold.normalarbeidstid.timerPerUke };
        case ArbeiderIPeriodenSvar.redusert:
            return undefined;
    }
};

export const getArbeidAktivitetForUkjentArbeidsgiver = (
    søknadsperioder: DateRange[],
    arbeidsgiver: Arbeidsgiver,
    arbeidsforhold: ArbeidsforholdAktivt
): ArbeidAktivitet => {
    const faktiskArbeidstid = getFaktiskArbeidstidForUkjentArbeidsgiver(arbeidsforhold);

    const aktivitet: ArbeidAktivitet = {
        type: ArbeidAktivitetType.arbeidstaker,
        arbeidsgiver,
        erUkjentArbeidsaktivitet: true,
        id: arbeidsgiver.id,
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
    arbeidssituasjon?: ArbeidssituasjonSøknadsdata
): ArbeidAktivitet[] => {
    const aktiviteter: ArbeidAktivitet[] = [];
    ukjenteArbeidsgivere.forEach((arbeidsgiver) => {
        const arbeidsforhold = arbeidssituasjon?.arbeidsforhold.find((s) => s.arbeidsgiverId === arbeidsgiver.id);
        if (!arbeidsforhold || arbeidsforhold.erAnsatt === false) {
            throw 'Arbeidssituasjoninfo mangler for arbeidsgiver';
        }
        aktiviteter.push(getArbeidAktivitetForUkjentArbeidsgiver(søknadsperioder, arbeidsgiver, arbeidsforhold));
    });
    return aktiviteter;
};

export const harUkjentArbeidsgiverMedRedusertJobb = (arbeidsforhold: Arbeidsforhold[] = []): boolean => {
    return arbeidsforhold.some((a) => a.erAnsatt === true && a.arbeiderIPerioden === ArbeiderIPeriodenSvar.redusert);
};
