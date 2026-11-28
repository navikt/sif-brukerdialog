import { http, HttpResponse } from 'msw';

import { ScenarioType } from '../scenarios/types';
import { store } from '../state/store';

store.init(ScenarioType.default);

export const handlers = [
    http.get('**/oppslag/soker', () => HttpResponse.json(store.get().søker)),
    http.get('**/oppslag/barn', () => HttpResponse.json(store.get().barn)),
    http.get('**/mellomlagring/:ytelse', () => HttpResponse.json(store.get().mellomlagring ?? {})),
    http.post('**/mellomlagring/:ytelse', async ({ request }) => {
        store.update({ mellomlagring: (await request.json()) as Record<string, unknown> });
        return HttpResponse.json({});
    }),
    http.put('**/mellomlagring/:ytelse', async ({ request }) => {
        store.update({ mellomlagring: (await request.json()) as Record<string, unknown> });
        return HttpResponse.json({});
    }),
    http.delete('**/mellomlagring/:ytelse', () => {
        store.update({ mellomlagring: undefined });
        return HttpResponse.json({});
    }),
    http.post('**/omsorgsdager-aleneomsorg/innsending', () => HttpResponse.json({}, { status: 202 })),
    http.get('**/dekoratoren/**', () => new HttpResponse(null, { status: 200 })),
];
