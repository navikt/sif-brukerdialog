import {
    DeltakelseDto,
    DeltakelseHistorikkDto,
    DeltakerPersonalia,
    Diskresjonskode,
    Endringstype,
    Revisjonstype,
} from '@navikt/ung-deltakelse-opplyser-api-veileder';
import { beregnPeriodeMaksDato, relativeMockISODate, relativeMockTimestamp } from '../mockDateUtils';
import { MockScenario } from './types';

/**
 * Scenario: Skjermet deltaker med diskresjonskoder.
 * Primært for å teste visning av skjermet/kode6-merking.
 */

const DELTAKER_ID = '6369f9a3-5a38-4b90-b93a-695fabe8c6f9';
const DELTAKELSE_ID = '2a270c69-9a5b-4a94-b27e-53f6e70bc35f';
const FRA_OG_MED = relativeMockISODate(-7, 'months');
const TIL_OG_MED = relativeMockISODate(2, 'months');

const deltakerPersonalia: DeltakerPersonalia = {
    id: DELTAKER_ID,
    deltakerIdent: '26430569928',
    navn: {
        fornavn: 'KONSEKVENT',
        mellomnavn: undefined,
        etternavn: 'FROKOSTBLANDING',
    },
    fødselsdato: '2005-03-26',
    førsteMuligeInnmeldingsdato: '2025-01-01',
    sisteMuligeInnmeldingsdato: '2034-03-26',
    diskresjonskoder: [Diskresjonskode.SKJERMET, Diskresjonskode.KODE6],
};

const deltakelse: DeltakelseDto = {
    id: DELTAKELSE_ID,
    deltaker: { id: DELTAKER_ID, deltakerIdent: '26430569928' },
    fraOgMed: FRA_OG_MED,
    tilOgMed: TIL_OG_MED,
    erSlettet: false,
    harOpphørsvedtak: false,
    harForlengetPeriode: false,
    forlengetPeriodeMaksDato: beregnPeriodeMaksDato(FRA_OG_MED),
    periodeMaksDato: beregnPeriodeMaksDato(FRA_OG_MED),
    harUtvidetKvote: false,
    kvoteMaksDato: beregnPeriodeMaksDato(FRA_OG_MED),
    søktTidspunkt: relativeMockTimestamp(-7, 'months'),
};

const historikk: DeltakelseHistorikkDto[] = [
    {
        tidspunkt: relativeMockTimestamp(-7, 'months'),
        endringstype: Endringstype.DELTAKER_MELDT_INN,
        revisjonstype: Revisjonstype.OPPRETTET,
        endring: 'Deltaker er meldt inn i programmet.',
        aktør: 'Z990501 (veileder)',
    },
    {
        tidspunkt: relativeMockTimestamp(-7, 'months'),
        endringstype: Endringstype.DELTAKER_HAR_SØKT_YTELSE,
        revisjonstype: Revisjonstype.ENDRET,
        endring: 'Deltaker har søkt om ytelse.',
        aktør: 'system',
    },
    {
        tidspunkt: relativeMockTimestamp(-6, 'months'),
        endringstype: Endringstype.ENDRET_STARTDATO,
        revisjonstype: Revisjonstype.ENDRET,
        endring: 'Startdato for deltakelse er endret.',
        aktør: 'Z990501 (veileder)',
    },
];

export const skjermetDeltakerScenario: MockScenario = {
    fnr: '26430569928',
    beskrivelse: 'Skjermet registrert deltaker',
    gruppe: 'tilgangsbegrensning',
    skjultPåGithubPages: true,
    deltakerPersonalia,
    deltakelse,
    historikk,
};
