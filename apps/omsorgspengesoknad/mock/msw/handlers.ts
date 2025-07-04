import { http, HttpResponse } from 'msw';
import barnMock from '../data/søker1/barn-mock.json';
import søkerMock from '../data/søker1/søker-mock.json';
import { getMellomlagringHandlers } from '../state/mellomlagringHandlers';

export const getHandlers = () => [
    http.get('**/oppslag/soker', () => HttpResponse.json(søkerMock)),
    http.get('**/oppslag/barn', () => HttpResponse.json(barnMock)),
    ...getMellomlagringHandlers('omsorgspenger-utvidet-rett-mellomlagring'),

    // Stopp alle andre kall (Dekoratøren og andre tredjepartstjenester)
    http.all('*', () => new HttpResponse(null, { status: 200 })),
];
