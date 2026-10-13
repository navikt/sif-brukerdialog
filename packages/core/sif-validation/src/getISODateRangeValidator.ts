import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

import { ValidateDateRangeError } from './getDateRangeValidator';
import { DateValidationResult } from './getDateValidator';
import { getISODateValidator, ISODateValidationOptions } from './getISODateValidator';
import { ValidationFunction } from './types';
import { validationUtils } from './validationUtils';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

type DateRangeValidationResult =
    | DateValidationResult
    | ValidateDateRangeError.fromDateIsAfterToDate
    | ValidateDateRangeError.toDateIsBeforeFromDate
    | undefined;

type ISODate = string & {
    readonly __brand: 'ISODate';
};

interface Options extends ISODateValidationOptions {
    fromDate?: ISODate;
    toDate?: ISODate;
}

const getFromDateValidator =
    (options: Options): ValidationFunction<DateRangeValidationResult> =>
    (value: any) => {
        const dateError = getISODateValidator(options)(value);
        if (dateError) {
            return dateError;
        }
        const { toDate } = options;
        const date = validationUtils.getDateFromDateString(value);
        if (!date || !toDate) {
            return undefined;
        }

        if (dayjs(date).isAfter(toDate, 'day')) {
            return ValidateDateRangeError.fromDateIsAfterToDate;
        }
        return undefined;
    };

const getToDateValidator =
    (options: Options): ValidationFunction<DateRangeValidationResult> =>
    (value: any) => {
        const dateError = getISODateValidator(options)(value);
        if (dateError) {
            return dateError;
        }
        const { fromDate } = options;
        const date = validationUtils.getDateFromDateString(value);
        if (!date || !fromDate) {
            return undefined;
        }
        if (dayjs(date).isBefore(fromDate, 'day')) {
            return ValidateDateRangeError.toDateIsBeforeFromDate;
        }
        return undefined;
    };

export const getISODateRangeValidator = (options: Options) => ({
    validateFromDate: getFromDateValidator(options),
    validateToDate: getToDateValidator(options),
});
