import { http, HttpResponse } from 'msw';

import { mockData } from '../data';
import { getDevAppSettings } from '../devAppSettings';
import { getMellomlagringHandlers } from './mellomlagringHandlers';

const { K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH } = getDevAppSettings();

let vedleggCounter = 0;
const vedleggStore = new Map<string, { name: string; type: string; content: ArrayBuffer }>();

const getVedleggUrl = (vedleggId: string) => `${K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH}/vedlegg/${vedleggId}`;

export const getHandlers = () => [
    http.get('**/oppslag/soker', () => {
        return HttpResponse.json(mockData.søker);
    }),
    http.get('**/oppslag/barn', () => {
        return HttpResponse.json(mockData.barn);
    }),
    http.get('**/oppslag/arbeidsgiver', () => {
        return HttpResponse.json(mockData.arbeidsgiver);
    }),
    http.post('**/pleiepenger-sykt-barn/innsending', () => {
        return HttpResponse.json({});
    }),
    http.post('**/vedlegg', async ({ request }) => {
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
    http.get('**/vedlegg/:vedleggId', ({ params }) => {
        const vedlegg = vedleggStore.get(String(params.vedleggId));
        if (!vedlegg) {
            return HttpResponse.json({ message: 'Vedlegg ikke funnet' }, { status: 404 });
        }
        return new HttpResponse(vedlegg.content, {
            headers: {
                'Content-Type': vedlegg.type || 'application/octet-stream',
                'Content-Disposition': `inline; filename="${encodeURIComponent(vedlegg.name)}"`,
            },
        });
    }),
    http.delete('**/vedlegg/:vedleggId', ({ params }) => {
        vedleggStore.delete(String(params.vedleggId));
        return HttpResponse.json({});
    }),
    // Vedlegg lagres bare i minnet, så etter reload vil vedlegg i mellomlagring kunne mangle i backend.
    http.post('**/vedlegg/eksisterer', async ({ request }) => {
        const { vedleggIder } = (await request.json()) as { vedleggIder: string[] };
        return HttpResponse.json(vedleggIder.map((vedleggId) => ({ vedleggId, finnes: vedleggStore.has(vedleggId) })));
    }),

    ...getMellomlagringHandlers('PLEIEPENGER_SYKT_BARN', 'mellomlagring/PLEIEPENGER_SYKT_BARN'),

    // Stopp alle andre kall (Dekoratøren og andre tredjepartstjenester)
    http.all('*', () => new HttpResponse(null, { status: 200 })),
];
