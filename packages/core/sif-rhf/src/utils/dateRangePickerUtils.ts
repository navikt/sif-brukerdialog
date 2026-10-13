import { dateToISODate, ISODate, maxISODate, minISODate } from '@sif/utils';

export const getDateRangeMaxDate = (
    fromInputPropsMaxDate: ISODate | undefined,
    toDate: ISODate | undefined,
): ISODate | undefined => {
    if (!fromInputPropsMaxDate) {
        return toDate ? dateToISODate(toDate) : undefined;
    }
    if (!toDate) {
        return fromInputPropsMaxDate;
    }
    return minISODate([dateToISODate(toDate), fromInputPropsMaxDate]);
};

export const getDateRangeMinDate = (
    toInputPropsMinDate: ISODate | undefined,
    fromDate: ISODate | undefined,
): ISODate | undefined => {
    if (!toInputPropsMinDate) {
        return fromDate ? dateToISODate(fromDate) : undefined;
    }
    if (!fromDate) {
        return toInputPropsMinDate;
    }
    return maxISODate([dateToISODate(fromDate), toInputPropsMinDate]);
};
