import { IngenTilgangÅrsak } from '@app/types';
import { ISODateRangeToDateRange } from '@navikt/sif-common-utils';
import { describe, expect, it } from 'vitest';

import { K9SakResult } from '../../api/endpoints/sakerEndpoint';
import { getOppslagsperiode, vurderSaker } from '../vurderSaker';
import { lagSak, periode, ugyldigSak } from './testdata';

/**
 * Spesifikasjon for fase 1 av tilgangskontrollen.
 *
 * Denne tabellen er fasiten både for frontend-implementasjonen og for backend.
 * Legg til en rad før du endrer en regel — ikke etterpå.
 */

const tillattEndringsperiode = periode('2024-01-01/2024-12-31');

const eldreSak = lagSak({ søknadsperioder: ['2020-01-01/2020-01-31'] });

interface AvslagCase {
    beskrivelse: string;
    saker: K9SakResult[];
    eldreSaker: K9SakResult[];
    forventet: IngenTilgangÅrsak;
}

const avslagCases: AvslagCase[] = [
    {
        beskrivelse: 'ingen saker overhodet',
        saker: [],
        eldreSaker: [],
        forventet: IngenTilgangÅrsak.harIngenSak,
    },
    {
        beskrivelse: 'ingen aktuelle saker, men bruker har eldre saker',
        saker: [],
        eldreSaker: [eldreSak],
        forventet: IngenTilgangÅrsak.søknadsperioderUtenforTillattEndringsperiode,
    },
    {
        beskrivelse: 'én sak med ugyldig format',
        saker: [ugyldigSak],
        eldreSaker: [],
        forventet: IngenTilgangÅrsak.harUgyldigK9FormatSak,
    },
    {
        beskrivelse: 'ugyldig format veier tyngre enn at bruker også har eldre saker',
        saker: [ugyldigSak],
        eldreSaker: [eldreSak],
        forventet: IngenTilgangÅrsak.harUgyldigK9FormatSak,
    },
    {
        beskrivelse: 'ugyldig format blant flere aktuelle saker rapporteres før antall saker',
        saker: [lagSak(), ugyldigSak],
        eldreSaker: [],
        forventet: IngenTilgangÅrsak.harUgyldigK9FormatSak,
    },
    {
        beskrivelse: 'to aktuelle saker',
        saker: [lagSak(), lagSak()],
        eldreSaker: [],
        forventet: IngenTilgangÅrsak.harMerEnnEnSak,
    },
    {
        beskrivelse: 'én aktuell sak uten søknadsperioder',
        saker: [lagSak({ søknadsperioder: [] })],
        eldreSaker: [],
        forventet: IngenTilgangÅrsak.harIngenPerioder,
    },
    {
        beskrivelse: 'én aktuell sak som ligger helt etter endringsperioden',
        saker: [lagSak({ søknadsperioder: ['2026-01-01/2026-01-31'] })],
        eldreSaker: [],
        forventet: IngenTilgangÅrsak.søknadsperioderUtenforTillattEndringsperiode,
    },
];

interface TilgangCase {
    beskrivelse: string;
    saker: K9SakResult[];
    eldreSaker: K9SakResult[];
}

const tilgangCases: TilgangCase[] = [
    {
        beskrivelse: 'én aktuell sak med søknadsperioder',
        saker: [lagSak()],
        eldreSaker: [],
    },
    {
        beskrivelse: 'én aktuell sak og én eldre sak - eldre saker teller ikke med',
        saker: [lagSak()],
        eldreSaker: [eldreSak],
    },
];

describe('vurderSaker', () => {
    it.each(avslagCases)('nekter tilgang: $beskrivelse', ({ saker, eldreSaker, forventet }) => {
        const resultat = vurderSaker(saker, eldreSaker, tillattEndringsperiode);
        expect(resultat).toEqual({ kanBruke: false, årsak: [forventet] });
    });

    it.each(tilgangCases)('gir tilgang: $beskrivelse', ({ saker, eldreSaker }) => {
        const resultat = vurderSaker(saker, eldreSaker, tillattEndringsperiode);
        expect(resultat.kanBruke).toBe(true);
    });

    it('returnerer saken og oppslagsperioden når saken kan brukes', () => {
        const sak = lagSak({ søknadsperioder: ['2024-02-01/2024-03-31'] });
        const resultat = vurderSaker([sak], [], tillattEndringsperiode);

        expect(resultat).toEqual({
            kanBruke: true,
            sak,
            oppslagsperiode: ISODateRangeToDateRange('2024-02-01/2024-03-31'),
        });
    });
});

describe('getOppslagsperiode', () => {
    it('begrenser sakens periode til den tillatte endringsperioden', () => {
        const resultat = getOppslagsperiode(periode('2023-06-01/2025-06-30'), tillattEndringsperiode);
        expect(resultat).toEqual(ISODateRangeToDateRange('2024-01-01/2024-12-31'));
    });

    it('bruker sakens periode når den ligger helt innenfor endringsperioden', () => {
        const resultat = getOppslagsperiode(periode('2024-03-01/2024-04-30'), tillattEndringsperiode);
        expect(resultat).toEqual(ISODateRangeToDateRange('2024-03-01/2024-04-30'));
    });

    it('returnerer undefined når periodene ikke overlapper', () => {
        const resultat = getOppslagsperiode(periode('2026-01-01/2026-01-31'), tillattEndringsperiode);
        expect(resultat).toBeUndefined();
    });
});
