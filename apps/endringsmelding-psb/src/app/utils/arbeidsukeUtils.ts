import { dateFormatter, DateRange, getDatesInDateRange } from '@navikt/sif-common-utils/lib';
import { Arbeidsuke } from '../types/K9Sak';

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
