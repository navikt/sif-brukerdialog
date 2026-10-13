import { ISODate } from '@sif/utils';
import { describe, expect, it } from 'vitest';

import { getOppgaveGjelderAvkortetMåned, getSisteVirkedagIMåned } from './oppgaveUtils';

describe('oppgaveUtils', () => {
    describe('getSisteVirkedagIMåned', () => {
        it('returnerer mandag når måneden slutter på en mandag', () => {
            // Mars 2025 slutter på mandag 31. mars
            const dato: ISODate = '2025-03-15' as ISODate;
            const result = getSisteVirkedagIMåned(dato);
            expect(result).toEqual('2025-03-31');
        });

        it('returnerer siste fredag når måneden slutter på lørdag', () => {
            // Mai 2025 slutter på lørdag 31. mai.
            const dato: ISODate = '2025-05-15' as ISODate;
            const result = getSisteVirkedagIMåned(dato);
            expect(result).toEqual('2025-05-30');
        });

        it('returnerer siste fredag når måneden slutter på søndag', () => {
            // August 2025 slutter på søndag 31. august
            const dato: ISODate = '2025-08-15' as ISODate;
            const result = getSisteVirkedagIMåned(dato);
            expect(result).toEqual('2025-08-29');
        });

        it('håndterer februar i skuddår', () => {
            // Februar 2024 slutter på torsdag 29. februar
            const dato: ISODate = '2024-02-15' as ISODate;
            const result = getSisteVirkedagIMåned(dato);
            expect(result).toEqual('2024-02-29');
        });
    });

    describe('getOppgaveGjelderAvkortetMåned', () => {
        it('returnerer true når tilDato er før siste virkedag', () => {
            // November 2025: siste virkedag er fredag 28. november
            const tilDato: ISODate = '2025-11-27' as ISODate;
            const result = getOppgaveGjelderAvkortetMåned(tilDato);
            expect(result).toBe(true);
        });

        it('returnerer false når tilDato er siste virkedag', () => {
            // November 2025: siste virkedag er fredag 28. november
            const tilDato: ISODate = '2025-11-28' as ISODate;
            const result = getOppgaveGjelderAvkortetMåned(tilDato);
            expect(result).toBe(false);
        });

        it('returnerer false når tilDato er etter siste virkedag', () => {
            // November 2025: siste virkedag er fredag 28. november, test med lørdag 29.
            const tilDato: ISODate = '2025-11-29' as ISODate;
            const result = getOppgaveGjelderAvkortetMåned(tilDato);
            expect(result).toBe(false);
        });
    });
});
