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
 * Scenario: Deltaker nær periodeSlutt (innenfor 2 måneder), ikke utløpt.
 * Forventede handlinger: kanForlengePeriode=true, kanMeldesUt=true.
 *
 * fraOgMed er 11 måneder tilbake → periodeMaksDato ≈ 1 måned frem → innenfor 2-månedersvinduet.
 */

const DELTAKER_ID = 'c48cb25e-504d-49b8-8d9d-66a99697ffc6';
const DELTAKELSE_ID = 'c36d1594-41c5-447b-a25d-b48ce1dbd8c0';
const FRA_OG_MED = relativeMockISODate(-11, 'months');

const deltakerPersonalia: DeltakerPersonalia = {
    id: DELTAKER_ID,
    deltakerIdent: '29519845014',
    navn: {
        fornavn: 'NÆRMER',
        etternavn: 'PERIODESLUTT',
    },
    fødselsdato: '1998-11-29',
    førsteMuligeInnmeldingsdato: '2025-01-01',
    sisteMuligeInnmeldingsdato: '2030-11-29',
    diskresjonskoder: [],
};

const deltakelse: DeltakelseDto = {
    id: DELTAKELSE_ID,
    deltaker: { id: DELTAKER_ID, deltakerIdent: '29519845014' },
    fraOgMed: FRA_OG_MED,
    tilOgMed: undefined,
    erSlettet: false,
    harOpphørsvedtak: false,
    søktTidspunkt: relativeMockTimestamp(-11, 'months'),
    harForlengetPeriode: false,
    forlengetPeriodeMaksDato: beregnPeriodeMaksDato(FRA_OG_MED),
    periodeMaksDato: beregnPeriodeMaksDato(FRA_OG_MED),
    harUtvidetKvote: false,
    kvoteMaksDato: beregnPeriodeMaksDato(FRA_OG_MED),
};

const historikk: DeltakelseHistorikkDto[] = [
    {
        tidspunkt: relativeMockTimestamp(-11, 'months'),
        endringstype: Endringstype.DELTAKER_MELDT_INN,
        revisjonstype: Revisjonstype.OPPRETTET,
        endring: 'Deltaker er meldt inn i programmet.',
        aktør: 'Z990501 (veileder)',
    },
    {
        tidspunkt: relativeMockTimestamp(-11, 'months'),
        endringstype: Endringstype.DELTAKER_HAR_SØKT_YTELSE,
        revisjonstype: Revisjonstype.ENDRET,
        endring: 'Deltaker har søkt om ytelse.',
        aktør: '29519845014 (deltaker)',
    },
];

export const kanForlengePeriodeScenario: MockScenario = {
    fnr: '29519845014',
    beskrivelse: 'Kan forlenge periode (nær periodeSlutt)',
    gruppe: 'handlinger',
    forventedeHandlinger: {
        kanSlettes: false,
        kanEndreStartdato: false,
        kanMeldesUt: true,
        kanEndreSluttdato: false,
        kanForlengePeriode: true,
    },
    deltakerPersonalia,
    skjultPåGithubPages: true,
    deltakelse,
    historikk,
};
