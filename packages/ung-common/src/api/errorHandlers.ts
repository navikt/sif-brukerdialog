import { ProblemDetail, zProblemDetail } from '@navikt/ung-deltakelse-opplyser-api-veileder';
import axios, { AxiosError, isAxiosError } from 'axios';
import { z, ZodError } from 'zod';

// Generelle feiltyper
export enum ApiErrorType {
    ValidationError = 'ValidationError',
    NetworkError = 'NetworkError',
    UnknownError = 'UnknownError',
}

type ApiErrorBase = {
    type: ApiErrorType;
    context: string;
    message: string;
    originalError: unknown;
};

type ApiAxiosError = {
    type: ApiErrorType.NetworkError;
    context: string;
    message: string;
    originalError: AxiosError;
};

export type ApiError = ApiErrorBase | ApiAxiosError;

export type HttpStatusErrorMessages = Record<number, string | ((error: AxiosError) => string)>;

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

export const isApiAxiosError = (error: unknown): error is ApiAxiosError => {
    if (!error) {
        return false;
    }
    return (error as ApiError).type === ApiErrorType.NetworkError && isAxiosError((error as ApiError).originalError);
};

/**
 * Håndterer feil ut fra hvilken type feil det er
 * @param error
 * @returns
 */
export const handleApiError = (
    error: unknown,
    context: string = '',
    httpStatusMessages?: HttpStatusErrorMessages,
): ApiError => {
    if (error instanceof ZodError) {
        return {
            type: ApiErrorType.ValidationError,
            context,
            message: error.issues.map((err) => err.message).join(', '),
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
        const message = httpStatusMessages[statusCode];
        if (typeof message === 'function') {
            // Hvis meldingen er en funksjon, kall den med Axios-feilen
            return message(error);
        }
        // Hvis meldingen er en streng, returner den direkte
        return message;
    }

    // Håndter tilfeller der statuskode mangler
    if (!statusCode) {
        return 'Ukjent nettverksfeil. Ingen statuskode tilgjengelig.';
    }

    // Fallback til Axios-feilmelding
    return error.message || 'En ukjent feil oppstod under nettverksforespørselen.';
};

/** Overstyrer generert zod schema for å tillate strings som ikke har url format (for lokal utvikling) */
export const zProblemDetailWithoutUrl = zProblemDetail.omit({ type: true, instance: true }).extend({
    type: z.string().optional(), // Endrer type til kun string
    instance: z.string().optional(), // Endrer type til kun string
});

export const isProblemDetail = (obj: unknown): obj is ProblemDetail => {
    const result = zProblemDetailWithoutUrl.safeParse(obj);
    if (result.success) {
        return true;
    }
    return false;
};
