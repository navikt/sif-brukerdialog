import { DeltakelsePeriodInfo, OppgaveStatus, Oppgavetype } from '@navikt/ung-deltakelse-opplyser-api';

const deltakelser: DeltakelsePeriodInfo[] = [
    {
        id: '8c21972b-f23d-4193-8851-b2fa6c6b2f63',
        fraOgMed: '2025-07-02',
        tilOgMed: undefined,
        søktTidspunkt: '2025-04-17T05:05:01.714798Z',
        oppgaver: [
            {
                oppgaveReferanse: '3d3e98b5-48e7-42c6-9fc1-e0f78022307f',
                oppgavetype: Oppgavetype.BEKREFT_ENDRET_STARTDATO,
                oppgavetypeData: {
                    nyStartdato: '2025-05-01',
                    forrigeStartdato: '2025-05-02',
                },
                bekreftelse: {
                    harGodtattEndringen: true,
                },
                status: OppgaveStatus.ULØST,
                opprettetDato: '2025-06-04T10:32:47.664066Z',
                frist: '2025-06-04T12:47:47.492347Z',
            },
            {
                oppgaveReferanse: 'e632b20a-b0c9-4953-97ec-851ebd1a0e91',
                oppgavetype: Oppgavetype.SØK_YTELSE,
                oppgavetypeData: {
                    fomDato: '2025-05-01',
                },
                status: OppgaveStatus.LØST,
                opprettetDato: '2025-05-31T03:58:01.779214Z',
                løstDato: '2025-05-31T03:58:42.211729Z',
            },
        ],
    },
];

export default deltakelser;
