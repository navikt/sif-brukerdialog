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
                oppgavetype: Oppgavetype.BEKREFT_ENDRET_STARTDATO,
                oppgavetypeData: {
                    type: 'BEKREFT_ENDRET_STARTDATO',
                    nyStartdato: '2025-01-01',
                    veilederRef: 'Pål Hønesen, Andeby',
                    meldingFraVeileder: 'Jeg endrer startdatoen som vi avtalte på møtet forrige uke.',
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
