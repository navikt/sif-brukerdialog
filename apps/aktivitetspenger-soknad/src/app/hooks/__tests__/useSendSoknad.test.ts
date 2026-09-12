import { getFeltOgMeldingFraZodError } from '@sif/api';
import { describe, expect, it } from 'vitest';
import { ZodError, ZodIssue } from 'zod';

const issue = (path: Array<string | number>): ZodIssue =>
    ({
        code: 'invalid_type',
        expected: 'boolean',
        path,
        message: 'Invalid input: expected boolean, received undefined',
    }) as unknown as ZodIssue;

describe('getFeltOgMeldingFraZodError', () => {
    it('stripper body-prefikset fra feltnavn', () => {
        const error = new ZodError([issue(['body', 'barnErRiktig']), issue(['body', 'søkerNorskIdent'])]);

        expect(getFeltOgMeldingFraZodError(error)).toBe(
            'barnErRiktig: Invalid input: expected boolean, received undefined, søkerNorskIdent: Invalid input: expected boolean, received undefined',
        );
    });

    it('beholder andre prefiks enn body', () => {
        const error = new ZodError([issue(['headers', 'X-Correlation-ID'])]);

        expect(getFeltOgMeldingFraZodError(error)).toBe(
            'headers.X-Correlation-ID: Invalid input: expected boolean, received undefined',
        );
    });

    it('beholder nøstede feltnavn', () => {
        const error = new ZodError([issue(['body', 'kontonummerInfo', 'kontonummer'])]);

        expect(getFeltOgMeldingFraZodError(error)).toBe(
            'kontonummerInfo.kontonummer: Invalid input: expected boolean, received undefined',
        );
    });

    it('rapporterer body når hele bodyen mangler', () => {
        const error = new ZodError([issue(['body'])]);

        expect(getFeltOgMeldingFraZodError(error)).toBe('body: Invalid input: expected boolean, received undefined');
    });

    it('fjerner duplikate feltnavn', () => {
        const error = new ZodError([issue(['body', 'medlemskap']), issue(['body', 'medlemskap'])]);

        expect(getFeltOgMeldingFraZodError(error)).toBe('medlemskap: Invalid input: expected boolean, received undefined');
    });

    it('inkluderer zod-meldingen i den tekniske feilbeskrivelsen', () => {
        const error = new ZodError([issue(['body', 'søkerNorskIdent'])]);

        expect(getFeltOgMeldingFraZodError(error)).toContain('Invalid input');
    });
});
