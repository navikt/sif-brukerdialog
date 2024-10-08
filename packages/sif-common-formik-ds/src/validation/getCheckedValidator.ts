import { ValidationFunction } from './types';

export enum ValidateCheckedError {
    'notChecked' = 'notChecked',
}

export const ValidateCheckedErrorKeys = Object.keys(ValidateCheckedError);

type CheckedValidationResult = ValidateCheckedError | undefined;

const getCheckedValidator = (): ValidationFunction<CheckedValidationResult> => (value: any) => {
    if (value === undefined || value === false || (Array.isArray(value) && value.length === 0)) {
        return ValidateCheckedError.notChecked;
    }
    return undefined;
};

export default getCheckedValidator;
