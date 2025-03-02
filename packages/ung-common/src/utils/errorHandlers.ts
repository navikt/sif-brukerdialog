import axios from 'axios';
import { ZodError } from 'zod';

// Definer en enum for feiltyper
export enum ApiErrorType {
    ValidationError = 'ValidationError',
    NetworkError = 'NetworkError',
    UnknownError = 'UnknownError',
}

// Definer en enum for feilkoder
export enum ApiErrorCode {
    VALIDATION_ERROR = 'VALIDATION_ERROR',
    NETWORK_ERROR = 'NETWORK_ERROR',
    UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

// Definer ApiErrorObject
export interface ApiErrorObject {
    type: ApiErrorType;
    error: unknown;
    code: ApiErrorCode;
    message: string;
}

// Funksjon for å håndtere feil
export const handleError = (e: unknown): ApiErrorObject => {
    if (e instanceof ZodError) {
        console.warn('Valideringsfeil:', e);
        return {
            type: ApiErrorType.ValidationError,
            error: e,
            code: ApiErrorCode.VALIDATION_ERROR,
            message: 'Valideringsfeil: ' + e.errors.map((err) => err.message).join(', '),
        };
    } else if (axios.isAxiosError(e)) {
        return {
            type: ApiErrorType.NetworkError,
            error: e,
            code: ApiErrorCode.NETWORK_ERROR,
            message: 'Nettverksfeil: ' + e.message,
        };
    } else {
        return {
            type: ApiErrorType.UnknownError,
            error: e,
            code: ApiErrorCode.UNKNOWN_ERROR,
            message: 'Ukjent feil: ' + (e as Error).message,
        };
    }
};
