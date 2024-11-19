import { hasValue } from './validationUtils';
import { ValidationFunction } from './types';
import { ParseNumberStringError } from '../utils/parseNumberString';
import { getNumberFromStringInput } from '../utils/getNumberFromStringInput';

export enum ValidateNumberError {
    numberHasNoValue = 'numberHasNoValue',
    numberHasInvalidFormat = 'numberHasInvalidFormat',
    numberIsTooSmall = 'numberIsTooSmall',
    numberIsTooLarge = 'numberIsTooLarge',
    numberHasDecimals = 'numberHasDecimals',
    indecisiveNumberFormat = 'indecisiveNumberFormat',
}

export const ValidateNumberErrorKeys = Object.keys(ValidateNumberError);

type NumberValidationResult =
    | undefined
    | ValidateNumberError.numberHasNoValue
    | ValidateNumberError.numberHasInvalidFormat
    | ValidateNumberError.numberIsTooLarge
    | ValidateNumberError.numberIsTooSmall
    | ValidateNumberError.numberHasDecimals
    | ValidateNumberError.indecisiveNumberFormat;

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

        try {
            if (required) {
                if (hasValue(value) === false || (typeof value === 'string' && value.trim().length === 0)) {
                    return ValidateNumberError.numberHasNoValue;
                }
            }
            const numberValue = getNumberFromStringInput(value, max !== undefined && max < 1000);
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
        } catch (e: any) {
            if (e && e.message === ParseNumberStringError.INDECISIVE_NUMBER_STRING) {
                return ValidateNumberError.indecisiveNumberFormat;
            }
            return ValidateNumberError.numberHasInvalidFormat;
        }
        return undefined;
    };

export default getNumberValidator;
