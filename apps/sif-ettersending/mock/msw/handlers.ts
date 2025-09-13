import { http, HttpResponse } from 'msw';
import { ApiEndpoint } from '../../src/app/types/ApiEndpoint';
import { mockData } from '../data';
import { getMellomlagringHandlers } from './mellomlagringHandlers';

export const getHandlers = () => [
    http.get('**/oppslag/soker', () => {
        return HttpResponse.json(mockData.søker);
    }),
    http.get('**/oppslag/barn', () => {
        return HttpResponse.json(mockData.barn);
    }),
    http.post('**/ettersending/innsending', () => {
        return HttpResponse.json({});
    }),
    http.post('**/vedlegg', () => {
        return HttpResponse.json({}, { headers: { location: '/vedlegg/123' } });
    }),
    http.delete('**/vedlegg/*', () => {
        return HttpResponse.json({});
    }),
    ...getMellomlagringHandlers('ettersending-psb', ApiEndpoint.MELLOMLAGRING_PLEIEPENGER_SYKT_BARN),
    ...getMellomlagringHandlers('ettersending-pils', ApiEndpoint.MELLOMLAGRING_PLEIEPENGER_LIVETS_SLUTTFASE),
    ...getMellomlagringHandlers('ettersending-omp', ApiEndpoint.MELLOMLAGRING_OMP),
    ...getMellomlagringHandlers('ettersending-opplaringspenger', ApiEndpoint.MELLOMLAGRING_OPPLARINGSPENGER),

    // Stopp alle andre kall (Dekoratøren og andre tredjepartstjenester)
    http.all('*', () => new HttpResponse(null, { status: 200 })),
];
