import { describe, expect, it } from 'vitest';

import { getOppgaveGjelderAvkortetMåned, getSisteVirkedagIMåned } from './rapporterInntektUtils';

describe('rapporterInntektUtils', () => {
    describe('getSisteVirkedagIMåned', () => {
        it('returnerer siste fredag når måneden slutter på lørdag', () => {
            // Mars 2025 slutter på mandag 31. mars
            const dato = new Date(2025, 2, 15); // 15. mars 2025
            const result = getSisteVirkedagIMåned(dato);
            expect(result).toEqual(new Date(2025, 2, 31, 0, 0, 0, 0)); // Mandag 31. mars
        });

        it('returnerer siste fredag når måneden slutter på søndag', () => {
            // Juni 2025 slutter på mandag 30. juni
            const dato = new Date(2025, 5, 15); // 15. juni 2025
            const result = getSisteVirkedagIMåned(dato);
            expect(result).toEqual(new Date(2025, 5, 30, 0, 0, 0, 0)); // Mandag 30. juni
        });

        it('returnerer siste dag når måneden slutter på fredag', () => {
            // Januar 2025 slutter på fredag 31. januar
            const dato = new Date(2025, 0, 15); // 15. januar 2025
            const result = getSisteVirkedagIMåned(dato);
            expect(result).toEqual(new Date(2025, 0, 31, 0, 0, 0, 0)); // Fredag 31. januar
        });

        it('returnerer siste tirsdag når måneden slutter på søndag', () => {
            // November 2026 slutter på mandag 30. november
            const dato = new Date(2026, 10, 15); // 15. november 2026
            const result = getSisteVirkedagIMåned(dato);
            expect(result).toEqual(new Date(2026, 10, 30, 0, 0, 0, 0)); // Mandag 30. november
        });

        it('returnerer fredag når måneden slutter på søndag (august 2025)', () => {
            // August 2025 slutter på søndag 31. august
            const dato = new Date(2025, 7, 15); // 15. august 2025
            const result = getSisteVirkedagIMåned(dato);
            expect(result).toEqual(new Date(2025, 7, 29, 0, 0, 0, 0)); // Fredag 29. august
        });

        it('returnerer fredag når måneden slutter på søndag (november 2025)', () => {
            // November 2025 slutter på søndag 30. november
            const dato = new Date(2025, 10, 15); // 15. november 2025
            const result = getSisteVirkedagIMåned(dato);
            expect(result).toEqual(new Date(2025, 10, 28, 0, 0, 0, 0)); // Fredag 28. november
        });

        it('håndterer februar i skuddår', () => {
            // Februar 2024 slutter på torsdag 29. februar (skuddår)
            const dato = new Date(2024, 1, 15); // 15. februar 2024
            const result = getSisteVirkedagIMåned(dato);
            expect(result).toEqual(new Date(2024, 1, 29, 0, 0, 0, 0)); // Torsdag 29. februar
        });

        it('håndterer februar i ikke-skuddår', () => {
            // Februar 2025 slutter på fredag 28. februar
            const dato = new Date(2025, 1, 15); // 15. februar 2025
            const result = getSisteVirkedagIMåned(dato);
            expect(result).toEqual(new Date(2025, 1, 28, 0, 0, 0, 0)); // Fredag 28. februar
        });
    });

    describe('getOppgaveGjelderAvkortetMåned', () => {
        it('returnerer true når tilDato er før siste virkedag', () => {
            // November 2025: siste virkedag er fredag 28. november
            const tilDato = new Date(2025, 10, 26); // Onsdag 26. november
            const result = getOppgaveGjelderAvkortetMåned(tilDato);
            expect(result).toBe(true);
        });

        it('returnerer false når tilDato er siste virkedag', () => {
            // November 2025: siste virkedag er fredag 28. november
            const tilDato = new Date(2025, 10, 28); // Fredag 28. november
            const result = getOppgaveGjelderAvkortetMåned(tilDato);
            expect(result).toBe(false);
        });

        it('returnerer false når tilDato er etter siste virkedag (lørdag)', () => {
            // November 2025: siste virkedag er fredag 28. november
            const tilDato = new Date(2025, 10, 29); // Lørdag 29. november
            const result = getOppgaveGjelderAvkortetMåned(tilDato);
            expect(result).toBe(false);
        });

        it('returnerer false når tilDato er etter siste virkedag (søndag)', () => {
            // November 2025: siste virkedag er fredag 28. november
            const tilDato = new Date(2025, 10, 30); // Søndag 30. november
            const result = getOppgaveGjelderAvkortetMåned(tilDato);
            expect(result).toBe(false);
        });

        it('returnerer true når tilDato er mange dager før siste virkedag', () => {
            // Januar 2025: siste virkedag er fredag 31. januar
            const tilDato = new Date(2025, 0, 20); // Mandag 20. januar
            const result = getOppgaveGjelderAvkortetMåned(tilDato);
            expect(result).toBe(true);
        });

        it('returnerer true når tilDato er dagen før siste virkedag', () => {
            // Januar 2025: siste virkedag er fredag 31. januar
            const tilDato = new Date(2025, 0, 30); // Torsdag 30. januar
            const result = getOppgaveGjelderAvkortetMåned(tilDato);
            expect(result).toBe(true);
        });

        it('returnerer true for februar når tilDato er før siste virkedag', () => {
            // Februar 2025: siste virkedag er fredag 28. februar
            const tilDato = new Date(2025, 1, 25); // Tirsdag 25. februar
            const result = getOppgaveGjelderAvkortetMåned(tilDato);
            expect(result).toBe(true);
        });
    });
});
