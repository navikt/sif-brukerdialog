import { http, HttpResponse } from 'msw';

import { ScenarioType } from '../scenarios/types';
import { store } from '../state/store';

store.init(ScenarioType.søknad);

export const getHandlers = () => [
    // App api mocking
    http.get('**/deltaker/hent-kontonummer', () => {
        return HttpResponse.json({ harKontonummer: true, kontonummer: '12345678901' });
        // return HttpResponse.json({ error: { message: '503' } }, { status: 503 });
    }),

    http.get('**/oppslag/soker', () => HttpResponse.json(store.get().søker)),

    http.get('**/oppslag/barn', () => HttpResponse.json(store.get().barn)),

    http.get('**/oppslag/arbeidsgiver', () => HttpResponse.json(store.get().arbeidsgiver)),

    http.post('**/aktivitetspenger/soknad/innsending', () => {
        store.setScenario(ScenarioType.søknadSendt);
        return HttpResponse.json({});
    }),

    http.get('*', () => new HttpResponse(null, { status: 200 })),
    http.post('*', () => new HttpResponse(null, { status: 200 })),
];
