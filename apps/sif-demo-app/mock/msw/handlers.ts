import { http, HttpResponse } from 'msw';
import { søkerMock } from '../data/søker1/søker-mock';
import { barnMock } from '../data/søker1/barn-mock';
import { arbeidsgivereMock } from '../data/søker1/arbeidsgivere-mock';

export const getHandlers = () => [
    http.get('**/oppslag/soker', () => HttpResponse.json(søkerMock)),
    http.get('**/oppslag/barn', () => HttpResponse.json(barnMock)),
    http.get('**/oppslag/arbeidsgiver', () => HttpResponse.json(arbeidsgivereMock)),

    // Stopp alle andre kall (Dekoratøren og andre tredjepartstjenester)
    http.all('*', () => new HttpResponse(null, { status: 200 })),
];
