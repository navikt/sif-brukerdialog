import { KontonummerInfo } from '@navikt/k9-brukerdialog-prosessering-api';
import { YesOrNo } from '@navikt/sif-common-formik-ds';
import { describe, expect, it } from 'vitest';

import { HarKontonummerEnum } from '../steg/oppsummering/oppsummeringUtils';
import { KontonummerOppslagInfo, SøknadSvar, Spørsmål, Steg } from '../types';
import { erStegTilgjengelig, getTilgjengeligeSteg } from './stegUtils';

describe('stegUtils', () => {
    const kontonummerInfoMedKontonummer: KontonummerOppslagInfo = {
        harKontonummer: HarKontonummerEnum.JA,
        formatertKontonummer: '1234 56 78901',
        kontonummerFraRegister: '12345678901',
    };
    const kontonummerInfoUtenKontonummer: KontonummerInfo = { harKontonummer: HarKontonummerEnum.NEI };

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
