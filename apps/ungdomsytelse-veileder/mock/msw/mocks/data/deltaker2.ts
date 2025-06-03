import {
    DeltakelseHistorikkDto,
    DeltakelseOpplysningDto,
    DeltakerPersonalia,
    Revisjonstype,
} from '@navikt/ung-deltakelse-opplyser-api';

const deltakerPersonalia: DeltakerPersonalia = {
    id: '6369f9a3-5a38-4b90-b93a-695fabe8c6f9',
    deltakerIdent: '26430569928',
    navn: {
        fornavn: 'KONSEKVENT',
        mellomnavn: undefined,
        etternavn: 'FROKOSTBLANDING',
    },
    fødselsdato: '2005-03-26',
    førsteMuligeInnmeldingsdato: '2025-01-01',
    sisteMuligeInnmeldingsdato: '2034-03-26',
};

const deltakelse: DeltakelseOpplysningDto = {
    id: '2a270c69-9a5b-4a94-b27e-53f6e70bc35f',
    deltaker: {
        id: '6369f9a3-5a38-4b90-b93a-695fabe8c6f9',
        deltakerIdent: '26430569928',
    },
    fraOgMed: '2025-05-05',
    tilOgMed: '2026-01-01',
    søktTidspunkt: '2025-05-28T05:21:41.000340Z',
    oppgaver: [],
};

const historikk: DeltakelseHistorikkDto[] = [
    {
        revisjonstype: Revisjonstype.OPPRETTET,
        revisjonsnummer: 255,
        id: '2a270c69-9a5b-4a94-b27e-53f6e70bc35f',
        fom: '2025-05-01',
        tom: undefined,
        opprettetAv: 'Z990501 (veileder)',
        opprettetTidspunkt: '2025-05-27T10:35:50.847049Z',
        endretAv: 'Z990501 (veileder)',
        endretTidspunkt: '2025-05-27T10:35:50.847049Z',
        søktTidspunkt: undefined,
    },
    {
        revisjonstype: Revisjonstype.ENDRET,
        revisjonsnummer: 805,
        id: '2a270c69-9a5b-4a94-b27e-53f6e70bc35f',
        fom: '2025-05-02',
        tom: undefined,
        opprettetAv: 'Z990501 (veileder)',
        opprettetTidspunkt: '2025-05-27T10:35:50.847049Z',
        endretAv: 'Z990501 (veileder)',
        endretTidspunkt: '2025-05-28T05:21:12.136059Z',
        søktTidspunkt: undefined,
    },
    {
        revisjonstype: Revisjonstype.ENDRET,
        revisjonsnummer: 806,
        id: '2a270c69-9a5b-4a94-b27e-53f6e70bc35f',
        fom: '2025-05-02',
        tom: undefined,
        opprettetAv: 'Z990501 (veileder)',
        opprettetTidspunkt: '2025-05-27T10:35:50.847049Z',
        endretAv: 'system',
        endretTidspunkt: '2025-05-28T05:21:41.071946Z',
        søktTidspunkt: '2025-05-28T05:21:41.000340Z',
    },
    {
        revisjonstype: Revisjonstype.ENDRET,
        revisjonsnummer: 807,
        id: '2a270c69-9a5b-4a94-b27e-53f6e70bc35f',
        fom: '2025-05-05',
        tom: undefined,
        opprettetAv: 'Z990501 (veileder)',
        opprettetTidspunkt: '2025-05-27T10:35:50.847049Z',
        endretAv: 'Z990501 (veileder)',
        endretTidspunkt: '2025-05-28T05:22:04.778495Z',
        søktTidspunkt: '2025-05-28T05:21:41.000340Z',
    },
    {
        revisjonstype: Revisjonstype.ENDRET,
        revisjonsnummer: 808,
        id: '2a270c69-9a5b-4a94-b27e-53f6e70bc35f',
        fom: '2025-05-05',
        tom: '2026-01-01',
        opprettetAv: 'Z990501 (veileder)',
        opprettetTidspunkt: '2025-05-27T10:35:50.847049Z',
        endretAv: 'Z990501 (veileder)',
        endretTidspunkt: '2025-05-28T05:26:27.508492Z',
        søktTidspunkt: '2025-05-28T05:21:41.000340Z',
    },
];

export const deltaker2Mock = {
    deltakerPersonalia,
    deltakelse,
    historikk,
};
