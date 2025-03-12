import { ValidationFunction } from './types';
import { validationUtils } from './validationUtils';

const { hasValue } = validationUtils;

export enum ValidateStringError {
    stringHasNoValue = 'stringHasNoValue',
    stringIsNotAString = 'stringIsNotAString',
    stringIsTooShort = 'stringIsTooShort',
    stringIsTooLong = 'stringIsTooLong',
    stringHasInvalidFormat = 'stringHasInvalidFormat',
    stringContainsUnicodeChacters = 'stringContainsUnicodeChacters',
}

export const ValidateStringErrorKeys = Object.keys(ValidateStringError);

type StringValidationResult =
    | undefined
    | ValidateStringError.stringHasNoValue
    | ValidateStringError.stringIsNotAString
    | ValidateStringError.stringIsTooLong
    | ValidateStringError.stringIsTooShort
    | ValidateStringError.stringHasInvalidFormat
    | ValidateStringError.stringContainsUnicodeChacters;

interface Options {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    formatRegExp?: RegExp;
    noUnicodeCharacters?: boolean;
    /** Deprecated */
    disallowUnicodeCharacters?: boolean;
}

const containsNonLatinCodepoints = (s: string): boolean => {
    return /[^u0000-\u00ff\s]/.test(s);
};

const containsUnwantedCharacters = (s: string): boolean => {
    return /[^\p{L}\p{N}\p{P}\p{Z}\p{M}«»§\n\r~]/gu.test(s);
    // return /^[\p{L}\p{N}\p{P}\p{Z}\p{M}«»§]+$/u.test(s) === false; // /^[A-Za-z0-9\u00C0-\u024F\u1E00-\u1EFF\s\p{Pd}\p{Ps}\p{Pe}«»"§]+$/u.test(s) === false;
};

const supportsUnicodeRegex = (() => {
    try {
        new RegExp('\\p{L}', 'u');
        return true;
    } catch {
        return false;
    }
})();

const getStringValidator =
    (options: Options = {}): ValidationFunction<StringValidationResult> =>
    (value: any) => {
        const { required, minLength, maxLength, formatRegExp } = options;

        if (required) {
            if (hasValue(value) === false || (typeof value === 'string' && value.trim().length === 0)) {
                return ValidateStringError.stringHasNoValue;
            }
        }

        if (hasValue(value)) {
            if (typeof value !== 'string') {
                return ValidateStringError.stringIsNotAString;
            }
            if (minLength !== undefined && value.trim().length < minLength) {
                return ValidateStringError.stringIsTooShort;
            }
            if (maxLength !== undefined && value.length > maxLength) {
                return ValidateStringError.stringIsTooLong;
            }
            if (formatRegExp !== undefined) {
                if (formatRegExp.test(value) === false) {
                    return ValidateStringError.stringHasInvalidFormat;
                }
            }
            if (options.noUnicodeCharacters) {
                if (supportsUnicodeRegex && containsUnwantedCharacters(value)) {
                    return ValidateStringError.stringContainsUnicodeChacters;
                }
            }
            if (options.disallowUnicodeCharacters) {
                if (containsNonLatinCodepoints(value)) {
                    return ValidateStringError.stringContainsUnicodeChacters;
                }
            }
        }
        return undefined;
    };

export default getStringValidator;
