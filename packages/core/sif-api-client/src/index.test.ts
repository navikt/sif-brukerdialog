import { describe, expect, it } from 'vitest';

import { commonRequestHeaders, normalizeResponseData } from './index';

describe('normalizeResponseData', () => {
    it('normaliserer null i vanlige objekter', () => {
        expect(normalizeResponseData({ verdi: null, nestet: { verdi: null } })).toEqual({
            verdi: undefined,
            nestet: { verdi: undefined },
        });
    });

    describe('commonRequestHeaders', () => {
        it('includes the required git SHA header', () => {
            expect(commonRequestHeaders['X-Brukerdialog-Git-Sha']).toBe('overskrives-av-server');
        });
    });

    it('bevarer Blob', () => {
        const blob = new Blob(['innhold']);

        expect(normalizeResponseData(blob)).toBe(blob);
    });
});
