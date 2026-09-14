import { ProblemDetail, zProblemDetail } from '@navikt/ung-deltakelse-opplyser-api-veileder';
import axios, { AxiosError, isAxiosError } from 'axios';
import { z, ZodError } from 'zod';

// Generelle feiltyper
export enum ApiErrorType {
    ZodValidationError = 'ZodValidationError',
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
            type: ApiErrorType.ZodValidationError,
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
    // ProblemDetail fra backend har forrang, men bare når den faktisk har en tekst å vise.
    // Uten tekst faller vi videre til statuskode, slik at httpStatusMessages får virke.
    if (isProblemDetail(error.response?.data)) {
        const { title, detail } = error.response.data;
        const problemDetailMessage = detail || title;
        if (problemDetailMessage) {
            return problemDetailMessage;
        }
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

const harTekst = (verdi: unknown): boolean => typeof verdi === 'string' && verdi.trim().length > 0;

/**
 * Overstyrer generert zod schema for å tillate strings som ikke har url format (for lokal utvikling).
 *
 * Alle feltene i ProblemDetail er valgfrie, og z.object stripper ukjente nøkler i stedet for å feile.
 * Skjemaet alene ville derfor godtatt et hvilket som helst objekt, inkludert `{}`. Vi krever minst ett
 * identifiserende felt for at svaret skal regnes som en ProblemDetail.
 */
export const zProblemDetailWithoutUrl = zProblemDetail
    .omit({ type: true, instance: true })
    .extend({
        type: z.string().optional(), // Endrer type til kun string
        instance: z.string().optional(), // Endrer type til kun string
    })
    .refine(({ type, title, detail }) => harTekst(type) || harTekst(title) || harTekst(detail), {
        error: 'Mangler type, title og detail — regnes ikke som ProblemDetail',
    });

export const isProblemDetail = (obj: unknown): obj is ProblemDetail => {
    const result = zProblemDetailWithoutUrl.safeParse(obj);
    if (result.success) {
        return true;
    }
    return false;
};
