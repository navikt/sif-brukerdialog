import { http, HttpResponse } from 'msw';

import { mockData } from '../data';
import { getMellomlagringHandlers } from './mellomlagringHandlers';

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
    http.post('**/vedlegg', () => {
        return HttpResponse.json({}, { headers: { location: '/vedlegg/123' } });
    }),
    http.delete('**/vedlegg/*', () => {
        return HttpResponse.json({});
    }),
    // Vedlegg lagres ikke i mock, så alle regnes som at de finnes
    http.post('**/vedlegg/eksisterer', async ({ request }) => {
        const { vedleggIder } = (await request.json()) as { vedleggIder: string[] };
        return HttpResponse.json(vedleggIder.map((vedleggId) => ({ vedleggId, finnes: false })));
    }),

    ...getMellomlagringHandlers('PLEIEPENGER_SYKT_BARN', 'mellomlagring/PLEIEPENGER_SYKT_BARN'),

    // Stopp alle andre kall (Dekoratøren og andre tredjepartstjenester)
    http.all('*', () => new HttpResponse(null, { status: 200 })),
];
