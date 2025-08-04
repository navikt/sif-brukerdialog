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
    http.post('**/omsorgspenger-utbetaling-arbeidstaker/innsending', () => {
        return HttpResponse.json({});
    }),
    http.post('**/vedlegg', () => {
        return HttpResponse.json({}, { headers: { location: '/vedlegg/123' } });
    }),
    http.delete('**/vedlegg/*', () => {
        return HttpResponse.json({});
    }),

    ...getMellomlagringHandlers(
        'OMSORGSPENGER_UTBETALING_ARBEIDSTAKER',
        'mellomlagring/OMSORGSPENGER_UTBETALING_ARBEIDSTAKER',
    ),

    // Stopp alle andre kall (Dekoratøren og andre tredjepartstjenester)
    http.all('*', () => new HttpResponse(null, { status: 200 })),
];
