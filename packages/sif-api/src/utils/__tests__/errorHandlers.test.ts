import { describe, expect, it } from 'vitest';
import { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { ZodError, ZodIssue } from 'zod';

import { ApiErrorType, getFeltOgMeldingFraZodError, handleApiError, isProblemDetail } from '../errorHandlers';

const issue = (path: (string | number)[]): ZodIssue =>
    ({
        code: 'invalid_type',
        expected: 'boolean',
        path,
        message: 'Invalid input: expected boolean, received undefined',
    }) as unknown as ZodIssue;

const MSG = 'Invalid input: expected boolean, received undefined';

const axiosFeil = (data: unknown, status = 500): AxiosError =>
    new AxiosError('Request failed with status code 500', 'ERR_BAD_RESPONSE', undefined, undefined, {
        data,
        status,
        statusText: '',
        headers: {},
        config: {} as InternalAxiosRequestConfig,
    });

describe('getFeltOgMeldingFraZodError', () => {
    it('stripper body-prefikset og beholder meldingen', () => {
        const error = new ZodError([issue(['body', 'barnErRiktig']), issue(['body', 'søkerNorskIdent'])]);

        expect(getFeltOgMeldingFraZodError(error)).toBe(`barnErRiktig: ${MSG}, søkerNorskIdent: ${MSG}`);
    });

    it('beholder andre prefiks enn body', () => {
        const error = new ZodError([issue(['headers', 'X-Correlation-ID'])]);

        expect(getFeltOgMeldingFraZodError(error)).toBe(`headers.X-Correlation-ID: ${MSG}`);
    });

    it('beholder nøstede feltnavn', () => {
        const error = new ZodError([issue(['body', 'kontonummerInfo', 'kontonummer'])]);

        expect(getFeltOgMeldingFraZodError(error)).toBe(`kontonummerInfo.kontonummer: ${MSG}`);
    });

    it('rapporterer body når hele bodyen mangler', () => {
        const error = new ZodError([issue(['body'])]);

        expect(getFeltOgMeldingFraZodError(error)).toBe(`body: ${MSG}`);
    });

    it('fjerner duplikate feltnavn', () => {
        const error = new ZodError([issue(['body', 'medlemskap']), issue(['body', 'medlemskap'])]);

        expect(getFeltOgMeldingFraZodError(error)).toBe(`medlemskap: ${MSG}`);
    });
});

describe('handleApiError med ZodError', () => {
    it('setter feltnavn og melding som message — kun for logging', () => {
        const error = new ZodError([issue(['body', 'søkerNorskIdent']), issue(['body', 'startdato'])]);

        const apiError = handleApiError(error, 'sendSøknad');

        expect(apiError.type).toBe(ApiErrorType.ZodValidationError);
        expect(apiError.message).toBe(`søkerNorskIdent: ${MSG}, startdato: ${MSG}`);
        expect(apiError.context).toBe('sendSøknad');
        expect(apiError.originalError).toBe(error);
    });
});

describe('isProblemDetail', () => {
    it('avviser tomt objekt selv om alle felt er valgfrie', () => {
        expect(isProblemDetail({})).toBe(false);
    });

    it('avviser objekt uten identifiserende felt', () => {
        expect(isProblemDetail({ noeHeltAnnet: 'verdi' })).toBe(false);
    });

    it('godtar svar med type, title og detail', () => {
        const problemDetail = {
            type: 'https://k9-brukerdialog-prosessering/problem-details/invalid-request-parameters',
            title: 'invalid-request-parameters',
            status: 400,
            detail: 'Forespørselen inneholder valideringsfeil',
        };

        expect(isProblemDetail(problemDetail)).toBe(true);
    });
});

describe('handleApiError med nettverksfeil', () => {
    it('bruker detail fra ProblemDetail', () => {
        const error = axiosFeil({ title: 'invalid-request-parameters', detail: 'Startdato er ugyldig' }, 400);

        expect(handleApiError(error, 'sendSøknad').message).toBe('Startdato er ugyldig');
    });

    it('bruker statuskode-melding når svaret er et tomt objekt', () => {
        const error = axiosFeil({}, 500);

        const apiError = handleApiError(error, 'sendSøknad', { 500: 'Tjenesten er ikke tilgjengelig' });

        expect(apiError.type).toBe(ApiErrorType.NetworkError);
        expect(apiError.message).toBe('Tjenesten er ikke tilgjengelig');
    });
});
