import { DeltakelsePeriodInfo, OppgaveStatus, Oppgavetype } from '@navikt/ung-deltakelse-opplyser-api';

// 8c21972b-f23d-4193-8851-b2fa6c6b2f63,
// 74085d1a-cdfb-4a9e-9565-037171510473,
// 0dc07e3f-13dc-4a75-9315-bf155e924cbc,
// 0dcfa426-487f-497f-9cbb-c17060ab5cd5,
// 98234fef-cda7-4a3d-926a-b2c428317d7d,
// 6aa3dd1b-88fa-44b7-81b3-0645f1ec159e,
// d594fcb9-16df-4a64-8185-911ff5fbe376,
// 47f2933b-382f-4cf3-92e4-d3982f3e6cf3,
// 90f2e4c4-bf88-4e49-b648-1040f4a80a23,
// 7eac52cf-2d71-44eb-882f-bd2992b1c49a,
// eab293c7-0cc3-4f09-8912-97b49efbddf3,
// 38c1e8c7-8850-4641-9993-0ab93d6c0030,
// f7fda3a9-46da-4e2e-a4d6-7be30a57087b,
// 6601e5d8-b6a3-445e-8a6d-b5c49e6faea2,
// 42c4e4e3-03f2-4b89-91e2-0f1507f8f98c,
// 3c2e4ae4-48b6-4525-8994-007c2e26535b,
// 9a0ecde4-c0c3-4d80-a1d3-2fd9bba03d7d,
// 92e204f6-0634-4e7d-92e0-cad1f9d649c7,
// 6c994abf-0c9b-4cb1-b003-849f7265cd6b,
// 37f13a40-14cb-4c6d-b0f3-dceebaa09cf7,

const deltakelser: DeltakelsePeriodInfo[] = [
    {
        id: '8c21972b-f23d-4193-8851-b2fa6c6b2f63',
        fraOgMed: '2024-12-02',
        tilOgMed: undefined,
        harSøkt: true,
        oppgaver: [
            {
                oppgaveReferanse: '4659accd-ccde-4196-a326-1ed3fd3ac400',
                oppgavetype: Oppgavetype.BEKREFT_ENDRET_PROGRAMPERIODE,
                oppgavetypeData: {
                    type: 'BEKREFT_ENDRET_PROGRAMPERIODE',
                    fraOgMed: '2025-02-01',
                    tilOgMed: '2025-03-31',
                },
                status: OppgaveStatus.ULØST,
                opprettetDato: '2025-04-14T08:08:15.984057Z',
                løstDato: undefined,
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

export default deltakelser;
