import { isString } from 'formik';

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
