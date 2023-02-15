import { isString } from 'formik';
import { ISODate, ISODateRange, ISODuration } from './types';

export type StringOrNull = string | null;

export const isStringOrNull = (value: any): value is StringOrNull => {
    return isString(value) || value === null;
};

export const isStringOrUndefined = (value: any): value is StringOrNull => {
    return isString(value) || value === undefined;
};

export function notUndefined<T>(x: T | undefined): x is T {
    return x !== undefined;
}

export const isISODate = (value: any): value is ISODate => {
    if (value && typeof value === 'string') {
        const reg = /^\d{4}-\d{2}-\d{2}$/;
        const match: RegExpMatchArray | null = value.match(reg);
        return match !== null;
    } else {
        return false;
    }
};
export const isISODateOrNull = (value: any): value is ISODate | null => {
    return value === null || isISODate(value);
};

export const isISODateRange = (value: any): value is ISODateRange => {
    if (value && typeof value === 'string') {
        const dates = value.split('/');
        if (dates.length !== 2) {
            return false;
        }
        return isISODate(dates[0]) === true && isISODate(dates[1]) === true;
    } else {
        return false;
    }
};

export const isISODuration = (value: any): value is ISODuration => {
    /** Only hours and minutes PT7H30M or PT0S 0 sekunder*/
    if (value && typeof value === 'string') {
        if (value === 'PT') {
            return false;
        }
        if (value === 'PT0S') {
            return true;
        }
        const reg = /^PT(\d{1,2}H)?(\d{1,2}M)?$/;
        const match: RegExpMatchArray | null = value.match(reg);
        return match !== null;
    } else {
        return false;
    }
};
