import { http, HttpResponse } from 'msw';
import søkerMock from '../data/søker1/søker-mock.json';
import barnMock from '../data/søker1/barn-mock.json';
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
    http.post('**/valider/friteksfelt', () => HttpResponse.json({})),
    http.post('**/valider/friteksfelt-ugyldig', async () => {
        return HttpResponse.json(
            {
                violations: [
                    {
                        invalidValue: '\uD83D\uDE42\uD83D\uDE0A\uD83D\uDE00\uD83D\uDE01',
                        parameterName: 'høyereRisikoForFraværBeskrivelse',
                        parameterType: 'ENTITY',
                        reason: 'Ugyldige tegn funnet i teksten: \uD83D, \uDE42, \uD83D, \uDE0A, \uD83D, \uDE00, \uD83D, \uDE01',
                    },
                ],
                detail: 'Forespørselen inneholder valideringsfeil',
                instance: 'https://omsorgspengesoknad.intern.dev.nav.no/omsorgspenger-utvidet-rett/innsending',
                properties: null,
                status: 400,
                title: 'invalid-request-parameters',
                type: '/problem-details/invalid-request-parameters',
            },
            { status: 400 },
        );
    }),
    http.post('**/har-gyldig-vedtak', async ({ request }) => {
        const body = (await request.json()) as { pleietrengendeAktørId: string };
        const { pleietrengendeAktørId } = body;

        return pleietrengendeAktørId !== '123'
            ? HttpResponse.json({
                  harInnvilgedeBehandlinger: false,
              })
            : HttpResponse.json({
                  harInnvilgedeBehandlinger: true,
                  saksnummer: '123',
                  vedtaksdato: '2020-01-01',
              });
    }),
    http.post('**/omsorgspenger-utvidet-rett/innsending', async () => HttpResponse.json({})),
    http.post('**/omsorgspenger-utvidet-rett/innsending-ugyldig', async () => {
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
            { status: 400 },
        );
    }),
    ...getMellomlagringHandlers('omsorgspenger-utvidet-rett-mellomlagring'),

    // Stopp alle andre kall (Dekoratøren og andre tredjepartstjenester)
    http.all('*', () => new HttpResponse(null, { status: 200 })),
];
