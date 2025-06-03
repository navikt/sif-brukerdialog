import { DeltakelsePeriodInfo, OppgaveStatus, Oppgavetype } from '@navikt/ung-deltakelse-opplyser-api';

const deltakelser: DeltakelsePeriodInfo[] = [
    {
        id: '8c21972b-f23d-4193-8851-b2fa6c6b2f63',
        fraOgMed: '2025-07-02',
        tilOgMed: undefined,
        søktTidspunkt: '2025-04-17T05:05:01.714798Z',
        oppgaver: [
            {
                oppgaveReferanse: '88486b78-dfa7-4b76-be6e-703603b6787e',
                oppgavetype: Oppgavetype.RAPPORTER_INNTEKT,
                oppgavetypeData: {
                    fraOgMed: '2025-05-01',
                    tilOgMed: '2025-05-31',
                },

                status: OppgaveStatus.ULØST,
                opprettetDato: '2025-06-01T18:58:02.849028Z',
            },
            {
                oppgaveReferanse: '99233834-0295-4190-8928-ddcdb2261997',
                oppgavetype: Oppgavetype.BEKREFT_ENDRET_PROGRAMPERIODE,
                oppgavetypeData: {
                    programperiode: {
                        fomDato: '2025-08-04',
                        tomDato: '9999-12-31',
                    },
                    forrigeProgramperiode: {
                        fomDato: '2025-08-01',
                        tomDato: '9999-12-31',
                    },
                },

                status: OppgaveStatus.AVBRUTT,
                opprettetDato: '2025-05-30T14:58:28.542968Z',
                løstDato: '2025-05-30T18:44:29.406401Z',
                åpnetDato: '2025-06-01T08:58:38.637271Z',
            },
            {
                oppgaveReferanse: 'a73a3f1e-f65a-4a3c-af0f-fa0aaff1047c',
                oppgavetype: Oppgavetype.BEKREFT_ENDRET_PROGRAMPERIODE,
                oppgavetypeData: {
                    programperiode: {
                        fomDato: '2025-08-01',
                        tomDato: '9999-12-31',
                    },
                    forrigeProgramperiode: {
                        fomDato: '2025-09-01',
                        tomDato: '9999-12-31',
                    },
                },
                bekreftelse: {
                    harGodtattEndringen: true,
                },
                status: OppgaveStatus.ULØST,
                opprettetDato: '2025-05-30T10:34:08.546495Z',
                løstDato: '2025-05-30T10:34:38.620735Z',
                åpnetDato: '2025-06-02T07:11:59.082092Z',
            },
            {
                oppgaveReferanse: '498bfb88-31af-4d7f-a1bf-033c546aa28f',
                oppgavetype: Oppgavetype.BEKREFT_ENDRET_PROGRAMPERIODE,
                oppgavetypeData: {
                    programperiode: {
                        fomDato: '2025-08-04',
                        tomDato: '2026-03-02',
                    },
                    forrigeProgramperiode: {
                        fomDato: '2025-08-04',
                        tomDato: '2026-03-09',
                    },
                },

                status: OppgaveStatus.AVBRUTT,
                opprettetDato: '2025-05-30T20:02:25.314154Z',
                løstDato: '2025-05-30T20:02:44.216108Z',
                åpnetDato: '2025-06-01T08:58:14.218070Z',
            },

            {
                oppgaveReferanse: '93134f5c-966d-4c37-bb69-bf0e6e4a6cfb',
                oppgavetype: Oppgavetype.BEKREFT_ENDRET_PROGRAMPERIODE,
                oppgavetypeData: {
                    programperiode: {
                        fomDato: '2025-08-11',
                        tomDato: '2026-03-09',
                    },
                    forrigeProgramperiode: {
                        fomDato: '2025-08-04',
                        tomDato: '2026-03-09',
                    },
                },

                status: OppgaveStatus.UTLØPT,
                opprettetDato: '2025-05-30T20:03:12.809304Z',
                løstDato: '2025-05-31T05:05:00.926731Z',
                åpnetDato: '2025-06-01T08:58:25.194820Z',
            },
            {
                oppgaveReferanse: '31ca6ab0-b20e-4cea-8081-0942918fcaf4',
                oppgavetype: Oppgavetype.SØK_YTELSE,
                oppgavetypeData: {
                    fomDato: '2025-09-01',
                },

                status: OppgaveStatus.LØST,
                opprettetDato: '2025-05-30T09:59:25.470851Z',
                løstDato: '2025-05-30T10:33:39.755068Z',
            },
        ],
    },
];

export default deltakelser;
