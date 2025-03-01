import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import getDateValidator, { DateValidationOptions, DateValidationResult } from './getDateValidator';
import { ValidationFunction } from './types';
import { validationUtils } from './validationUtils';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

export enum ValidateDateRangeError {
    toDateIsBeforeFromDate = 'toDateIsBeforeFromDate',
    fromDateIsAfterToDate = 'fromDateIsAfterToDate',
}

export const ValidateDateRangeErrorKeys = Object.keys(ValidateDateRangeError);

type DateRangeValidationResult =
    | DateValidationResult
    | ValidateDateRangeError.fromDateIsAfterToDate
    | ValidateDateRangeError.toDateIsBeforeFromDate
    | undefined;

interface Options extends DateValidationOptions {
    fromDate?: Date;
    toDate?: Date;
}

const getFromDateValidator =
    (options: Options): ValidationFunction<DateRangeValidationResult> =>
    (value: any) => {
        const dateError = getDateValidator(options)(value);
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
        const dateError = getDateValidator(options)(value);
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

const getDateRangeValidator = (options: Options) => ({
    validateFromDate: getFromDateValidator(options),
    validateToDate: getToDateValidator(options),
});

export default getDateRangeValidator;
