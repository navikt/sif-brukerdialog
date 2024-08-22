import { isString } from 'lodash';
import { ISODate, ISODateRange, ISODuration } from './types';
import { parse } from 'iso8601-duration';

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
    if (value && typeof value === 'string') {
        try {
            return parse(value) !== undefined;
        } catch {
            return false;
        }
    } else {
        return false;
    }
};
