import { delay, http, HttpResponse } from 'msw';

import { getScenarioMockData } from '../scenarios/scenarioer';
import { ScenarioData, ScenarioType } from '../scenarios/types';
import { store } from '../state/store';

store.init(ScenarioType.default);

const storedScenarioData = store.get() as Partial<ScenarioData>;
if (!storedScenarioData.tilgjengeligSøknad) {
    store.update({
        tilgjengeligSøknad: getScenarioMockData(store.getScenario()).tilgjengeligSøknad,
    });
}

export const handlers = [
    http.get(`**/oppslag/soker`, () => HttpResponse.json(store.get().søker)),

    http.get(`**/oppslag/barn`, () => {
        return HttpResponse.json(store.get().barn || { barn: [] });
    }),

    http.get(`**/deltaker/hent-kontonummer`, () => {
        return HttpResponse.json(store.get().kontonummer);
    }),

    http.post('**/aktivitetspenger/soknad/innsending', async () => {
        await delay(300);
        return HttpResponse.json({}, { status: 200 });
    }),

    http.post('**/aktivitetspenger/soknad/innsending-feil', async () => {
        await delay(300);
        return HttpResponse.json(
            {
                type: 'https://k9-brukerdialog-prosessering/problem-details/invalid-request-parameters',
                title: 'invalid-request-parameters',
                status: 400,
                detail: 'Forespørselen inneholder valideringsfeil',
                instance: '/aktivitetspenger/soknad/innsending',
                invalid_parameters: [
                    {
                        invalidValue: '',
                        parameterName: 'startdato',
                        parameterType: 'ENTITY',
                        reason: 'Startdato er ugyldig',
                    },
                ],
            },
            { status: 400, headers: { 'Content-Type': 'application/problem+json' } },
        );
    }),

    http.get(`**/aktivitetspenger/soknad/tilgjengelig`, () => HttpResponse.json(store.get().tilgjengeligSøknad)),

    http.get(`**/mellomlagring/:ytelse`, () => HttpResponse.json(store.get().mellomlagring ?? {})),

    http.post(`**/mellomlagring/:ytelse`, async ({ request }) => {
        await delay(50);
        const data = (await request.json()) as Record<string, unknown>;
        store.update({ mellomlagring: data });
        return HttpResponse.json({});
    }),

    http.put(`**/mellomlagring/:ytelse`, async ({ request }) => {
        await delay(50);
        const data = (await request.json()) as Record<string, unknown>;
        store.update({ mellomlagring: data });
        return HttpResponse.json({});
    }),

    http.delete(`**/mellomlagring/:ytelse`, () => {
        store.update({ mellomlagring: undefined });
        return HttpResponse.json({});
    }),

    http.get(`*`, () => HttpResponse.json({}, { status: 200 })),
    http.post(`*`, () => HttpResponse.json({}, { status: 200 })),
];
