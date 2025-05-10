import { YesOrNo } from '@navikt/sif-common-formik-ds';
import { describe, expect, it } from 'vitest';
import { Spørsmål, SøknadSvar } from '../../types';
import { buildSøknadFromSvar } from './oppsummeringUtils';

describe('buildSøknadFromSvar', () => {
    const søkerNorskIdent = '12345678910';
    const startdato = new Date('2023-01-01');
    const kontonummerFraRegister = '12345678901';

    it('returnerer undefined hvis FORSTÅR_PLIKTER ikke er true', () => {
        const svar: SøknadSvar = {
            [Spørsmål.FORSTÅR_PLIKTER]: false,
            [Spørsmål.BARN]: YesOrNo.YES,
            [Spørsmål.KONTONUMMER]: YesOrNo.YES,
        };

        const result = buildSøknadFromSvar(svar, søkerNorskIdent, startdato, kontonummerFraRegister);
        expect(result).toBeUndefined();
    });

    it('returnerer undefined hvis BARN ikke er besvart med YES eller NO', () => {
        const svar: SøknadSvar = {
            [Spørsmål.FORSTÅR_PLIKTER]: true,
            [Spørsmål.BARN]: undefined,
            [Spørsmål.KONTONUMMER]: YesOrNo.YES,
        };

        const result = buildSøknadFromSvar(svar, søkerNorskIdent, startdato, kontonummerFraRegister);
        expect(result).toBeUndefined();
    });

    it('returnerer undefined hvis KONTONUMMER ikke er besvart med YES eller NO når kontonummer finnes', () => {
        const svar: SøknadSvar = {
            [Spørsmål.FORSTÅR_PLIKTER]: true,
            [Spørsmål.BARN]: YesOrNo.YES,
            [Spørsmål.KONTONUMMER]: undefined,
        };

        const result = buildSøknadFromSvar(svar, søkerNorskIdent, startdato, kontonummerFraRegister);
        expect(result).toBeUndefined();
    });

    it('returnerer gyldig søknadsobjekt når alle krav er oppfylt og kontonummer finnes', () => {
        const svar: SøknadSvar = {
            [Spørsmål.FORSTÅR_PLIKTER]: true,
            [Spørsmål.BARN]: YesOrNo.YES,
            [Spørsmål.KONTONUMMER]: YesOrNo.YES,
        };

        const result = buildSøknadFromSvar(svar, søkerNorskIdent, startdato, kontonummerFraRegister);
        expect(result).toEqual({
            språk: 'nb',
            startdato: '2023-01-01',
            harForståttRettigheterOgPlikter: true,
            barnErRiktig: true,
            kontonummerErRiktig: true,
            søkerNorskIdent,
            kontonummerFraRegister: '1234 56 78901', // Forutsatt at `formaterKontonummer` formaterer slik
        });
    });

    it('returnerer gyldig søknadsobjekt når alle krav er oppfylt og kontonummer ikke finnes', () => {
        const svar: SøknadSvar = {
            [Spørsmål.FORSTÅR_PLIKTER]: true,
            [Spørsmål.BARN]: YesOrNo.NO,
        };

        const result = buildSøknadFromSvar(svar, søkerNorskIdent, startdato);
        expect(result).toEqual({
            språk: 'nb',
            startdato: '2023-01-01',
            harForståttRettigheterOgPlikter: true,
            barnErRiktig: false,
            kontonummerErRiktig: undefined,
            søkerNorskIdent,
            kontonummerFraRegister: undefined,
        });
    });
});
