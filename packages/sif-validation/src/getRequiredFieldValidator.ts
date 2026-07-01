import { ValidationFunction } from './types';
import { validationUtils } from './validationUtils';

const { hasValue } = validationUtils;

export enum ValidateRequiredFieldError {
    'noValue' = 'noValue',
}

export const ValidateRequiredFieldErrorKeys = Object.keys(ValidateRequiredFieldError);

type RequiredFieldValidationResult = ValidateRequiredFieldError.noValue | undefined;

export const getRequiredFieldValidator = (): ValidationFunction<RequiredFieldValidationResult> => (value: any) => {
    if (hasValue(value) === false) {
        return ValidateRequiredFieldError.noValue;
    }
    return undefined;
};
