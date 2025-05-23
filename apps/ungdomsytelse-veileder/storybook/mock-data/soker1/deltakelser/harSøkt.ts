import { DeltakelsePeriodInfo, OppgaveStatus, Oppgavetype, YtelseType } from '@navikt/ung-deltakelse-opplyser-api';

export const deltakelserHarSøkt: DeltakelsePeriodInfo[] = [
    {
        id: '3b2d6764-1ea1-4b5d-9a07-d4d5e254b595',
        fraOgMed: '2024-12-02',
        tilOgMed: undefined,
        søktTidspunkt: '2024-12-01T11:43:29.048157Z',
        oppgaver: [
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
                                ytelsetype: YtelseType.OMSORGSPENGER,
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
    },
];
