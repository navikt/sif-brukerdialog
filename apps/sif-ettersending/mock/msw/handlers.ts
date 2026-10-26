import { http, HttpResponse, passthrough } from 'msw';

import { ApiEndpoint } from '../../src/app/types/ApiEndpoint';
import { mockData } from '../data';
import { getMellomlagringHandlers } from './mellomlagringHandlers';
import { getDevAppSettings } from '../devAppSettings';
import { v4 } from 'uuid';

const { K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH } = getDevAppSettings();

const vedleggStore = new Map<string, { name: string; type: string; content: ArrayBuffer }>();
const getVedleggUrl = (vedleggId: string) => `${K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH}/vedlegg/${vedleggId}`;

export const getHandlers = () => [
    http.all('https://cdn.nav.no/*', () => passthrough()),
    http.all('https://*.api.sanity.io/*', () => passthrough()),

    http.get('**/oppslag/soker', () => {
        return HttpResponse.json(mockData.søker);
    }),
    http.get('**/oppslag/barn', () => {
        return HttpResponse.json(mockData.barn);
    }),
    http.post('**/ettersending/innsending', () => {
        return HttpResponse.json({});
    }),
    http.post('**/vedlegg', async ({ request }) => {
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
    ...getMellomlagringHandlers('ettersending-psb', ApiEndpoint.MELLOMLAGRING_PLEIEPENGER_SYKT_BARN),
    ...getMellomlagringHandlers('ettersending-pils', ApiEndpoint.MELLOMLAGRING_PLEIEPENGER_LIVETS_SLUTTFASE),
    ...getMellomlagringHandlers('ettersending-omp', ApiEndpoint.MELLOMLAGRING_OMP),
    ...getMellomlagringHandlers('ettersending-opplaringspenger', ApiEndpoint.MELLOMLAGRING_OPPLARINGSPENGER),

    // Stopp alle andre kall (Dekoratøren og andre tredjepartstjenester)
    http.all('*', () => new HttpResponse(null, { status: 200 })),
];
