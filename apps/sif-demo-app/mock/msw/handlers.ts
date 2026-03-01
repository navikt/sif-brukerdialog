import { http, HttpResponse } from 'msw';

import { ScenarioType } from '../scenarios/types';
import { store } from '../state/store';

store.init(ScenarioType.default);

export const handlers = [
    http.get('**/oppslag/soker', () => HttpResponse.json(store.get().søker)),

    http.get('**/oppslag/barn', () => HttpResponse.json({ barn: store.get().barn })),

    http.get('**/mellomlagring/:ytelse', () => HttpResponse.json(store.get().mellomlagring ?? {})),

    http.post('**/mellomlagring/:ytelse', async ({ request }) => {
        const data = (await request.json()) as Record<string, unknown>;
        store.update({ mellomlagring: data });
        return HttpResponse.json({});
    }),

    http.put('**/mellomlagring/:ytelse', async ({ request }) => {
        const data = (await request.json()) as Record<string, unknown>;
        store.update({ mellomlagring: data });
        return HttpResponse.json({});
    }),

    http.delete('**/mellomlagring/:ytelse', () => {
        store.update({ mellomlagring: undefined });
        return HttpResponse.json({});
    }),
];
