import {
    DeltakelseHistorikkDto,
    DeltakelseOpplysningDto,
    DeltakerPersonalia,
    OppgaveStatus,
    Oppgavetype,
    Revisjonstype,
} from '@navikt/ung-deltakelse-opplyser-api';

const deltakerPersonalia: DeltakerPersonalia = {
    id: '699b9f97-b0d7-4b78-9b8e-8758feb9e0fd',
    deltakerIdent: '03867198392',
    navn: {
        fornavn: 'PRESENTABEL',
        etternavn: 'HOFTE',
    },
    fødselsdato: '1998-12-31',
    førsteMuligeInnmeldingsdato: '2013-05-10',
    sisteMuligeInnmeldingsdato: '2025-04-10',
};

const deltakelse: DeltakelseOpplysningDto = {
    id: '5e8d1e4c-801c-4d13-8987-abfae3eaaa00',
    deltaker: {
        id: '699b9f97-b0d7-4b78-9b8e-8758feb9e0fd',
        deltakerIdent: '03867198392',
    },
    fraOgMed: '2025-03-10',
    tilOgMed: undefined,
    søktTidspunkt: '2025-05-21T12:00:20.859873Z',
    oppgaver: [
        {
            oppgaveReferanse: 'd59e08d7-bb0d-4e86-aee4-5b89e4e53228',
            oppgavetype: Oppgavetype.BEKREFT_ENDRET_PROGRAMPERIODE,
            oppgavetypeData: {
                // type: Oppgavetype.BEKREFT_ENDRET_PROGRAMPERIODE,
                programperiode: {
                    fomDato: '2025-03-10',
                    tomDato: '2025-08-01',
                },
                forrigeProgramperiode: {
                    fomDato: '2024-12-02',
                    tomDato: '9999-12-31',
                },
            },
            bekreftelse: undefined,
            status: OppgaveStatus.ULØST,
            opprettetDato: '2025-05-20T14:38:41.859873Z',
            løstDato: undefined,
            åpnetDato: undefined,
            lukketDato: undefined,
        },
    ],
};

const deltakelseHistorikk: DeltakelseHistorikkDto[] = [
    {
        revisjonstype: Revisjonstype.OPPRETTET,
        revisjonsnummer: 5,
        id: '82303e99-4625-450f-91bb-05a0e8f00ee5',
        fom: '2025-05-23',
        tom: undefined,
        opprettetAv: 'Z994376 (veileder)',
        opprettetTidspunkt: '2025-05-23T10:39:57.587840Z',
        endretAv: 'Z994376 (veileder)',
        endretTidspunkt: '2025-05-23T10:39:57.587840Z',
        søktTidspunkt: undefined,
    },
    {
        revisjonstype: Revisjonstype.ENDRET,
        revisjonsnummer: 52,
        id: '82303e99-4625-450f-91bb-05a0e8f00ee5',
        fom: '2025-05-26',
        tom: undefined,
        opprettetAv: 'Z994376 (veileder)',
        opprettetTidspunkt: '2025-05-23T10:39:57.587840Z',
        endretAv: 'Z994376 (veileder)',
        endretTidspunkt: '2025-05-23T10:54:54.114674Z',
        søktTidspunkt: undefined,
    },
    {
        revisjonstype: Revisjonstype.ENDRET,
        revisjonsnummer: 102,
        id: '82303e99-4625-450f-91bb-05a0e8f00ee5',
        fom: '2025-05-26',
        tom: '2025-06-23',
        opprettetAv: 'Z994376 (veileder)',
        opprettetTidspunkt: '2025-05-23T10:39:57.587840Z',
        endretAv: 'Z994376 (veileder)',
        endretTidspunkt: '2025-05-23T10:55:26.677635Z',
        søktTidspunkt: undefined,
    },
];

export const registrertDeltakerMock = {
    id: deltakerPersonalia.id!,
    deltakerPersonalia,
    deltakelse,
    deltakelseHistorikk,
};
