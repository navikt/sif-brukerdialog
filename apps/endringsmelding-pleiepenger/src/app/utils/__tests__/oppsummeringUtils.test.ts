import { vi } from 'vitest';

import type { Sak, SøknadApiData, Søknadsdata, ValgteEndringer } from '../../types';

vi.mock('../../søknad/steps/oppsummering/oppsummeringStepUtils', () => ({
    oppsummeringStepUtils: {
        harEndringerIArbeidstid: () => false,
        harEndringerILovbestemtFerieApiData: (lovbestemtFerie: { perioder: object }) =>
            Object.keys(lovbestemtFerie.perioder).length > 0,
    },
}));

import { getSøknadApiDataMetadata } from '../oppsummeringUtils';

const sak = {
    utledet: {
        aktiviteterSomKanEndres: [],
    },
    arbeidsaktivitetMedUkjentArbeidsgiver: [],
} as unknown as Sak;

const søknadsdata = {} as Søknadsdata;

const getApiData = (medFerieendring = false) =>
    ({
        ytelse: medFerieendring
            ? {
                  lovbestemtFerie: {
                      perioder: {
                          '2024-01-01/2024-01-01': {
                              skalHaFerie: true,
                          },
                      },
                  },
              }
            : {},
    }) as SøknadApiData;

describe('getSøknadApiDataMetadata', () => {
    it('logger tillegg fra oppsummering uten endring i det tillagte området', () => {
        const metadata = getSøknadApiDataMetadata(
            getApiData(),
            søknadsdata,
            { lovbestemtFerie: true } as ValgteEndringer,
            { lovbestemtFerie: false } as ValgteEndringer,
            sak,
        );

        expect(metadata.laTilFerieFraOppsummering).toBe(true);
        expect(metadata.gjordeEndringIFerieEtterTillegg).toBe(false);
    });

    it('logger endring i området som ble lagt til fra oppsummering', () => {
        const metadata = getSøknadApiDataMetadata(
            getApiData(true),
            søknadsdata,
            { lovbestemtFerie: true } as ValgteEndringer,
            { lovbestemtFerie: false } as ValgteEndringer,
            sak,
        );

        expect(metadata.laTilFerieFraOppsummering).toBe(true);
        expect(metadata.gjordeEndringIFerieEtterTillegg).toBe(true);
    });

    it('logger ikke tillegg fra oppsummering når endringstypen var valgt initielt', () => {
        const metadata = getSøknadApiDataMetadata(
            getApiData(true),
            søknadsdata,
            { lovbestemtFerie: true } as ValgteEndringer,
            { lovbestemtFerie: true } as ValgteEndringer,
            sak,
        );

        expect(metadata.laTilFerieFraOppsummering).toBe(false);
        expect(metadata.gjordeEndringIFerieEtterTillegg).toBe(false);
    });
});
