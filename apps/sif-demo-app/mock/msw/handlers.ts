import { delay, http, HttpResponse } from 'msw';

import { ScenarioType } from '../scenarios/types';
import { store } from '../state/store';

store.init(ScenarioType.default);

let vedleggCounter = 0;
const vedleggStore = new Map<string, { name: string; type: string; content: ArrayBuffer }>();

const getVedleggUrl = (vedleggId: string) => `/vedlegg/${vedleggId}`;

export const handlers = [
    http.get(`**/oppslag/soker`, () => HttpResponse.json(store.get().søker)),

    http.get(`**/oppslag/barn`, () => {
        return HttpResponse.json(store.get().barn || { barn: [] });
    }),

    http.post(`**/api/send`, () => {
        return HttpResponse.json({}, { status: 200 });
    }),

    http.post(`**/aktivitetspenger/soknad/innsending`, () => {
        return HttpResponse.json({}, { status: 200 });
    }),

    http.post(`**/vedlegg`, async ({ request }) => {
        const formData = await request.formData();
        const vedlegg = formData.get('vedlegg');

        if (!(vedlegg instanceof File)) {
            return HttpResponse.json({ message: 'Mangler vedlegg i request' }, { status: 400 });
        }

        vedleggCounter += 1;
        const vedleggId = `mock-vedlegg-${vedleggCounter}`;
        vedleggStore.set(vedleggId, {
            name: vedlegg.name,
            type: vedlegg.type,
            content: await vedlegg.arrayBuffer(),
        });

        return new HttpResponse(null, {
            headers: {
                Location: getVedleggUrl(vedleggId),
                'access-control-expose-headers': 'Location',
            },
        });
    }),

    http.get(`**/vedlegg/:vedleggId`, ({ params }) => {
        const file = vedleggStore.get(String(params.vedleggId));

        if (!file) {
            return HttpResponse.json({ message: 'Vedlegg ikke funnet' }, { status: 404 });
        }

        return new HttpResponse(file.content, {
            headers: {
                'Content-Type': file.type || 'application/octet-stream',
                'Content-Disposition': `inline; filename="${encodeURIComponent(file.name)}"`,
            },
        });
    }),

    http.delete(`**/vedlegg/:vedleggId`, ({ params }) => {
        vedleggStore.delete(String(params.vedleggId));
        return HttpResponse.json({});
    }),

    http.get(`**/mellomlagring/:ytelse`, () => HttpResponse.json(store.get().mellomlagring ?? {})),

    http.post(`**/mellomlagring/:ytelse`, async ({ request }) => {
        await delay(50);
        const data = (await request.json()) as Record<string, unknown>;
        store.update({ mellomlagring: data });
        return HttpResponse.json({});
    }),

    http.put(`**/mellomlagring/:ytelse`, async ({ request }) => {
        await delay(50);
        const data = (await request.json()) as Record<string, unknown>;
        store.update({ mellomlagring: data });
        return HttpResponse.json({});
    }),

    http.delete(`**/mellomlagring/:ytelse`, () => {
        store.update({ mellomlagring: undefined });
        return HttpResponse.json({});
    }),

    http.get(`*`, () => HttpResponse.json({}, { status: 200 })),
    http.post(`*`, () => HttpResponse.json({}, { status: 200 })),
];
