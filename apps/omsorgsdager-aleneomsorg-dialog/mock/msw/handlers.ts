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
    http.post('**/omsorgsdager-aleneomsorg/innsending', () => {
        return HttpResponse.json({});
    }),
    ...getMellomlagringHandlers('OMSORGSDAGER_ALENEOMSORG', 'mellomlagring/OMSORGSDAGER_ALENEOMSORG'),

    // Stopp alle andre kall (Dekoratøren og andre tredjepartstjenester)
    http.all('*', () => new HttpResponse(null, { status: 200 })),
];
