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

import { DeltakelsePeriodInfo, OppgaveStatus, Oppgavetype } from '@navikt/ung-deltakelse-opplyser-api';

// const kontrollerRegisterInntektOppgaveDto: KontrollerRegisterinntektOppgavetypeDataDto = {
//     fraOgMed: '2025-01-01',
//     tilOgMed: '2025-01-31',
//     registerinntekt: {
//         arbeidOgFrilansInntekter: [
//             {
//                 arbeidsgiver: 'ABC',
//                 inntekt: 200,
//             },
//         ],
//         ytelseInntekter: [
//             {
//                 inntekt: 200,
//                 ytelsetype: YtelseType.OMSORGSPENGER,
//             },
//             {
//                 inntekt: 100,
//                 ytelsetype: YtelseType.OPPLAERINGSPENGER,
//             },
//         ],
//         totalInntekt: 500,
//         totalInntektArbeidOgFrilans: 200,
//         totalInntektYtelse: 300,
//     },
// };

// const kontrollerRegisterInntektOppgave: OppgaveDto = {
//     oppgaveReferanse: '37f13a40-14cb-4c6d-b0f3-dceebaa09cf7',
//     oppgavetype: Oppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT,
//     oppgavetypeData: kontrollerRegisterInntektOppgaveDto,
//     status:OppgaveStatus.OppgaveStatusULØST,
//     opprettetDato: '2025-04-14T08:08:15.984057Z',
//     løstDato: undefined,
// };

const deltakelser: DeltakelsePeriodInfo[] = [
    {
        id: '8c21972b-f23d-4193-8851-b2fa6c6b2f63',
        fraOgMed: '2025-07-02',
        tilOgMed: undefined,
        søktTidspunkt: '2025-04-17T05:05:01.714798Z',
        oppgaver: [
            {
                oppgaveReferanse: '247f3e28-0366-46eb-89be-e205e7efd7c2',
                oppgavetype: Oppgavetype.BEKREFT_ENDRET_PROGRAMPERIODE,
                oppgavetypeData: {
                    programperiode: {
                        fomDato: '2025-05-02',
                        tomDato: '9999-12-31',
                    },
                    forrigeProgramperiode: {
                        fomDato: '2025-05-01',
                        tomDato: '9999-12-31',
                    },
                },

                status: OppgaveStatus.ULØST,
                opprettetDato: '2025-05-31T03:59:03.540410Z',
            },
            {
                oppgaveReferanse: '247f3e28-0366-46eb-89be-e205e7efd7c4',
                oppgavetype: Oppgavetype.BEKREFT_ENDRET_PROGRAMPERIODE,
                oppgavetypeData: {
                    programperiode: {
                        fomDato: '2025-05-02',
                        tomDato: '9999-12-31',
                    },
                    forrigeProgramperiode: {
                        fomDato: '2025-05-01',
                        tomDato: '9999-12-31',
                    },
                },

                status: OppgaveStatus.AVBRUTT,
                opprettetDato: '2025-05-31T03:59:03.540410Z',
                løstDato: '2025-05-31T04:00:47.367209Z',
            },
            {
                oppgaveReferanse: '8a8b9fc4-4665-4256-b495-50042437d90c',
                oppgavetype: Oppgavetype.BEKREFT_ENDRET_PROGRAMPERIODE,
                oppgavetypeData: {
                    programperiode: {
                        fomDato: '2025-05-02',
                        tomDato: '2025-12-31',
                    },
                    forrigeProgramperiode: {
                        fomDato: '2025-05-01',
                        tomDato: '9999-12-31',
                    },
                },

                status: OppgaveStatus.ULØST,
                opprettetDato: '2025-05-31T04:00:47.504201Z',
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
