import { describe, expect, it } from 'vitest';

import { getOppgaveGjelderAvkortetMåned, getSisteVirkedagIMåned } from './rapporterInntektUtils';

describe('rapporterInntektUtils', () => {
    describe('getSisteVirkedagIMåned', () => {
        it('returnerer mandag når måneden slutter på en mandag', () => {
            // Mars 2025 slutter på mandag 31. mars
            const dato = new Date(2025, 2, 15);
            const result = getSisteVirkedagIMåned(dato);
            expect(result).toEqual(new Date(2025, 2, 31, 0, 0, 0, 0));
        });

        it('returnerer siste fredag når måneden slutter på lørdag', () => {
            // Mai 2025 slutter på lørdag 31. mai.
            const dato = new Date(2025, 4, 15);
            const result = getSisteVirkedagIMåned(dato);
            expect(result).toEqual(new Date(2025, 4, 30, 0, 0, 0, 0));
        });

        it('returnerer siste fredag når måneden slutter på søndag', () => {
            // August 2025 slutter på søndag 31. august
            const dato = new Date(2025, 7, 15);
            const result = getSisteVirkedagIMåned(dato);
            expect(result).toEqual(new Date(2025, 7, 29, 0, 0, 0, 0));
        });

        it('håndterer februar i skuddår', () => {
            // Februar 2024 slutter på torsdag 29. februar
            const dato = new Date(2024, 1, 15);
            const result = getSisteVirkedagIMåned(dato);
            expect(result).toEqual(new Date(2024, 1, 29, 0, 0, 0, 0));
        });
    });

    describe('getOppgaveGjelderAvkortetMåned', () => {
        it('returnerer true når tilDato er før siste virkedag', () => {
            // November 2025: siste virkedag er fredag 28. november
            const tilDato = new Date(2025, 10, 26);
            const result = getOppgaveGjelderAvkortetMåned(tilDato);
            expect(result).toBe(true);
        });

        it('returnerer false når tilDato er siste virkedag', () => {
            // November 2025: siste virkedag er fredag 28. november
            const tilDato = new Date(2025, 10, 28);
            const result = getOppgaveGjelderAvkortetMåned(tilDato);
            expect(result).toBe(false);
        });

        it('returnerer false når tilDato er etter siste virkedag', () => {
            // November 2025: siste virkedag er fredag 28. november, test med lørdag 29.
            const tilDato = new Date(2025, 10, 29);
            const result = getOppgaveGjelderAvkortetMåned(tilDato);
            expect(result).toBe(false);
        });
    });
});
