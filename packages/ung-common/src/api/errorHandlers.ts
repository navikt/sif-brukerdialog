import { ProblemDetail, zProblemDetail } from '@navikt/ung-deltakelse-opplyser-api';
import axios, { AxiosError } from 'axios';
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

export type HttpStatusErrorMessages = Record<number, string>;

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
    httpStatusMessages?: HttpStatusErrorMessages,
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
            message: getNetworkErrorMessage(error, httpStatusMessages),
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

const getNetworkErrorMessage = (error: AxiosError, httpStatusMessages?: HttpStatusErrorMessages): string => {
    // Sjekk om det er spesifikk ProblemDetail fra opplyser-tjenesten
    if (isProblemDetail(error.response?.data)) {
        const { title, detail } = error.response.data;
        return detail || title || 'Ukjent feil oppstod under nettverksforespørselen.';
    }

    // Hent statuskode og tilhørende melding
    const statusCode = error.response?.status;
    if (httpStatusMessages && statusCode && httpStatusMessages[statusCode]) {
        return httpStatusMessages[statusCode];
    }

    // Håndter tilfeller der statuskode mangler
    if (!statusCode) {
        return 'Ukjent nettverksfeil. Ingen statuskode tilgjengelig.';
    }

    // Fallback til Axios-feilmelding
    return error.message || 'En ukjent feil oppstod under nettverksforespørselen.';
};

export const isProblemDetail = (obj: unknown): obj is ProblemDetail => {
    return zProblemDetail.safeParse(obj).success;
};
