import { DateRange, dateRangeToISODateRange, ISODateRange } from '@navikt/sif-common-utils';

export const encodePeriode = (periode: DateRange) => {
    return encodeURIComponent(dateRangeToISODateRange(periode));
};
export const decodePeriode = (periode: string): ISODateRange => {
    return decodeURIComponent(periode);
};

export const getRapporterInntektUrl = (periode: DateRange): string => {
    return `/inntekt/${encodePeriode(periode)}`;
};
