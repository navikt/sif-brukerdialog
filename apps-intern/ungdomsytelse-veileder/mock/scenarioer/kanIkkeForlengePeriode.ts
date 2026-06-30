import {
    DeltakelseDto,
    DeltakelseHistorikkDto,
    DeltakerPersonalia,
    Endringstype,
    Revisjonstype,
} from '@navikt/ung-deltakelse-opplyser-api-veileder';
import { beregnPeriodeMaksDato, relativeMockISODate, relativeMockTimestamp } from '../mockDateUtils';
import { MockScenario } from './types';

/**
 * Scenario: Periode utløpt og akkurat utenfor 6-ukersvinduet.
 * periodeMaksDato + 6 uker = demoMockDate → erInnenforSiste6UkerEtterPeriodeslutt=false → kanForlengePeriode=false.
 * Forventede handlinger: alle false.
 */

const DELTAKER_ID = '0ea083fc-058e-4a79-baed-37ede478dfc0';
const DELTAKELSE_ID = '61b43ddd-8b2d-4d9f-9a04-3a1a7df35c9d';
const FRA_OG_MED = relativeMockISODate(-14, 'months');

// Akkurat på grensen: periodeMaksDato + 6 uker = demoMockDate
const PERIODE_MAKS_DATO = relativeMockISODate(-6, 'weeks');

const deltakerPersonalia: DeltakerPersonalia = {
    id: DELTAKER_ID,
    deltakerIdent: '08419900835',
    navn: {
        fornavn: 'UTENFOR',
        etternavn: 'VINDU',
    },
    fødselsdato: '1999-01-08',
    førsteMuligeInnmeldingsdato: '2025-01-01',
    sisteMuligeInnmeldingsdato: '2029-01-08',
    diskresjonskoder: [],
};

const deltakelse: DeltakelseDto = {
    id: DELTAKELSE_ID,
    deltaker: { id: DELTAKER_ID, deltakerIdent: '08419900835' },
    fraOgMed: FRA_OG_MED,
    tilOgMed: undefined,
    erSlettet: false,
    harOpphørsvedtak: false,
    søktTidspunkt: relativeMockTimestamp(-14, 'months'),
    harForlengetPeriode: false,
    forlengetPeriodeMaksDato: beregnPeriodeMaksDato(FRA_OG_MED),
    periodeMaksDato: PERIODE_MAKS_DATO,
    harUtvidetKvote: false,
    kvoteMaksDato: PERIODE_MAKS_DATO,
};

const historikk: DeltakelseHistorikkDto[] = [
    {
        tidspunkt: relativeMockTimestamp(-14, 'months'),
        endringstype: Endringstype.DELTAKER_MELDT_INN,
        revisjonstype: Revisjonstype.OPPRETTET,
        endring: 'Deltaker er meldt inn i programmet.',
        aktør: 'Z990501 (veileder)',
    },
    {
        tidspunkt: relativeMockTimestamp(-14, 'months'),
        endringstype: Endringstype.DELTAKER_HAR_SØKT_YTELSE,
        revisjonstype: Revisjonstype.ENDRET,
        endring: 'Deltaker har søkt om ytelse.',
        aktør: '08419900835 (deltaker)',
    },
];

export const kanIkkeForlengePeriodeScenario: MockScenario = {
    fnr: '08419900835',
    beskrivelse: 'Kan ikke forlenge (akkurat utenfor 6-ukersvinduet)',
    gruppe: 'handlinger',
    forventedeHandlinger: {
        kanSlettes: { resultat: false, årsak: '' },
        kanEndreStartdato: { resultat: false, årsak: '' },
        kanMeldesUt: { resultat: false, årsak: '' },
        kanEndreSluttdato: { resultat: false, årsak: '' },
        kanForlengePeriode: { resultat: false, årsak: '' },
    },
    deltakerPersonalia,
    skjultPåGithubPages: true,
    deltakelse,
    historikk,
};
