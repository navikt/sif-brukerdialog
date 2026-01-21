import { http, HttpResponse } from 'msw';
import barnMock from '../data/søker1/barn-mock.json';
import søkerMock from '../data/søker1/søker-mock.json';
import { getMellomlagringHandlers } from '../state/mellomlagringHandlers';

export const getHandlers = () => [
    http.get('**/oppslag/soker', () => HttpResponse.json(søkerMock)),
    http.get('**/oppslag/barn', () => HttpResponse.json(barnMock)),
    http.post('**/vedlegg', () => {
        return new HttpResponse(null, {
            status: 200,
            headers: { Location: '/vedlegg/123', 'access-control-expose-headers': 'Location' },
        });
    }),
    http.post('**/har-gyldig-vedtak', async () => {
        return HttpResponse.json({
            harInnvilgedeBehandlinger: false,
        });
    }),
    http.post('**/omsorgspenger-utvidet-rett/innsending', async () => {
        return HttpResponse.json(
            {
                violations: [
                    {
                        invalidValue: 'K9-format valideringsfeil',
                        parameterName: 'ytelse.høyereRisikoForFraværBeskrivelse',
                        parameterType: 'ENTITY',
                        reason: 'matcher ikke tillatt pattern [^[\\p{Graph}\\p{Space}\\p{Sc}\\p{L}\\p{M}\\p{N}§]+$]',
                    },
                ],
                detail: 'Forespørselen inneholder valideringsfeil',
                instance: '/omsorgspenger-utvidet-rett/innsending',
                properties: null,
                status: 400,
                title: 'invalid-request-parameters',
                type: '/problem-details/invalid-request-parameters',
            },
            { status: 200 },
        );
    }),
    ...getMellomlagringHandlers('omsorgspenger-utvidet-rett-mellomlagring'),

    // Stopp alle andre kall (Dekoratøren og andre tredjepartstjenester)
    http.all('*', () => new HttpResponse(null, { status: 200 })),
];
