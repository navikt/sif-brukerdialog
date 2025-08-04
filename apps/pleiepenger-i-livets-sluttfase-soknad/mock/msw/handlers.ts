import { http, HttpResponse } from 'msw';
import { mockData } from '../data';
import { getMellomlagringHandlers } from './mellomlagringHandlers';

export const getHandlers = () => [
    http.get('**/oppslag/soker', () => {
        return HttpResponse.json(mockData.søker);
    }),
    http.get('**/oppslag/arbeidsgiver', () => {
        return HttpResponse.json(mockData.arbeidsgiver);
    }),
    http.post('**/pleiepenger-livets-sluttfase/innsending', () => {
        return HttpResponse.json({});
    }),
    http.post('**/vedlegg', () => {
        return HttpResponse.json({}, { headers: { location: '/vedlegg/123' } });
    }),
    http.delete('**/vedlegg/*', () => {
        return HttpResponse.json({});
    }),

    ...getMellomlagringHandlers('PLEIEPENGER_LIVETS_SLUTTFASE', 'mellomlagring/PLEIEPENGER_LIVETS_SLUTTFASE'),

    // Stopp alle andre kall (Dekoratøren og andre tredjepartstjenester)
    http.all('*', () => new HttpResponse(null, { status: 200 })),
];
