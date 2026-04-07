import { delay, http, HttpResponse } from 'msw';
import { v4 } from 'uuid';

import { getDevAppSettings } from '../devAppSettings';
import { ScenarioType } from '../scenarios/types';
import { store } from '../state/store';

store.init(ScenarioType.ingenRegistrerteBarn);

const vedleggStore = new Map<string, { name: string; type: string; content: ArrayBuffer }>();

const { K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH } = getDevAppSettings();

const getVedleggUrl = (vedleggId: string) => `${K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH}/vedlegg/${vedleggId}`;

export const handlers = [
    http.get(`**/oppslag/soker`, () => HttpResponse.json(store.get().søker)),

    http.get(`**/oppslag/barn`, () => {
        return HttpResponse.json(store.get().barn || { barn: [] });
    }),

    http.post(`**/vedlegg`, async ({ request }) => {
        await delay(50);

        const formData = await request.formData();
        const vedlegg = formData.get('vedlegg');

        if (!(vedlegg instanceof File)) {
            return HttpResponse.json({ message: 'Mangler vedlegg i request' }, { status: 400 });
        }

        const vedleggId = `mock-vedlegg-${v4()}`;
        vedleggStore.set(vedleggId, {
            name: vedlegg.name,
            type: vedlegg.type,
            content: await vedlegg.arrayBuffer(),
        });

        return new HttpResponse(null, {
            status: 200,
            headers: {
                Location: getVedleggUrl(vedleggId),
                'access-control-expose-headers': 'Location',
            },
        });
    }),

    http.get(`**/vedlegg/:vedleggId`, ({ params }) => {
        const vedleggId = String(params.vedleggId);
        const file = vedleggStore.get(vedleggId);

        if (!file) {
            return HttpResponse.json({ message: 'Vedlegg ikke funnet' }, { status: 404 });
        }

        return new HttpResponse(file.content, {
            status: 200,
            headers: {
                'Content-Type': file.type || 'application/octet-stream',
                'Content-Disposition': `inline; filename="${encodeURIComponent(file.name)}"`,
            },
        });
    }),

    http.delete(`**/vedlegg/:vedleggId`, ({ params }) => {
        const vedleggId = String(params.vedleggId);
        vedleggStore.delete(vedleggId);
        return HttpResponse.json({});
    }),

    http.post(`**/omsorgspenger-utvidet-rett/innsending`, () => {
        const { innsendingResponse } = store.get();

        if (innsendingResponse) {
            return HttpResponse.json(innsendingResponse.body ?? {}, { status: innsendingResponse.status });
        }

        return HttpResponse.json({}, { status: 202 });
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
