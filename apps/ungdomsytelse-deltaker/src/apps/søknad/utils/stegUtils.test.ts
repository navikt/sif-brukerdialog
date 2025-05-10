import { describe, it, expect } from 'vitest';
import { getTilgjengeligeSteg, erStegTilgjengelig } from './stegUtils';
import { Steg, Spørsmål, SøknadSvar, KontonummerInfo } from '../types';
import { YesOrNo } from '@navikt/sif-common-formik-ds';

describe('stegUtils', () => {
    const kontonummerInfoMedKontonummer: KontonummerInfo = {
        harKontonummer: true,
        kontonummerFraRegister: '12345678901',
    };
    const kontonummerInfoUtenKontonummer: KontonummerInfo = { harKontonummer: false };

    describe('getTilgjengeligeSteg', () => {
        it('returnerer ingen steg hvis FORSTÅR_PLIKTER ikke er true', () => {
            const svar: SøknadSvar = {
                [Spørsmål.FORSTÅR_PLIKTER]: false,
                [Spørsmål.BARN]: undefined,
                [Spørsmål.KONTONUMMER]: undefined,
            };

            const result = getTilgjengeligeSteg(svar, kontonummerInfoMedKontonummer);
            expect(result).toEqual([]);
        });

        it('returnerer kun Steg.KONTONUMMER hvis FORSTÅR_PLIKTER er true, men ingen andre spørsmål er besvart', () => {
            const svar: SøknadSvar = {
                [Spørsmål.FORSTÅR_PLIKTER]: true,
                [Spørsmål.BARN]: undefined,
                [Spørsmål.KONTONUMMER]: undefined,
            };

            const result = getTilgjengeligeSteg(svar, kontonummerInfoMedKontonummer);
            expect(result).toEqual([Steg.KONTONUMMER]);
        });

        it('returnerer Steg.KONTONUMMER og Steg.BARN hvis FORSTÅR_PLIKTER er true og KONTONUMMER er besvart', () => {
            const svar: SøknadSvar = {
                [Spørsmål.FORSTÅR_PLIKTER]: true,
                [Spørsmål.BARN]: undefined,
                [Spørsmål.KONTONUMMER]: YesOrNo.YES,
            };

            const result = getTilgjengeligeSteg(svar, kontonummerInfoMedKontonummer);
            expect(result).toEqual([Steg.KONTONUMMER, Steg.BARN]);
        });

        it('returnerer alle steg hvis alle spørsmål er besvart', () => {
            const svar: SøknadSvar = {
                [Spørsmål.FORSTÅR_PLIKTER]: true,
                [Spørsmål.BARN]: YesOrNo.YES,
                [Spørsmål.KONTONUMMER]: YesOrNo.YES,
            };

            const result = getTilgjengeligeSteg(svar, kontonummerInfoMedKontonummer);
            expect(result).toEqual([Steg.KONTONUMMER, Steg.BARN, Steg.OPPSUMMERING]);
        });

        it('hopper over Steg.KONTONUMMER hvis kontonummer ikke er påkrevd', () => {
            const svar: SøknadSvar = {
                [Spørsmål.FORSTÅR_PLIKTER]: true,
                [Spørsmål.BARN]: YesOrNo.YES,
                [Spørsmål.KONTONUMMER]: undefined,
            };

            const result = getTilgjengeligeSteg(svar, kontonummerInfoUtenKontonummer);
            expect(result).toEqual([Steg.KONTONUMMER, Steg.BARN, Steg.OPPSUMMERING]);
        });
    });

    describe('erStegTilgjengelig', () => {
        it('returnerer false hvis steg ikke er tilgjengelig', () => {
            const svar: SøknadSvar = {
                [Spørsmål.FORSTÅR_PLIKTER]: false,
                [Spørsmål.BARN]: undefined,
                [Spørsmål.KONTONUMMER]: undefined,
            };

            const result = erStegTilgjengelig(Steg.KONTONUMMER, svar, kontonummerInfoMedKontonummer);
            expect(result).toBe(false);
        });

        it('returnerer true hvis steg er tilgjengelig', () => {
            const svar: SøknadSvar = {
                [Spørsmål.FORSTÅR_PLIKTER]: true,
                [Spørsmål.BARN]: YesOrNo.YES,
                [Spørsmål.KONTONUMMER]: YesOrNo.YES,
            };

            const result = erStegTilgjengelig(Steg.OPPSUMMERING, svar, kontonummerInfoMedKontonummer);
            expect(result).toBe(true);
        });
    });
});
