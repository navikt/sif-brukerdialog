import { DateRange, getYearMonthKey } from '@navikt/sif-common-utils';
import { getDatesInMonthOutsideDateRange } from '@navikt/sif-common-utils';

export const getUtilgjengeligeDatoerIMåned = (
    utilgjengeligeDatoer: Date[],
    måned: Date,
    endringsperiode: DateRange
): Date[] => {
    const yearMonthKey = getYearMonthKey(måned);
    return [
        ...getDatesInMonthOutsideDateRange(måned, endringsperiode),
        ...utilgjengeligeDatoer.filter((d) => getYearMonthKey(d) === yearMonthKey),
    ];
};
