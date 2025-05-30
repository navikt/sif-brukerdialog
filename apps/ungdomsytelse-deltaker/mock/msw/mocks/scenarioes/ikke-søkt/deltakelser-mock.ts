import { OppgaveStatus, Oppgavetype } from '@navikt/ung-common';

export default [
    {
        id: '3b2d6764-1ea1-4b5d-9a07-d4d5e254b595',
        fraOgMed: '2024-07-01',
        tilOgMed: '2025-06-30',
        søktTidspunkt: undefined,
        oppgaver: [
            {
                oppgaveReferanse: 'e6eaf147-db0e-454c-9271-f15ffe550b10',
                oppgavetype: Oppgavetype.SEND_SØKNAD,
                oppgavetypeData: {
                    fomDato: '2025-08-01',
                },
                status: OppgaveStatus.LØST,
                opprettetDato: '2025-05-30T08:01:25.542771Z',
            },
        ],
    },
];
