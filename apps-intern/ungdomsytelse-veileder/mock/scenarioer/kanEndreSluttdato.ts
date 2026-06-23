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
 * Scenario: Aktiv deltaker med sluttdato satt og periode ikke utløpt.
 * Forventede handlinger: kanEndreSluttdato=true, kanEndreStartdato=true.
 */

const DELTAKER_ID = 'f9cdfa5f-f255-4b7a-9a96-4077be9aa8dd';
const DELTAKELSE_ID = '78dc26e0-ff67-4b63-b93c-5f46a030ab1e';
const FRA_OG_MED = relativeMockISODate(-8, 'months');

const deltakerPersonalia: DeltakerPersonalia = {
    id: DELTAKER_ID,
    deltakerIdent: '24529831982',
    navn: {
        fornavn: 'UTMELDT',
        etternavn: 'AKTIV',
    },
    fødselsdato: '1998-02-24',
    førsteMuligeInnmeldingsdato: '2025-01-01',
    sisteMuligeInnmeldingsdato: '2030-02-24',
    diskresjonskoder: [],
};

const deltakelse: DeltakelseDto = {
    id: DELTAKELSE_ID,
    deltaker: { id: DELTAKER_ID, deltakerIdent: '24529831982' },
    fraOgMed: FRA_OG_MED,
    tilOgMed: relativeMockISODate(6, 'months'),
    erSlettet: false,
    harOpphørsvedtak: false,
    søktTidspunkt: relativeMockTimestamp(-8, 'months'),
    harForlengetPeriode: false,
    forlengetPeriodeMaksDato: beregnPeriodeMaksDato(FRA_OG_MED),
    periodeMaksDato: beregnPeriodeMaksDato(FRA_OG_MED),
    harUtvidetKvote: false,
    kvoteMaksDato: beregnPeriodeMaksDato(FRA_OG_MED),
};

const historikk: DeltakelseHistorikkDto[] = [
    {
        tidspunkt: relativeMockTimestamp(-8, 'months'),
        endringstype: Endringstype.DELTAKER_MELDT_INN,
        revisjonstype: Revisjonstype.OPPRETTET,
        endring: 'Deltaker er meldt inn i programmet.',
        aktør: 'Z990501 (veileder)',
    },
    {
        tidspunkt: relativeMockTimestamp(-8, 'months'),
        endringstype: Endringstype.DELTAKER_HAR_SØKT_YTELSE,
        revisjonstype: Revisjonstype.ENDRET,
        endring: 'Deltaker har søkt om ytelse.',
        aktør: '24529831982 (deltaker)',
    },
    {
        tidspunkt: relativeMockTimestamp(-4, 'months'),
        endringstype: Endringstype.DELTAKER_MELDT_UT,
        revisjonstype: Revisjonstype.ENDRET,
        endring: `Deltaker meldt ut med sluttdato ${relativeMockISODate(6, 'months')}.`,
        aktør: 'Z990501 (veileder)',
    },
];

export const kanEndreSluttdatoScenario: MockScenario = {
    fnr: '24529831982',
    beskrivelse: 'Kan endre sluttdato (utmeldt, aktiv periode)',
    gruppe: 'handlinger',
    forventedeHandlinger: {
        kanSlettes: false,
        kanEndreStartdato: true,
        kanMeldesUt: false,
        kanEndreSluttdato: true,
        kanForlengePeriode: false,
    },
    deltakerPersonalia,
    skjultPåGithubPages: true,
    deltakelse,
    historikk,
};
