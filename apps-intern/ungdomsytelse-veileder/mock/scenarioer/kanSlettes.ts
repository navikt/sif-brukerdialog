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
 * Scenario: Deltaker registrert men ikke søkt ennå (søktTidspunkt=undefined).
 * Forventede handlinger: kanSlettes=true, kanEndreStartdato=true.
 */

const DELTAKER_ID = 'a9d51b57-ccae-4e42-90ce-a22f8a745050';
const DELTAKELSE_ID = 'e2d977b6-1d67-4afe-884c-b89a5324399b';
const FRA_OG_MED = relativeMockISODate(-1, 'month');

const deltakerPersonalia: DeltakerPersonalia = {
    id: DELTAKER_ID,
    deltakerIdent: '04449925276',
    navn: {
        fornavn: 'NYOPPRETTET',
        etternavn: 'INNMELDING',
    },
    fødselsdato: '1999-04-04',
    førsteMuligeInnmeldingsdato: '2025-01-01',
    sisteMuligeInnmeldingsdato: '2029-04-04',
    diskresjonskoder: [],
};

const deltakelse: DeltakelseDto = {
    id: DELTAKELSE_ID,
    deltaker: { id: DELTAKER_ID, deltakerIdent: '04449925276' },
    fraOgMed: FRA_OG_MED,
    tilOgMed: undefined,
    erSlettet: false,
    harOpphørsvedtak: false,
    søktTidspunkt: undefined,
    harForlengetPeriode: false,
    forlengetPeriodeMaksDato: beregnPeriodeMaksDato(FRA_OG_MED),
    periodeMaksDato: beregnPeriodeMaksDato(FRA_OG_MED),
    harUtvidetKvote: false,
    kvoteMaksDato: beregnPeriodeMaksDato(FRA_OG_MED),
};

const historikk: DeltakelseHistorikkDto[] = [
    {
        tidspunkt: relativeMockTimestamp(-1, 'month'),
        endringstype: Endringstype.DELTAKER_MELDT_INN,
        revisjonstype: Revisjonstype.OPPRETTET,
        endring: 'Deltaker er meldt inn i programmet.',
        aktør: 'Z990501 (veileder)',
    },
];

export const kanSlettesScenario: MockScenario = {
    fnr: '04449925276',
    beskrivelse: 'Kan slettes (registrert, ikke søkt)',
    gruppe: 'handlinger',
    forventedeHandlinger: {
        kanSlettes: true,
        kanEndreStartdato: true,
        kanMeldesUt: false,
        kanEndreSluttdato: false,
        kanForlengePeriode: false,
    },
    deltakerPersonalia,
    deltakelse,
    historikk,
};
