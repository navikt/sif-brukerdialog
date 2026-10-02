import { describe, expect, it } from 'vitest';

import { getIngenTilgangMeta } from '../ingenTilgangMeta';
import { lagArbeidstaker, lagSak } from './testdata';

/**
 * Loggmetadata som følger med avslag fra fase 2. Kriteriet er timer over null,
 * i motsetning til SN-tilgangsregelen som kun ser om det finnes perioder.
 */
describe('getIngenTilgangMeta', () => {
    it('markerer ingen arbeidsforhold når saken ikke har arbeidstid', () => {
        expect(getIngenTilgangMeta(lagSak().ytelse.arbeidstid)).toEqual({
            erArbeidstaker: false,
            erFrilanser: false,
            erSN: false,
        });
    });

    it('markerer arbeidstaker, frilanser og SN når de har timer', () => {
        const sak = lagSak({
            arbeidstakere: [lagArbeidstaker('111')],
            snTimerPerDag: 'PT7H30M',
            frilansTimerPerDag: 'PT3H0M',
        });
        expect(getIngenTilgangMeta(sak.ytelse.arbeidstid)).toEqual({
            erArbeidstaker: true,
            erFrilanser: true,
            erSN: true,
        });
    });

    it('markerer ikke arbeidsforhold med perioder uten timer', () => {
        const sak = lagSak({
            arbeidstakere: [lagArbeidstaker('111', 'PT0H0M')],
            snTimerPerDag: 'PT0H0M',
            frilansTimerPerDag: 'PT0H0M',
        });
        expect(getIngenTilgangMeta(sak.ytelse.arbeidstid)).toEqual({
            erArbeidstaker: false,
            erFrilanser: false,
            erSN: false,
        });
    });
});
