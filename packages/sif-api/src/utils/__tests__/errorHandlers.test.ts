import { describe, expect, it } from 'vitest';
import { ZodError, ZodIssue } from 'zod';

import { ApiErrorType, getFeltOgMeldingFraZodError, handleApiError } from '../errorHandlers';

const issue = (path: (string | number)[]): ZodIssue =>
    ({
        code: 'invalid_type',
        expected: 'boolean',
        path,
        message: 'Invalid input: expected boolean, received undefined',
    }) as unknown as ZodIssue;

const MSG = 'Invalid input: expected boolean, received undefined';

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
