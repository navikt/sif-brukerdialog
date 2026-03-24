import { http, HttpResponse } from 'msw';

import { ScenarioType } from '../scenarios/types';
import { store } from '../state/store';

store.init(ScenarioType.default);

export const handlers = [
    http.get(`**/oppslag/soker`, () => HttpResponse.json(store.get().søker)),

    http.get('**/oppgave/hent/alle', () => {
        const oppgaver = store.get().oppgaver;
        return HttpResponse.json(oppgaver);
    }),

    http.get(`*`, () => HttpResponse.json({}, { status: 200 })),
    http.post(`*`, () => HttpResponse.json({}, { status: 200 })),
];
