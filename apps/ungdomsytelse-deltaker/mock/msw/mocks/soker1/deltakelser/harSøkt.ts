import { DeltakelsePeriodInfo, OppgaveStatus, Oppgavetype } from '@navikt/ung-deltakelse-opplyser-api';

export const deltakelserHarSøkt: DeltakelsePeriodInfo[] = [
    {
        id: '3b2d6764-1ea1-4b5d-9a07-d4d5e254b595',
        fraOgMed: '2024-12-02',
        tilOgMed: undefined,
        harSøkt: true,
        oppgaver: [
            // {
            //     id: 'fc2c6f01-8746-4ca0-b77a-40cc48bba216',
            //     oppgavetype: Oppgavetype.BEKREFT_ENDRET_SLUTTDATO,
            //     eksternReferanse: '3b2d6764-1ea1-4b5d-9a07-d4d5e254b595',
            //     oppgavetypeData: {
            //         type: 'BEKREFT_ENDRET_STARTDATO',
            //         nySluttdato: '2026-01-01',
            //         veilederRef: 'Pål Hønesen, Andeby',
            //         meldingFraVeileder: 'Jeg endrer sluttdatoen som vi avtalte på møtet forrige uke.',
            //     },
            //     status: OppgaveStatus.ULØST,
            //     opprettetDato: '2025-02-22T11:43:29.048157Z',
            //     løstDato: '2025-02-23T05:00:12.048157Z',
            // },
            // {
            //     id: 'fc2c6f01-8746-4ca0-b77a-40cc48bba216',
            //     eksternReferanse: '3b2d6764-1ea1-4b5d-9a07-d4d5e254b595',
            //     oppgavetype: Oppgavetype.BEKREFT_ENDRET_SLUTTDATO,
            //     oppgavetypeData: {
            //         type: 'BEKREFT_ENDRET_STARTDATO',
            //         nySluttdato: '2026-01-01',
            //         veilederRef: 'Pål Hønesen, Andeby',
            //         meldingFraVeileder: 'Jeg endrer sluttdatoen som vi avtalte på møtet forrige uke.',
            //     },
            //     status: OppgaveStatus.UTLØPT,
            //     opprettetDato: '2025-02-22T11:43:29.048157Z',
            //     løstDato: '2025-02-23T05:00:12.048157Z',
            // },
            {
                oppgaveReferanse: 'fc2c6f01-8746-4ca0-b77a-40cc48bba216',
                oppgavetype: Oppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT,
                oppgavetypeData: {
                    fraOgMed: '2026-01-01',
                    tilOgMed: '2026-01-31',
                    registerinntekt: {
                        arbeidOgFrilansInntekter: [
                            {
                                arbeidsgiver: 'Flåklypa barteservice',
                                inntekt: 1200,
                            },
                            {
                                arbeidsgiver: 'Hopen klyp og klem',
                                inntekt: 50,
                            },
                        ],
                        ytelseInntekter: [
                            {
                                ytelsetype: 'Sykepenger',
                                inntekt: 4000,
                            },
                        ],
                        totalInntektArbeidOgFrilans: 1250,
                        totalInntektYtelse: 5000,
                        totalInntekt: 5250,
                    },
                },
                status: OppgaveStatus.ULØST,
                opprettetDato: '2025-02-22T11:43:29.048157Z',
                løstDato: '2025-02-23T05:00:12.048157Z',
            },
        ],
        rapporteringsPerioder: [
            {
                fraOgMed: '2024-12-02',
                tilOgMed: '2024-12-31',
                harRapportert: true,
                arbeidstakerOgFrilansInntekt: 200,
                inntektFraYtelse: 0,
                summertInntekt: 200,
            },
            {
                fraOgMed: '2025-01-01',
                tilOgMed: '2025-01-31',
                harRapportert: false,
                arbeidstakerOgFrilansInntekt: undefined,
                inntektFraYtelse: undefined,
                summertInntekt: 0,
            },
            {
                fraOgMed: '2025-02-01',
                tilOgMed: '2025-02-26',
                harRapportert: false,
                arbeidstakerOgFrilansInntekt: undefined,
                inntektFraYtelse: undefined,
                summertInntekt: 0,
            },
            {
                fraOgMed: '2025-03-01',
                tilOgMed: '2025-03-31',
                harRapportert: false,
                arbeidstakerOgFrilansInntekt: undefined,
                inntektFraYtelse: undefined,
                summertInntekt: 0,
            },
            {
                fraOgMed: '2025-04-01',
                tilOgMed: '2025-04-30',
                harRapportert: false,
                arbeidstakerOgFrilansInntekt: undefined,
                inntektFraYtelse: undefined,
                summertInntekt: 0,
            },
        ],
    },
];
