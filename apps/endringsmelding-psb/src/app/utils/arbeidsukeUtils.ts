import { dateFormatter, DateRange, durationToISODuration, getDatesInDateRange } from '@navikt/sif-common-utils/lib';
import dayjs from 'dayjs';
import { Arbeidsuke } from '../types/K9Sak';

export const sorterArbeidsuker = (a1: Arbeidsuke, a2: Arbeidsuke): number => {
    return dayjs(a1.periode.from).isBefore(a2.periode.from) ? -1 : 1;
};

export const erHelArbeidsuke = (uke: Arbeidsuke): boolean => {
    return getDatesInDateRange(uke.periode, true).length >= 5;
};

export const getDagerTekst = ({ from, to }: DateRange): string => {
    const fra = dateFormatter.day(from);
    const til = dateFormatter.day(to);
    if (fra === til) {
        return `${fra}`;
    }
    return `${fra} til ${til}`;
};

export const arbeidsukerHarLikNormaltid = (arbeidsuker: Arbeidsuke[]): boolean => {
    if (arbeidsuker.length <= 1) {
        return true;
    }
    const normaltid = durationToISODuration(arbeidsuker[0].normalt);
    return arbeidsuker.some((arbeidsuke) => normaltid !== durationToISODuration(arbeidsuke.normalt)) === false;
};

export const arbeidsukerErHeleArbeidsuker = (arbeidsuker: Arbeidsuke[]): boolean => {
    return arbeidsuker.some((uke) => erHelArbeidsuke(uke) === false) === false;
};
