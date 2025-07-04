import { http, HttpResponse } from 'msw';
import { søkerMock } from '../data/søker1/søker-mock';
import { barnMock } from '../data/søker1/barn-mock';
import { arbeidsgivereMock } from '../data/søker1/arbeidsgivere-mock';

export const getHandlers = () => [
    // Mock andre kall som kommer fra dekoratør
    http.get('*skyra*', () => new HttpResponse(null, { status: 200 })),
    http.post('*skyra*', () => new HttpResponse(null, { status: 200 })),
    http.post('*sentry*', () => new HttpResponse(null, { status: 200 })),
    http.get('*amplitude*', () => new HttpResponse(null, { status: 200 })),
    http.post('*amplitude*', () => new HttpResponse(null, { status: 200 })),
    http.post('*hotjar*', () => new HttpResponse(null, { status: 200 })),
    http.get('*nav.no*', () => new HttpResponse(null, { status: 200 })),
    http.get('*www.nav.no/dekoratoren*', () => new HttpResponse(null, { status: 200 })),
    http.get('*login*', () => new HttpResponse(null, { status: 200 })),

    // App api mocking

    http.get('**/oppslag/soker', () => HttpResponse.json(søkerMock)),

    http.get('**/oppslag/barn', () => HttpResponse.json(barnMock)),

    http.get('**/oppslag/arbeidsgiver', () => HttpResponse.json(arbeidsgivereMock)),
];
