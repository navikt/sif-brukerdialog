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
    http.post('**/vedlegg', () => {
        return HttpResponse.json({}, { headers: { location: '/vedlegg/123' } });
    }),
    http.delete('**/vedlegg/*', () => {
        return HttpResponse.json({});
    }),
    http.post('**/omsorgspenger-midlertidig-alene/innsending', async () => {
        return HttpResponse.json(
            {
                violations: [
                    {
                        invalidValue:
                            '\uD83D\uDC4D No apps required\n\nGetEmoji\nhttps://getemoji.com\nEmojis are supported on iOS, Android, macOS, Windows, Linux and ChromeOS. Copy and paste emojis for Twitter, Facebook',
                        parameterName: 'omsorgspengerMidlertidigAleneSøknad.annenForelder.situasjonBeskrivelse',
                        parameterType: 'ENTITY',
                        reason: 'Ugyldige tegn funnet i teksten: \uD83D, \uDC4D',
                    },
                ],
                detail: 'Forespørselen inneholder valideringsfeil',
                instance: '/omsorgspenger-utvidet-rett/innsending',
                properties: null,
                status: 400,
                title: 'invalid-request-parameters',
                type: '/problem-details/invalid-request-parameters',
            },
            { status: 400 },
        );
    }),
    ...getMellomlagringHandlers('OMSORGSPENGER_MIDLERTIDIG_ALENE', 'mellomlagring/OMSORGSPENGER_MIDLERTIDIG_ALENE'),

    // Stopp alle andre kall (Dekoratøren og andre tredjepartstjenester)
    http.all('*', () => new HttpResponse(null, { status: 200 })),
];
