import {
    DeltakelseHistorikkDto,
    DeltakelseOpplysningDto,
    DeltakerPersonalia,
    OppgaveStatus,
    Oppgavetype,
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
    oppgaver: [
        {
            oppgaveReferanse: '9cd953f6-6445-4784-84bb-3bc288e5cc38',
            oppgavetype: Oppgavetype.BEKREFT_ENDRET_PROGRAMPERIODE,
            oppgavetypeData: {
                programperiode: {
                    fomDato: '2025-05-05',
                    tomDato: '9999-12-31',
                },
                forrigeProgramperiode: {
                    fomDato: '2025-05-02',
                    tomDato: '9999-12-31',
                },
            },
            bekreftelse: {
                harGodtattEndringen: true,
                uttalelseFraBruker: undefined,
            },
            status: OppgaveStatus.LØST,
            opprettetDato: '2025-05-28T05:22:07.103907Z',
            løstDato: '2025-05-28T05:25:44.595214Z',
            åpnetDato: undefined,
            lukketDato: undefined,
        },
        {
            oppgaveReferanse: '33a801d3-25ba-451f-a98b-a619f45aaeac',
            oppgavetype: Oppgavetype.BEKREFT_ENDRET_PROGRAMPERIODE,
            oppgavetypeData: {
                programperiode: {
                    fomDato: '2025-05-05',
                    tomDato: '2026-01-01',
                },
                forrigeProgramperiode: {
                    fomDato: '2025-05-05',
                    tomDato: '9999-12-31',
                },
            },
            bekreftelse: undefined,
            status: OppgaveStatus.ULØST,
            opprettetDato: '2025-05-28T05:26:29.802729Z',
            løstDato: undefined,
            åpnetDato: undefined,
            lukketDato: undefined,
        },
    ],
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
