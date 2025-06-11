import { YesOrNo } from '@navikt/sif-common-formik-ds';
import { describe, expect, it } from 'vitest';
import { Spørsmål, SøknadSvar } from '../../types';
import { buildSøknadFromSvar } from './oppsummeringUtils';

const deltakelseId = '12345';
const oppgaveReferanse = '12345';

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

        const result = buildSøknadFromSvar(
            deltakelseId,
            oppgaveReferanse,
            svar,
            søkerNorskIdent,
            startdato,
            kontonummerFraRegister,
        );
        expect(result).toBeUndefined();
    });

    it('returnerer undefined hvis BARN ikke er besvart med YES eller NO', () => {
        const svar: SøknadSvar = {
            [Spørsmål.FORSTÅR_PLIKTER]: true,
            [Spørsmål.BARN]: undefined,
            [Spørsmål.KONTONUMMER]: YesOrNo.YES,
        };

        const result = buildSøknadFromSvar(
            deltakelseId,
            oppgaveReferanse,
            svar,
            søkerNorskIdent,
            startdato,
            kontonummerFraRegister,
        );
        expect(result).toBeUndefined();
    });

    it('returnerer undefined hvis KONTONUMMER ikke er besvart med YES eller NO når kontonummer finnes', () => {
        const svar: SøknadSvar = {
            [Spørsmål.FORSTÅR_PLIKTER]: true,
            [Spørsmål.BARN]: YesOrNo.YES,
            [Spørsmål.KONTONUMMER]: undefined,
        };

        const result = buildSøknadFromSvar(
            deltakelseId,
            oppgaveReferanse,
            svar,
            søkerNorskIdent,
            startdato,
            kontonummerFraRegister,
        );
        expect(result).toBeUndefined();
    });

    it('returnerer gyldig søknadsobjekt når alle krav er oppfylt og kontonummer finnes', () => {
        const svar: SøknadSvar = {
            [Spørsmål.FORSTÅR_PLIKTER]: true,
            [Spørsmål.BARN]: YesOrNo.YES,
            [Spørsmål.KONTONUMMER]: YesOrNo.YES,
        };

        const result = buildSøknadFromSvar(
            deltakelseId,
            oppgaveReferanse,
            svar,
            søkerNorskIdent,
            startdato,
            kontonummerFraRegister,
        );
        expect(result).toEqual({
            språk: 'nb',
            startdato: '2023-01-01',
            harForståttRettigheterOgPlikter: true,
            barnErRiktig: true,
            deltakelseId: '12345',
            oppgaveReferanse: '12345',
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

        const result = buildSøknadFromSvar(deltakelseId, oppgaveReferanse, svar, søkerNorskIdent, startdato);
        expect(result).toEqual({
            språk: 'nb',
            startdato: '2023-01-01',
            harForståttRettigheterOgPlikter: true,
            deltakelseId: '12345',
            oppgaveReferanse: '12345',
            barnErRiktig: false,
            kontonummerErRiktig: undefined,
            søkerNorskIdent,
            kontonummerFraRegister: undefined,
        });
    });
});
