import { ValidationFunction } from './types';
import { validationUtils } from './validationUtils';

const { hasValue, getNumberFromNumberInputValue } = validationUtils;

export enum ValidateNumberError {
    numberHasNoValue = 'numberHasNoValue',
    numberHasInvalidFormat = 'numberHasInvalidFormat',
    numberIsTooSmall = 'numberIsTooSmall',
    numberIsTooLarge = 'numberIsTooLarge',
    numberHasDecimals = 'numberHasDecimals',
}

export const ValidateNumberErrorKeys = Object.keys(ValidateNumberError);

type NumberValidationResult =
    | undefined
    | ValidateNumberError.numberHasNoValue
    | ValidateNumberError.numberHasInvalidFormat
    | ValidateNumberError.numberIsTooLarge
    | ValidateNumberError.numberIsTooSmall
    | ValidateNumberError.numberHasDecimals;

interface Options {
    required?: boolean;
    min?: number;
    max?: number;
    allowDecimals?: boolean;
}

const getNumberValidator =
    (options: Options = {}): ValidationFunction<NumberValidationResult> =>
    (value: any) => {
        const { required, min, max, allowDecimals = true } = options;

        /**
         * Hvis desimaler ikke er tillat, prøv først å hente ut tallverdi og så se om verdien inneholder desimaler.
         * Dette gjøres i egen test i og med getNumberFromNumberInputValue med integerValue === true
         * returnerer undefined hvis det er desimaler i verdien.
         */
        if (allowDecimals === false) {
            const numberValueWithDecimals = getNumberFromNumberInputValue(value);
            if (
                numberValueWithDecimals !== undefined &&
                Math.round(numberValueWithDecimals) !== numberValueWithDecimals // inneholder desimaler
            ) {
                return ValidateNumberError.numberHasDecimals;
            }
        }

        const numberValue = getNumberFromNumberInputValue(value, allowDecimals === false);

        if (required) {
            if (hasValue(value) === false || (typeof value === 'string' && value.trim().length === 0)) {
                return ValidateNumberError.numberHasNoValue;
            }
        }

        if (hasValue(value)) {
            if (numberValue === undefined) {
                return ValidateNumberError.numberHasInvalidFormat;
            }
            if (allowDecimals === false && Math.round(numberValue) !== numberValue) {
                return ValidateNumberError.numberHasDecimals;
            }
            if (min !== undefined && numberValue < min) {
                return ValidateNumberError.numberIsTooSmall;
            }
            if (max !== undefined && numberValue > max) {
                return ValidateNumberError.numberIsTooLarge;
            }
        }
        return undefined;
    };

export default getNumberValidator;
