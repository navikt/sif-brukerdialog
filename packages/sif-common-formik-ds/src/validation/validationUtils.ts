import { ValidationError, ValidationResult } from './types';

export const hasValue = (value: any): boolean => value !== '' && value !== undefined && value !== null;

export const validateAll = <ErrorType = ValidationError>(
    validations: Array<() => ValidationResult<ErrorType>>,
): ErrorType | undefined => {
    let result: ValidationResult<ErrorType>;
    validations.some((validateFunc) => {
        const validationResult = validateFunc();
        if (validationResult) {
            result = validationResult;
            return true;
        }
        return false;
    });
    return result;
};
