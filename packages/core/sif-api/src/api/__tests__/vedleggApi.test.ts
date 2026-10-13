import { describe, expect, it } from 'vitest';

import { getVedleggIdFromResponseHeaderLocation } from '../vedleggApi';

describe('getVedleggIdFromResponseHeaderLocation', () => {
    it('returnerer vedleggId fra location-header', () => {
        expect(getVedleggIdFromResponseHeaderLocation('/vedlegg/abc123')).toBe('abc123');
    });

    it('kaster tydelig feil når location-header mangler', () => {
        expect(() => getVedleggIdFromResponseHeaderLocation(undefined)).toThrow(
            'Kunne ikke hente vedleggId fordi response header Location mangler',
        );
    });

    it('kaster feil når location-header ikke inneholder vedleggId', () => {
        expect(() => getVedleggIdFromResponseHeaderLocation('/api/vedlegg/')).toThrow(
            'Kunne ikke hente vedleggId fra url',
        );
    });
});
