import axios from 'axios';
import { ZodError } from 'zod';

// Generelle feiltyper
export enum ApiErrorType {
    ValidationError = 'ValidationError',
    NetworkError = 'NetworkError',
    UnknownError = 'UnknownError',
}

export type ApiError = {
    type: ApiErrorType;
    context: string;
    message: string;
    originalError: unknown;
};

export const createApiError = (
    type: ApiErrorType,
    context: string,
    message: string,
    originalError: unknown,
): ApiError => {
    return {
        type,
        context,
        message,
        originalError,
    };
};

// Funksjon for å sjekke om objektet er ApiError
export const isApiErrorObject = (error: unknown): error is ApiError => {
    if (!error) {
        return false;
    }
    return (
        (error as ApiError).type === ApiErrorType.ValidationError ||
        (error as ApiError).type === ApiErrorType.NetworkError ||
        (error as ApiError).type === ApiErrorType.UnknownError
    );
};

/**
 * Håndterer feil ut fra hvilken type feil det er
 * @param error
 * @returns
 */
export const handleApiError = (
    error: unknown,
    context: string = '',
    customErrorHandler?: () => ApiError | void,
): ApiError => {
    if (customErrorHandler) {
        const customError = customErrorHandler();
        if (customError) {
            return customError;
        }
    }
    if (error instanceof ZodError) {
        return {
            type: ApiErrorType.ValidationError,
            context,
            message: error.errors.map((err) => err.message).join(', '),
            originalError: error,
        };
    } else if (axios.isAxiosError(error)) {
        return {
            type: ApiErrorType.NetworkError,
            context,
            message: error.message,
            originalError: error,
        };
    } else {
        return {
            type: ApiErrorType.UnknownError,
            context,
            message: (error as Error).message,
            originalError: error,
        };
    }
};

// /**
//  * Håndterer og returnerer ApiError
//  * @param error
//  * @returns
//  */

// export const handleApiError = (
//     error: unknown,
//     context: string,
//     customHandler?: (error: unknown) => ApiError | undefined,
// ): ApiError => {
//     if (customHandler) {
//         const customError = customHandler(error);
//         if (customError) {
//             return customError;
//         }
//     }
//     return handleError(error, context);
// };
