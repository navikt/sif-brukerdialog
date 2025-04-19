import axios from 'axios';
import { ZodError } from 'zod';

// Generelle feiltyper
export enum ApiErrorType {
    ValidationError = 'ValidationError',
    NetworkError = 'NetworkError',
    UnknownError = 'UnknownError',
}

export enum ApiErrorCode {
    NETWORK_ERROR = 'NETWORK_ERROR',
    VALIDATION_ERROR = 'VALIDATION_ERROR',
    UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

// Feilkoder
export interface ApiErrorObject {
    type: ApiErrorType;
    code: ApiErrorCode;
    originalError: unknown;
    message: string;
}

export type ApiError = {
    type: 'apiError';
    context: string;
    error: ApiErrorObject;
};

export type ErrorObject<T, C> = {
    type: T;
    code: C;
    message: string;
};

// Funksjon for å sjekke om objektet er ApiError
export const isApiErrorObject = (error: unknown): error is ApiError => {
    if (!error) {
        return false;
    }
    return (error as ApiError).type === 'apiError';
};

/**
 * Håndterer feil ut fra hvilken type feil det er
 * @param error
 * @returns
 */
const handleError = (error: unknown): ApiErrorObject => {
    if (error instanceof ZodError) {
        console.warn('Valideringsfeil:', error);
        return {
            type: ApiErrorType.ValidationError,
            code: ApiErrorCode.VALIDATION_ERROR,
            originalError: error,
            message: error.errors.map((err) => err.message).join(', '),
        };
    } else if (axios.isAxiosError(error)) {
        return {
            type: ApiErrorType.NetworkError,
            code: ApiErrorCode.NETWORK_ERROR,
            originalError: error,
            message: error.message,
        };
    } else {
        return {
            type: ApiErrorType.UnknownError,
            code: ApiErrorCode.UNKNOWN_ERROR,
            originalError: error,
            message: (error as Error).message,
        };
    }
};

/**
 * Håndterer og returnerer ApiError
 * @param error
 * @returns
 */

export const handleApiError = <T>(
    error: unknown,
    context: string,
    customHandler?: (error: unknown) => T | undefined,
): T | ApiError => {
    if (customHandler) {
        const customError = customHandler(error);
        if (customError) {
            return customError;
        }
    }
    return {
        type: 'apiError',
        context,
        error: handleError(error),
    };
};
