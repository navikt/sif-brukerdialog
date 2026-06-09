import { KontonummerInfo } from '@navikt/k9-brukerdialog-prosessering-api';
import { YesOrNo } from '@sif/rhf';
import { UtvidetKontonummerInfo } from '@sif/api/ung-deltaker';
import { describe, expect, it } from 'vitest';

import { Søknadsdata } from '../../setup/types/Søknadsdata';
import { buildSøknadFromSvar, HarKontonummerEnum } from './oppsummeringUtils';

const deltakelseId = '12345';
const oppgaveReferanse = '12345';

describe('buildSøknadFromSvar', () => {
    const søkerNorskIdent = '12345678910';
    const startdato = new Date('2023-01-01');

    const kontonummerInfo: UtvidetKontonummerInfo = {
        harKontonummer: HarKontonummerEnum.JA,
        formatertKontonummer: '1234 56 78901',
        kontonummerFraRegister: '12345678901',
    };
    it('returnerer undefined hvis FORSTÅR_PLIKTER ikke er true', () => {
        const søknadsdata: Søknadsdata = {
            harForståttRettigheterOgPlikter: false,
            barn: { barnStemmer: YesOrNo.YES },
            kontonummer: { kontonummerErRiktig: YesOrNo.YES },
        };

        const result = buildSøknadFromSvar({
            deltakelseId,
            oppgaveReferanse,
            søknadsdata,
            søkerNorskIdent,
            startdato,
            kontonummerInfo,
        });
        expect(result).toBeUndefined();
    });

    it('returnerer undefined hvis BARN ikke er besvart med YES eller NO', () => {
        const søknadsdata: Søknadsdata = {
            harForståttRettigheterOgPlikter: true,
            barn: undefined,
            kontonummer: { kontonummerErRiktig: YesOrNo.YES },
        };

        const result = buildSøknadFromSvar({
            deltakelseId,
            oppgaveReferanse,
            søknadsdata,
            søkerNorskIdent,
            startdato,
            kontonummerInfo,
        });
        expect(result).toBeUndefined();
    });

    it('returnerer undefined hvis KONTONUMMER ikke er besvart med YES eller NO når kontonummer finnes', () => {
        const søknadsdata: Søknadsdata = {
            harForståttRettigheterOgPlikter: true,
            barn: { barnStemmer: YesOrNo.YES },
            kontonummer: { kontonummerErRiktig: undefined },
        };

        const result = buildSøknadFromSvar({
            deltakelseId,
            oppgaveReferanse,
            søknadsdata,
            søkerNorskIdent,
            startdato,
            kontonummerInfo,
        });
        expect(result).toBeUndefined();
    });

    it('returnerer gyldig søknadsobjekt når alle krav er oppfylt og kontonummer finnes', () => {
        const søknadsdata: Søknadsdata = {
            harForståttRettigheterOgPlikter: true,
            barn: { barnStemmer: YesOrNo.YES },
            kontonummer: { kontonummerErRiktig: YesOrNo.YES },
        };

        const result = buildSøknadFromSvar({
            deltakelseId,
            oppgaveReferanse,
            søknadsdata,
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
        const søknadsdata: Søknadsdata = {
            harForståttRettigheterOgPlikter: true,
            barn: { barnStemmer: YesOrNo.NO },
        };

        const result = buildSøknadFromSvar({
            deltakelseId,
            oppgaveReferanse,
            søknadsdata,
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
