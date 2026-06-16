import { DeltakelseDto, DeltakelseHistorikkDto, DeltakerPersonalia, Endringstype, Revisjonstype } from '@navikt/ung-deltakelse-opplyser-api-veileder';
import { beregnPeriodeMaksDato, relativeMockISODate, relativeMockTimestamp } from '../mockDateUtils';
import { MockScenario } from './types';

/**
 * Scenario: Registrert deltaker med historikk. Periode utløpt og utenfor 6-ukersvinduet.
 * Forventede handlinger: alle false.
 */

const DELTAKER_ID = '699b9f97-b0d7-4b78-9b8e-8758feb9e0fd';
const DELTAKELSE_ID = '5e8d1e4c-801c-4d13-8987-abfae3eaaa00';
const FRA_OG_MED = '2025-03-10';

// Utløpt og mer enn 6 uker siden — periodeKanForlenges = false
const PERIODE_MAKS_DATO = relativeMockISODate(-8, 'weeks');

const deltakerPersonalia: DeltakerPersonalia = {
    id: DELTAKER_ID,
    deltakerIdent: '03867198392',
    navn: {
        fornavn: 'PRESENTABEL',
        etternavn: 'HOFTE',
    },
    fødselsdato: '1998-12-31',
    førsteMuligeInnmeldingsdato: '2013-05-10',
    sisteMuligeInnmeldingsdato: '2029-04-10',
    diskresjonskoder: [],
};

const deltakelse: DeltakelseDto = {
    id: DELTAKELSE_ID,
    deltaker: { id: DELTAKER_ID, deltakerIdent: '03867198392' },
    fraOgMed: FRA_OG_MED,
    tilOgMed: undefined,
    erSlettet: false,
    harOpphørsvedtak: false,
    søktTidspunkt: relativeMockTimestamp(-9, 'months'),
    harForlengetPeriode: false,
    forlengetPeriodeMaksDato: beregnPeriodeMaksDato(FRA_OG_MED),
    periodeMaksDato: PERIODE_MAKS_DATO,
    harUtvidetKvote: false,
    kvoteMaksDato: PERIODE_MAKS_DATO,
};

const historikk: DeltakelseHistorikkDto[] = [
    {
        tidspunkt: relativeMockTimestamp(-9, 'months'),
        endringstype: Endringstype.DELTAKER_MELDT_INN,
        revisjonstype: Revisjonstype.OPPRETTET,
        endring: 'Deltaker er meldt inn i programmet.',
        aktør: 'Z990501 (veileder)',
    },
    {
        tidspunkt: relativeMockTimestamp(-9, 'months'),
        endringstype: Endringstype.DELTAKER_HAR_SØKT_YTELSE,
        revisjonstype: Revisjonstype.ENDRET,
        endring: 'Deltaker har søkt om ytelse.',
        aktør: '03867198392 (deltaker)',
    },
    {
        tidspunkt: relativeMockTimestamp(-8, 'months'),
        endringstype: Endringstype.ENDRET_STARTDATO,
        revisjonstype: Revisjonstype.ENDRET,
        endring: 'Startdato for deltakelse er endret.',
        aktør: 'Z990501 (veileder)',
    },
    {
        tidspunkt: relativeMockTimestamp(-7, 'months'),
        endringstype: Endringstype.DELTAKER_MELDT_UT,
        revisjonstype: Revisjonstype.ENDRET,
        endring: 'Deltaker meldt ut.',
        aktør: 'Z990501 (veileder)',
    },
    {
        tidspunkt: relativeMockTimestamp(-6, 'months'),
        endringstype: Endringstype.ENDRET_SLUTTDATO,
        revisjonstype: Revisjonstype.ENDRET,
        endring: 'Sluttdato for deltakelse er endret.',
        aktør: 'Z990501 (veileder)',
    },
    {
        tidspunkt: relativeMockTimestamp(-10, 'weeks'),
        endringstype: Endringstype.FORLENGET_PERIODE,
        revisjonstype: Revisjonstype.ENDRET,
        endring: 'Perioden er forlenget.',
        aktør: 'Z990501 (veileder)',
    },
];

export const registrertDeltakerScenario: MockScenario = {
    fnr: '03867198392',
    beskrivelse: 'Registrert deltaker (utløpt periode, ingen handlinger)',
    gruppe: 'grunnscenarioer',
    forventedeHandlinger: {
        kanEndreStartdato: false,
        kanMeldesUt: false,
        kanEndreSluttdato: false,
        kanForlengePeriode: false,
        kanSlettes: false,
    },
    deltakerPersonalia,
    deltakelse,
    historikk,
};
