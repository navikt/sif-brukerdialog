import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

import { ValidationFunction } from './types';
import { validationUtils } from './validationUtils';
import { DateValidationResult, ValidateDateError } from './getDateValidator';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(isoWeek);

type ISODate = string & {
    readonly __brand: 'ISODate';
};
export interface ISODateValidationOptions {
    required?: boolean;
    min?: ISODate;
    max?: ISODate;
    originalDate?: ISODate;
    onlyWeekdays?: boolean;
}

export const getISODateValidator =
    (options: ISODateValidationOptions = {}): ValidationFunction<DateValidationResult> =>
    (value: any) => {
        const { required, min, max, onlyWeekdays } = options;
        const date = validationUtils.getDateFromDateString(value);
        if (required && validationUtils.hasValue(value) === false) {
            return ValidateDateError.dateHasNoValue;
        }

        if (validationUtils.hasValue(value)) {
            if (date === undefined) {
                return ValidateDateError.dateHasInvalidFormat;
            }
            if (date && options.originalDate && dayjs(date).isSame(options.originalDate, 'date')) {
                return ValidateDateError.dateNotChanged;
            }
            if (min && dayjs(date).isBefore(min, 'day')) {
                return ValidateDateError.dateIsBeforeMin;
            }
            if (max && dayjs(date).isAfter(max, 'day')) {
                return ValidateDateError.dateIsAfterMax;
            }
            if (onlyWeekdays && dayjs(date).isoWeekday() > 5) {
                return ValidateDateError.dateIsNotWeekday;
            }
        }
        return undefined;
    };
