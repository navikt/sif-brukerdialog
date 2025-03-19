import { DeltakelsePeriodInfo, OppgaveStatus, Oppgavetype } from '@navikt/ung-deltakelse-opplyser-api';

export const deltakelserHarSøkt: DeltakelsePeriodInfo[] = [
    {
        id: '3b2d6764-1ea1-4b5d-9a07-d4d5e254b595',
        fraOgMed: '2024-12-02',
        tilOgMed: undefined,
        harSøkt: true,
        oppgaver: [
            {
                id: 'fc2c6f01-8746-4ca0-b77a-40cc48bba216',
                oppgavetype: Oppgavetype.BEKREFT_ENDRET_SLUTTDATO,
                oppgavetypeData: {
                    type: 'BEKREFT_ENDRET_STARTDATO',
                    nySluttdato: '2026-01-01',
                    veilederRef: 'Pål Hønesen, Andeby',
                    meldingFraVeileder: 'Jeg endrer sluttdatoen som vi avtalte på møtet forrige uke.',
                },
                status: OppgaveStatus.ULØST,
                opprettetDato: '2025-02-22T11:43:29.048157Z',
                løstDato: undefined,
            },
            {
                id: 'fc2c6f01-8746-4ca0-b77a-40cc48bba216',
                oppgavetype: Oppgavetype.BEKREFT_ENDRET_SLUTTDATO,
                oppgavetypeData: {
                    type: 'BEKREFT_ENDRET_STARTDATO',
                    nySluttdato: '2026-01-01',
                    veilederRef: 'Pål Hønesen, Andeby',
                    meldingFraVeileder: 'Jeg endrer sluttdatoen som vi avtalte på møtet forrige uke.',
                },
                status: OppgaveStatus.LØST,
                opprettetDato: '2025-02-22T11:43:29.048157Z',
                løstDato: '2025-02-23T05:00:12.048157Z',
            },
            {
                id: 'fc2c6f01-8746-4ca0-b77a-40cc48bba216',
                oppgavetype: Oppgavetype.BEKREFT_KORRIGERT_INNTEKT,
                oppgavetypeData: {
                    periodeForInntekt: {
                        fraOgMed: '2026-01-01',
                        tilOgMed: '2026-01-31',
                    },
                    inntektFraAinntekt: {
                        arbeidsgivere: [
                            {
                                navn: 'Flåklypa barteservice',
                                beløp: 1232,
                            },
                            {
                                navn: 'Hopen klyp og klem',
                                beløp: 50,
                            },
                        ],
                        ytelser: [
                            {
                                navn: 'Sykepenger',
                                beløp: 4200,
                            },
                        ],
                    },
                    inntektFraDeltaker: {
                        arbeidstakerOgFrilansInntekt: undefined,
                        inntektFraYtelse: undefined,
                    },
                },
                status: OppgaveStatus.ULØST,
                opprettetDato: '2025-02-22T11:43:29.048157Z',
                løstDato: undefined,
            },
        ],
        rapporteringsPerioder: [
            {
                fraOgMed: '2024-12-02',
                tilOgMed: '2024-12-31',
                harRapportert: false,
                inntekt: undefined,
            },
            {
                fraOgMed: '2025-01-01',
                tilOgMed: '2025-01-31',
                harRapportert: false,
                inntekt: undefined,
            },
            {
                fraOgMed: '2025-02-01',
                tilOgMed: '2025-02-26',
                harRapportert: false,
                inntekt: undefined,
            },
        ],
    },
];
