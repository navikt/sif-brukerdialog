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
    ...getMellomlagringHandlers('omsorgspenger-utvidet-rett-mellomlagring'),

    // Stopp alle andre kall (Dekoratøren og andre tredjepartstjenester)
    http.all('*', () => new HttpResponse(null, { status: 200 })),
];
