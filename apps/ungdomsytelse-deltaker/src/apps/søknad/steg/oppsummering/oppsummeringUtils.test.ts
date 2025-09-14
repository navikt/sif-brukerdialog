import { KontonummerInfo } from '@navikt/k9-brukerdialog-prosessering-api';
import { YesOrNo } from '@navikt/sif-common-formik-ds';
import { describe, expect, it } from 'vitest';

import { KontonummerOppslagInfo, SøknadSvar, Spørsmål } from '../../types';
import { buildSøknadFromSvar, HarKontonummerEnum } from './oppsummeringUtils';

const deltakelseId = '12345';
const oppgaveReferanse = '12345';

describe('buildSøknadFromSvar', () => {
    const søkerNorskIdent = '12345678910';
    const startdato = new Date('2023-01-01');

    const kontonummerInfo: KontonummerOppslagInfo = {
        harKontonummer: HarKontonummerEnum.JA,
        formatertKontonummer: '1234 56 78901',
        kontonummerFraRegister: '12345678901',
    };
    it('returnerer undefined hvis FORSTÅR_PLIKTER ikke er true', () => {
        const svar: SøknadSvar = {
            [Spørsmål.FORSTÅR_PLIKTER]: false,
            [Spørsmål.BARN]: YesOrNo.YES,
            [Spørsmål.KONTONUMMER]: YesOrNo.YES,
        };

        const result = buildSøknadFromSvar({
            deltakelseId,
            oppgaveReferanse,
            svar,
            søkerNorskIdent,
            startdato,
            kontonummerInfo,
        });
        expect(result).toBeUndefined();
    });

    it('returnerer undefined hvis BARN ikke er besvart med YES eller NO', () => {
        const svar: SøknadSvar = {
            [Spørsmål.FORSTÅR_PLIKTER]: true,
            [Spørsmål.BARN]: undefined,
            [Spørsmål.KONTONUMMER]: YesOrNo.YES,
        };

        const result = buildSøknadFromSvar({
            deltakelseId,
            oppgaveReferanse,
            svar,
            søkerNorskIdent,
            startdato,
            kontonummerInfo,
        });
        expect(result).toBeUndefined();
    });

    it('returnerer undefined hvis KONTONUMMER ikke er besvart med YES eller NO når kontonummer finnes', () => {
        const svar: SøknadSvar = {
            [Spørsmål.FORSTÅR_PLIKTER]: true,
            [Spørsmål.BARN]: YesOrNo.YES,
            [Spørsmål.KONTONUMMER]: undefined,
        };

        const result = buildSøknadFromSvar({
            deltakelseId,
            oppgaveReferanse,
            svar,
            søkerNorskIdent,
            startdato,
            kontonummerInfo,
        });
        expect(result).toBeUndefined();
    });

    it('returnerer gyldig søknadsobjekt når alle krav er oppfylt og kontonummer finnes', () => {
        const svar: SøknadSvar = {
            [Spørsmål.FORSTÅR_PLIKTER]: true,
            [Spørsmål.BARN]: YesOrNo.YES,
            [Spørsmål.KONTONUMMER]: YesOrNo.YES,
        };

        const result = buildSøknadFromSvar({
            deltakelseId,
            oppgaveReferanse,
            svar,
            søkerNorskIdent,
            startdato,
            kontonummerInfo,
        });

        const kontonummerApiInfo: KontonummerInfo = {
            harKontonummer: HarKontonummerEnum.JA,
            kontonummerErRiktig: true,
            kontonummerFraRegister: '12345678901',
        };

        expect(result).toEqual({
            språk: 'nb',
            startdato: '2023-01-01',
            harForståttRettigheterOgPlikter: true,
            barnErRiktig: true,
            deltakelseId: '12345',
            oppgaveReferanse: '12345',
            søkerNorskIdent,
            kontonummerInfo: kontonummerApiInfo,
        });
    });

    it('returnerer gyldig søknadsobjekt når alle krav er oppfylt og kontonummer ikke finnes', () => {
        const svar: SøknadSvar = {
            [Spørsmål.FORSTÅR_PLIKTER]: true,
            [Spørsmål.BARN]: YesOrNo.NO,
        };

        const result = buildSøknadFromSvar({
            deltakelseId,
            oppgaveReferanse,
            svar,
            søkerNorskIdent,
            startdato,
            kontonummerInfo: {
                harKontonummer: HarKontonummerEnum.NEI,
            },
        });

        expect(result).toEqual({
            språk: 'nb',
            startdato: '2023-01-01',
            harForståttRettigheterOgPlikter: true,
            deltakelseId: '12345',
            oppgaveReferanse: '12345',
            barnErRiktig: false,
            søkerNorskIdent,
            kontonummerInfo: {
                harKontonummer: HarKontonummerEnum.NEI,
            },
        });
    });
});
