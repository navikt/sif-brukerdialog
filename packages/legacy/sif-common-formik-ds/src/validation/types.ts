import { PrimitiveType } from 'react-intl';

export interface IntlErrorObject {
    /** If passed in, the key is not transformed with field name and error */
    key: string;
    /** Values passed through to intl formatMessage */
    values?: Record<string, PrimitiveType>;
    /** Set if error key is not to be altered by fieldErrorHandler */
    keepKeyUnaltered?: boolean;
}

export const isIntlErrorObject = (error: any): error is IntlErrorObject => {
    if (typeof error !== 'object' || error === null) {
        return false;
    }
    if (typeof error.key !== 'string') {
        return false;
    }
    if (error.values !== undefined && typeof error.values !== 'object') {
        return false;
    }
    if (error.keepKeyUnaltered !== undefined && typeof error.keepKeyUnaltered !== 'boolean') {
        return false;
    }
    return true;
};

export type ValidationError = string | IntlErrorObject;

export type ValidationResult<ValidationErrors> = ValidationErrors | undefined;

export type ValidationFunction<ValidationErrors> = (value: any) => ValidationResult<ValidationErrors>;
