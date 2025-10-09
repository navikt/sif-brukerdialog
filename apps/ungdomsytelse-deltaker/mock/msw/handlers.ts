/* eslint-disable max-len */
import { UngdomsytelseOppgavebekreftelse } from '@navikt/k9-brukerdialog-prosessering-api';
import { http, HttpResponse } from 'msw';

import { ScenarioType } from '../scenarios/types';
import { store } from '../state/store';
import { mockUtils } from '../utils/mockUtils';

store.init(ScenarioType.harIkkeSøkt);

// const errorResponse = {
//     type: 'NetworkError',
//     context: 'sendOppgavebekreftelse',
//     message: 'Request failed with status code 500',
//     originalError: {
//         message: 'Request failed with status code 500',
//         name: 'AxiosError',
//         stack: 'AxiosError: Request failed with status code 500\n at rB (https://ungdomsytelse-deltaker.intern.dev.nav.no/ungdomsprogrammet/ytelsen/assets/index-B3Q5CI-H.js:200:1089)\n at XMLHttpRequest.A (https://ungdomsytelse-deltaker.intern.dev.nav.no/ungdomsprogrammet/ytelsen/assets/index-B3Q5CI-H.js:200:5746)\n at Gh.request (https://ungdomsytelse-deltaker.intern.dev.nav.no/ungdomsprogrammet/ytelsen/assets/index-B3Q5CI-H.js:202:2073)\n at async _Le (https://ungdomsytelse-deltaker.intern.dev.nav.no/ungdomsprogrammet/ytelsen/assets/index-B3Q5CI-H.js:242:5126)\n at async _Le (https://ungdomsytelse-deltaker.intern.dev.nav.no/ungdomsprogrammet/ytelsen/assets/index-B3Q5CI-H.js:286:12485)',
//     },
//     config: {
//         transitional: { silentJSONParsing: true, forcedJSONParsing: true, clarifyTimeoutError: false },
//         adapter: ['xhr', 'http', 'fetch'],
//         transformRequest: [null],
//         transformResponse: [null],
//         timeout: 0,
//         xsrfCookieName: 'XSRF-TOKEN',
//         xsrfHeaderName: 'X-XSRF-TOKEN',
//         maxContentLength: -1,
//         maxBodyLength: -1,
//         env: {},
//         headers: {
//             Accept: 'application/json, text/plain, */*',
//             'Content-Type': 'application/json',
//             'X-Brukerdialog-Git-Sha': 'overskrives-av-server',
//             'X-Correlation-ID': 'fea3b98e-9042-4c60-aee9-f3817151b539',
//         },
//         throwOnError: true,
//         withCredentials: false,
//         baseURL: 'https://ungdomsytelse-deltaker.intern.dev.nav.no/api/brukerdialog',
//         security: [{ scheme: 'bearer', type: 'http' }],
//         url: 'https://ungdomsytelse-deltaker.intern.dev.nav.no/api/brukerdialog/ungdomsytelse/oppgavebekreftelse/innsending',
//         body: {
//             oppgave: {
//                 oppgaveReferanse: '9f31904b-2313-4705-a91e-c55aa0825a7f',
//                 uttalelse: {
//                     harUttalelse: true,
//                     uttalelseFraDeltaker: 'jeg mener 3333 er rett - arbeidsgiver tar feil',
//                 },
//             },
//         },
//         method: 'post',
//         data: {
//             oppgave: { oppgaveReferanse: '9f31904b-2313-4705-a91e-c55aa0825a7f' },
//             uttalelse: {
//                 harUttalelse: true,
//                 uttalelseFraDeltaker: 'jeg mener 3333 er rett - arbeidsgiver tar feil',
//             },
//         },
//         allowAbsoluteUrls: true,
//     },
//     code: 'ERR_BAD_RESPONSE',
//     status: 500,
// };

export const getHandlers = () => [
    // App api mocking
    http.get('**/deltaker/hent-kontonummer', () => {
        return HttpResponse.json({ harKontonummer: true, kontonummer: '12345678901' });
        // return HttpResponse.json({ error: { message: '503' } }, { status: 503 });
    }),

    http.get('**/oppslag/soker', () => HttpResponse.json(store.get().søker)),

    http.get('**/oppslag/barn', () => HttpResponse.json(store.get().barn)),

    http.get('**/oppslag/arbeidsgiver', () => HttpResponse.json(store.get().arbeidsgiver)),

    http.get('**/deltakelse/register/hent/alle', () => HttpResponse.json(store.get().deltakelser)),

    http.put('**/deltakelse/register/:id/marker-har-sokt', () => new HttpResponse(null, { status: 500 })),

    http.get('**/deltakelse/register/oppgave/:oppgaveReferanse/apnet', ({ params }) => {
        const ref = params.oppgaveReferanse;
        if (!ref || typeof ref !== 'string') return new HttpResponse(null, { status: 400 });
        const oppgave = mockUtils.setOppgaveSomÅpnet(ref as string);
        return HttpResponse.json(oppgave);
    }),

    http.get('**/deltakelse/register/oppgave/:oppgaveReferanse/lukk', ({ params }) => {
        const ref = params.oppgaveReferanse;
        if (!ref || typeof ref !== 'string') return new HttpResponse(null, { status: 400 });
        const oppgave = mockUtils.setOppgaveSomLukket(ref);
        return HttpResponse.json(oppgave);
    }),

    http.post('**/ungdomsytelse/soknad/innsending', () => {
        // mockUtils.setDeltakelseSøktFor();
        store.setScenario(ScenarioType.harSøkt);
        return HttpResponse.json({});
    }),

    http.post('**/ungdomsytelse/oppgavebekreftelse/innsending', async ({ request }) => {
        // return HttpResponse.json(error, { status: 500 });
        const text = await request.text();
        try {
            const parsed: UngdomsytelseOppgavebekreftelse = JSON.parse(text);
            mockUtils.setOppgavebekreftelse(parsed.oppgave.oppgaveReferanse, parsed);
        } catch (e) {
            // eslint-disable-next-line no-console
            console.error(e);
        }
        return new HttpResponse(null, { status: 200 });
    }),

    http.post('**/ungdomsytelse/inntektsrapportering/innsending', async ({ request }) => {
        const text = await request.text();
        const parsed = JSON.parse(text);
        mockUtils.setRapportertInntekt(parsed.oppgaveReferanse, parsed);
        return new HttpResponse(null, { status: 200 });
    }),

    http.get('*', () => new HttpResponse(null, { status: 200 })),
    http.post('*', () => new HttpResponse(null, { status: 200 })),
];
