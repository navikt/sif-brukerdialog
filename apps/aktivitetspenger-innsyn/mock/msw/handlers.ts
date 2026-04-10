import { UngdomsytelseOppgavebekreftelse } from '@navikt/k9-brukerdialog-prosessering-api';
import { http, HttpResponse } from 'msw';

import { ScenarioType } from '../scenarios/types';
import { store } from '../state/store';
import { mockUtils } from '../utils/mockUtils';

store.init(ScenarioType.default);

export const handlers = [
    http.get(`**/oppslag/soker`, () => HttpResponse.json(store.get().søker)),

    http.get('**/oppgave/hent/alle', () => {
        const oppgaver = store.get().oppgaver;
        return HttpResponse.json(oppgaver);
    }),

    http.post('**/aktivitetspenger/oppgavebekreftelse/innsending', async ({ request }) => {
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

    http.post('**/aktivitetspenger/inntektsrapportering/innsending', async ({ request }) => {
        const text = await request.text();
        const parsed = JSON.parse(text);
        mockUtils.setRapportertInntekt(parsed.oppgaveReferanse, parsed);
        return new HttpResponse(null, { status: 200 });
    }),

    http.get(`*`, () => HttpResponse.json({}, { status: 200 })),
    http.post(`*`, () => HttpResponse.json({}, { status: 200 })),
];
