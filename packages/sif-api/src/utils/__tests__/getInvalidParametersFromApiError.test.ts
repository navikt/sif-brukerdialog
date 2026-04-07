import { AxiosError, AxiosHeaders, AxiosResponse } from 'axios';
import { describe, expect, it } from 'vitest';

import { ApiError, ApiErrorType, getInvalidParametersFromApiError } from '../errorHandlers';

const validViolation = {
    invalidValue: 'for lang tekst',
    parameterName: 'høyereRisikoForFraværBeskrivelse',
    parameterType: 'body',
    reason: 'må være kortere',
};

const createAxiosError = (data: unknown, status = 400): AxiosError => {
    const error = new AxiosError('Request failed', AxiosError.ERR_BAD_REQUEST, undefined, undefined, {
        data,
        status,
        statusText: 'Bad Request',
        headers: {},
        config: { headers: new AxiosHeaders() },
    } as AxiosResponse);
    return error;
};

const createNetworkApiError = (data: unknown, status = 400): ApiError => ({
    type: ApiErrorType.NetworkError,
    context: 'test',
    message: 'Request failed',
    originalError: createAxiosError(data, status),
});

describe('getInvalidParametersFromApiError', () => {
    it('returnerer undefined for null', () => {
        expect(getInvalidParametersFromApiError(null)).toBeUndefined();
    });

    it('returnerer undefined for ikke-nettverksfeil', () => {
        const error: ApiError = {
            type: ApiErrorType.UnknownError,
            context: 'test',
            message: 'Ukjent feil',
            originalError: new Error('test'),
        };
        expect(getInvalidParametersFromApiError(error)).toBeUndefined();
    });

    it('returnerer undefined når response.data mangler', () => {
        const error: ApiError = {
            type: ApiErrorType.NetworkError,
            context: 'test',
            message: 'Request failed',
            originalError: createAxiosError(undefined),
        };
        expect(getInvalidParametersFromApiError(error)).toBeUndefined();
    });

    it('returnerer undefined når data ikke inneholder invalidParameters', () => {
        const error = createNetworkApiError({ detail: 'Feil' });
        expect(getInvalidParametersFromApiError(error)).toBeUndefined();
    });

    it('returnerer violations fra invalidParameters (camelCase)', () => {
        const error = createNetworkApiError({
            invalidParameters: [validViolation],
        });
        const result = getInvalidParametersFromApiError(error);
        expect(result).toEqual([validViolation]);
    });

    it('returnerer violations fra invalid_parameters (snake_case)', () => {
        const error = createNetworkApiError({
            invalid_parameters: [
                validViolation,
                { ...validViolation, parameterName: 'felt2', invalidValue: 'annen verdi' },
            ],
        });
        const result = getInvalidParametersFromApiError(error);
        expect(result).toEqual([
            validViolation,
            { ...validViolation, parameterName: 'felt2', invalidValue: 'annen verdi' },
        ]);
    });

    it('filtrerer bort ugyldig innhold i invalidParameters', () => {
        const error = createNetworkApiError({
            invalidParameters: [validViolation, { noe: 'annet' }, null, 'streng', { parameterName: 123 }],
        });
        const result = getInvalidParametersFromApiError(error);
        expect(result).toEqual([validViolation]);
    });

    it('returnerer undefined når alle elementer er ugyldige', () => {
        const error = createNetworkApiError({
            invalidParameters: [{ noe: 'annet' }, null],
        });
        expect(getInvalidParametersFromApiError(error)).toBeUndefined();
    });

    it('returnerer undefined når invalidParameters ikke er array', () => {
        const error = createNetworkApiError({
            invalidParameters: 'ikke-array',
        });
        expect(getInvalidParametersFromApiError(error)).toBeUndefined();
    });
});
