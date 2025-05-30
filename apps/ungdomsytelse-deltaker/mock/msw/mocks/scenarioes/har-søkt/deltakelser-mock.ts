import { DeltakelsePeriodInfo, OppgaveDto, OppgaveStatus, Oppgavetype } from '@navikt/ung-deltakelse-opplyser-api';

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

const endretProgramperiodeOppgave: OppgaveDto = {
    oppgaveReferanse: '4659accd-ccde-4196-a326-1ed3fd3ac400',
    oppgavetype: Oppgavetype.BEKREFT_ENDRET_PROGRAMPERIODE,
    oppgavetypeData: {
        programperiode: {
            fomDato: '2025-02-01',
            tomDato: '2025-03-31',
        },
    },
    status: OppgaveStatus.ULØST,
    opprettetDato: '2025-04-14T08:08:15.984057Z',
    // løstDato: '2025-04-14T08:08:15.984057Z',
};

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
//     status: OppgaveStatus.ULØST,
//     opprettetDato: '2025-04-14T08:08:15.984057Z',
//     løstDato: undefined,
// };

export const mockOppg: OppgaveDto = {
    oppgaveReferanse: 'd4983a23-53c5-4c71-b1c4-0d11c1431e12',
    oppgavetype: Oppgavetype.BEKREFT_ENDRET_PROGRAMPERIODE,
    oppgavetypeData: {
        programperiode: {
            fomDato: '2025-04-02',
            tomDato: '9999-12-31',
        },
        forrigeProgramperiode: undefined,
    },
    bekreftelse: undefined,
    status: OppgaveStatus.ULØST,
    opprettetDato: '2025-04-16T07:20:15.400697Z',
    løstDato: '2025-04-17T05:05:01.714798Z',
    åpnetDato: undefined,
    lukketDato: undefined,
};

const deltakelser: DeltakelsePeriodInfo[] = [
    {
        id: '8c21972b-f23d-4193-8851-b2fa6c6b2f63',
        fraOgMed: '2024-12-02',
        tilOgMed: undefined,
        søktTidspunkt: '2025-04-17T05:05:01.714798Z',
        oppgaver: [
            endretProgramperiodeOppgave,
            {
                oppgaveReferanse: 'dd6ebf33-e515-45c7-8eb4-2c8629064e5f',
                oppgavetype: Oppgavetype.BEKREFT_ENDRET_PROGRAMPERIODE,
                oppgavetypeData: {
                    programperiode: {
                        fomDato: '2025-05-05',
                        tomDato: '2026-01-01',
                    },
                    forrigeProgramperiode: {
                        fomDato: '2025-05-05',
                        tomDato: '9999-12-31',
                    },
                },
                bekreftelse: {
                    harGodtattEndringen: false,
                    uttalelseFraBruker: 'Dette mener jeg mye om, og jeg er faktisk uenig. Så det så',
                },
                status: OppgaveStatus.LØST,
                opprettetDato: '2025-05-28T13:18:38.596543Z',
                løstDato: '2025-05-28T21:10:48.241199Z',
                åpnetDato: undefined,
                lukketDato: undefined,
            },
            {
                oppgaveReferanse: 'd59e08d7-bb0d-4e86-aee4-5b89e4e53228',
                oppgavetype: Oppgavetype.BEKREFT_ENDRET_PROGRAMPERIODE,
                oppgavetypeData: {
                    programperiode: {
                        fomDato: '2025-03-10',
                        tomDato: '2025-08-01',
                    },
                    forrigeProgramperiode: {
                        fomDato: '2024-12-02',
                        tomDato: '9999-12-31',
                    },
                },
                status: OppgaveStatus.UTLØPT,
                opprettetDato: '2025-05-20T14:38:41.859873Z',
                løstDato: '2025-05-21T05:06:32.457669Z',
            },
            {
                oppgaveReferanse: 'c3782bb8-6fd6-462b-9db4-d2441485bddd',
                oppgavetype: Oppgavetype.RAPPORTER_INNTEKT,
                oppgavetypeData: {
                    fraOgMed: '2025-03-01',
                    tilOgMed: '2025-03-31',
                },
                status: OppgaveStatus.ULØST,
                opprettetDato: '2025-05-22T09:32:12.590003Z',
            },
            {
                oppgaveReferanse: 'e6eaf147-db0e-454c-9271-f15ffe550b10',
                oppgavetype: Oppgavetype.SEND_SØKNAD,
                oppgavetypeData: {
                    fomDato: '2025-08-01',
                },
                status: OppgaveStatus.LØST,
                opprettetDato: '2025-05-30T08:01:25.542771Z',
                løstDato: '2025-04-17T05:06:32.457669Z',
            },
        ],
    },
];

export default deltakelser;
