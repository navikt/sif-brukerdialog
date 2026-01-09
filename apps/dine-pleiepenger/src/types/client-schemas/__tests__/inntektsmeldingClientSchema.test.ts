import { describe, expect, it } from 'vitest';

import { utledNaturalYtelseEndring } from '../inntektsmeldingClientSchema';

describe('utledNaturalYtelseEndring', () => {
    it('returnerer mister når fom er 1901', () => {
        const result = utledNaturalYtelseEndring({
            fom: new Date('1901-01-01'),
            tom: new Date('2025-06-15'),
        });

        expect(result.endring).toBe('mister');
        expect(result.fom).toEqual(new Date('2025-06-16'));
    });

    it('returnerer mottar når tom er 9999', () => {
        const result = utledNaturalYtelseEndring({
            fom: new Date('2025-01-01'),
            tom: new Date('9999-12-31'),
        });

        expect(result.endring).toBe('mottar');
        expect(result.fom).toEqual(new Date('2025-01-02'));
    });

    it('kaster feil ved ugyldig periode (hverken 1901 eller 9999)', () => {
        expect(() =>
            utledNaturalYtelseEndring({
                fom: new Date('2025-01-01'),
                tom: new Date('2025-12-31'),
            }),
        ).toThrow('Ugyldig periode for naturalytelse');
    });

    it('kaster feil når både fom er 1901 og tom er 9999', () => {
        expect(() =>
            utledNaturalYtelseEndring({
                fom: new Date('1901-01-01'),
                tom: new Date('9999-12-31'),
            }),
        ).toThrow('Ugyldig periode for naturalytelse');
    });
});
