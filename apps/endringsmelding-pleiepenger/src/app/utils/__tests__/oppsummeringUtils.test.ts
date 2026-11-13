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

describe('dagerBakover og dagerFremover', () => {
    beforeEach(() => {
        vi.useFakeTimers();
        vi.setSystemTime(new Date(2026, 10, 13, 12, 0));
    });
    afterEach(() => {
        vi.useRealTimers();
    });

    const getMetadataForTilsyn = (perioder: string[]) =>
        getSøknadApiDataMetadata(
            {
                ytelse: {
                    tilsynsordning: {
                        perioder: Object.fromEntries(perioder.map((p) => [p, { etablertTilsynTimerPerDag: 'PT1H' }])),
                    },
                },
            } as unknown as SøknadApiData,
            søknadsdata,
            {} as ValgteEndringer,
            {} as ValgteEndringer,
            sak,
        );

    it('gir 0 dager bakover når alle endringer er frem i tid', () => {
        const metadata = getMetadataForTilsyn(['2026-11-16/2026-11-20']);
        expect(metadata.dagerBakover).toBe(0);
        expect(metadata.dagerFremover).toBe(7);
    });

    it('gir 0 dager fremover når alle endringer er tilbake i tid', () => {
        const metadata = getMetadataForTilsyn(['2026-11-02/2026-11-06']);
        expect(metadata.dagerBakover).toBe(11);
        expect(metadata.dagerFremover).toBe(0);
    });

    it('bruker tidligste startdato og seneste sluttdato på tvers av perioder', () => {
        const metadata = getMetadataForTilsyn(['2026-11-16/2026-11-20', '2026-11-09/2026-11-10']);
        expect(metadata.dagerBakover).toBe(4);
        expect(metadata.dagerFremover).toBe(7);
    });
});
