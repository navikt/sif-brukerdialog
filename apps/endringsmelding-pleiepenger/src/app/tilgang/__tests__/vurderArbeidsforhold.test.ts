import { ArbeidsgiverMedAnsettelseperioder, IngenTilgangÅrsak, K9Sak } from '@app/types';
import { describe, expect, it } from 'vitest';

import { vurderArbeidsforhold } from '../vurderArbeidsforhold';
import { lagArbeidsgiver, lagArbeidstaker, lagSak, periode } from './testdata';

/**
 * Spesifikasjon for fase 2 av tilgangskontrollen.
 *
 * I motsetning til fase 1 samles alle årsaker som slår til. Rekkefølgen i den
 * forventede listen er en del av spesifikasjonen.
 */

const tillattEndringsperiode = periode('2024-01-01/2024-12-31');

/** 2024-01-01 er en mandag. Uke 1 er 01.01-07.01, uke 2 er 08.01-14.01. */
const KJENT_ORGNR = '111';
const UKJENT_ORGNR = '999';

const sakMedKjentArbeidsgiver = lagSak({ arbeidstakere: [lagArbeidstaker(KJENT_ORGNR)] });

interface AvslagCase {
    beskrivelse: string;
    sak: K9Sak;
    arbeidsgivere: ArbeidsgiverMedAnsettelseperioder[];
    forventet: IngenTilgangÅrsak[];
}

const avslagCases: AvslagCase[] = [
    /** Regel 6 - selvstendig næringsdrivende */
    {
        beskrivelse: 'SN med arbeidstid',
        sak: lagSak({ snTimerPerDag: 'PT7H30M' }),
        arbeidsgivere: [],
        forventet: [IngenTilgangÅrsak.harArbeidstidSomSelvstendigNæringsdrivende],
    },
    {
        beskrivelse: 'SN-perioder uten timer blokkerer også - det er perioden som definerer SN',
        sak: lagSak({ snTimerPerDag: 'PT0H0M' }),
        arbeidsgivere: [],
        forventet: [IngenTilgangÅrsak.harArbeidstidSomSelvstendigNæringsdrivende],
    },

    /** Regel 7 - kjent arbeidsgiver, to ansettelser samme uke med opphold */
    {
        beskrivelse: 'kjent arbeidsgiver med to ansettelser samme isoUke med opphold',
        sak: sakMedKjentArbeidsgiver,
        arbeidsgivere: [lagArbeidsgiver(KJENT_ORGNR, ['2024-01-01/2024-01-02', '2024-01-04/2024-01-05'])],
        forventet: [IngenTilgangÅrsak.enArbeidsgiverToAnsettelserSammeUkeMedOpphold],
    },

    /** Regel 8 - ukjent arbeidsgiver med flere ansettelser */
    {
        beskrivelse: 'ukjent arbeidsgiver med flere ansettelser i søknadsperioden',
        sak: sakMedKjentArbeidsgiver,
        arbeidsgivere: [lagArbeidsgiver(UKJENT_ORGNR, ['2024-01-01/2024-01-10', '2024-01-15/2024-01-20'])],
        forventet: [IngenTilgangÅrsak.harFlereAnsettelsesforholdHosUkjentArbeidsgiver],
    },

    /** Flere årsaker samtidig - rekkefølgen er en del av spesifikasjonen */
    {
        beskrivelse: 'SN og ukjent arbeidsgiver gir begge årsaker i regelrekkefølge',
        sak: lagSak({ arbeidstakere: [lagArbeidstaker(KJENT_ORGNR)], snTimerPerDag: 'PT7H30M' }),
        arbeidsgivere: [lagArbeidsgiver(UKJENT_ORGNR, ['2024-01-01/2024-01-10', '2024-01-15/2024-01-20'])],
        forventet: [
            IngenTilgangÅrsak.harArbeidstidSomSelvstendigNæringsdrivende,
            IngenTilgangÅrsak.harFlereAnsettelsesforholdHosUkjentArbeidsgiver,
        ],
    },
    {
        beskrivelse: 'alle tre reglene slår til samtidig',
        sak: lagSak({ arbeidstakere: [lagArbeidstaker(KJENT_ORGNR)], snTimerPerDag: 'PT7H30M' }),
        arbeidsgivere: [
            lagArbeidsgiver(KJENT_ORGNR, ['2024-01-01/2024-01-02', '2024-01-04/2024-01-05']),
            lagArbeidsgiver(UKJENT_ORGNR, ['2024-01-01/2024-01-10', '2024-01-15/2024-01-20']),
        ],
        forventet: [
            IngenTilgangÅrsak.harArbeidstidSomSelvstendigNæringsdrivende,
            IngenTilgangÅrsak.enArbeidsgiverToAnsettelserSammeUkeMedOpphold,
            IngenTilgangÅrsak.harFlereAnsettelsesforholdHosUkjentArbeidsgiver,
        ],
    },
];

interface TilgangCase {
    beskrivelse: string;
    sak: K9Sak;
    arbeidsgivere: ArbeidsgiverMedAnsettelseperioder[];
}

const tilgangCases: TilgangCase[] = [
    {
        beskrivelse: 'ingen arbeidsgivere og ingen selvstendig næring',
        sak: lagSak(),
        arbeidsgivere: [],
    },
    {
        beskrivelse: 'frilans blokkerer ikke',
        sak: lagSak({ frilansTimerPerDag: 'PT7H30M' }),
        arbeidsgivere: [],
    },
    {
        beskrivelse: 'kjent arbeidsgiver med opphold på tvers av uker',
        sak: sakMedKjentArbeidsgiver,
        arbeidsgivere: [lagArbeidsgiver(KJENT_ORGNR, ['2024-01-01/2024-01-02', '2024-01-10/2024-01-11'])],
    },
    {
        beskrivelse: 'kjent arbeidsgiver med sammenhengende perioder samme uke',
        sak: sakMedKjentArbeidsgiver,
        arbeidsgivere: [lagArbeidsgiver(KJENT_ORGNR, ['2024-01-01/2024-01-02', '2024-01-03/2024-01-05'])],
    },
    {
        beskrivelse: 'kjent arbeidsgiver hvor oppholdet er dekket av en overlappende periode',
        sak: sakMedKjentArbeidsgiver,
        arbeidsgivere: [
            lagArbeidsgiver(KJENT_ORGNR, ['2024-01-01/2024-01-02', '2024-01-01/2024-01-05', '2024-01-04/2024-01-05']),
        ],
    },
    {
        beskrivelse: 'kjent arbeidsgiver med kun én ansettelsesperiode',
        sak: sakMedKjentArbeidsgiver,
        arbeidsgivere: [lagArbeidsgiver(KJENT_ORGNR, ['2024-01-01/2024-01-31'])],
    },
    {
        beskrivelse: 'ukjent arbeidsgiver med kun én ansettelse',
        sak: sakMedKjentArbeidsgiver,
        arbeidsgivere: [lagArbeidsgiver(UKJENT_ORGNR, ['2024-01-01/2024-01-10'])],
    },
    {
        beskrivelse: 'ukjent arbeidsgiver hvor kun én ansettelse overlapper søknadsperioden',
        sak: sakMedKjentArbeidsgiver,
        arbeidsgivere: [lagArbeidsgiver(UKJENT_ORGNR, ['2024-01-01/2024-01-10', '2024-06-01/2024-06-30'])],
    },
];

describe('vurderArbeidsforhold', () => {
    it.each(avslagCases)('nekter tilgang: $beskrivelse', ({ sak, arbeidsgivere, forventet }) => {
        const resultat = vurderArbeidsforhold(sak, arbeidsgivere, tillattEndringsperiode);
        expect(resultat).toEqual({ kanBruke: false, årsak: forventet });
    });

    it.each(tilgangCases)('gir tilgang: $beskrivelse', ({ sak, arbeidsgivere }) => {
        const resultat = vurderArbeidsforhold(sak, arbeidsgivere, tillattEndringsperiode);
        expect(resultat).toEqual({ kanBruke: true });
    });
});
