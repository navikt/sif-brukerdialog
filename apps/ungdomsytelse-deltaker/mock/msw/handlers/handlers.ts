import { http, HttpResponse } from 'msw';
import { getScenarioFromLocalStorage } from '../../../src/dev/scenarioer';
import { getScenarioMockData } from '../mocks/scenarioes';

// const MellomlagringStorageKey = 'mellomlagring-ungdomsytelse-deltaker-soknad';
// let harSøkt = false;

export const getHandlers = () => {
    const scenario = getScenarioFromLocalStorage();
    const { barn, arbeidsgiver, søker, deltakelser } = getScenarioMockData(scenario.value);

    return [
        http.post('*amplitude*', () => new HttpResponse(null, { status: 200 })),
        http.post('*hotjar*', () => new HttpResponse(null, { status: 200 })),
        http.get('*login*', () => new HttpResponse(null, { status: 200 })),

        http.get('**/oppslag/soker', () => {
            return HttpResponse.json(søker);
        }),
        http.get('**/oppslag/barn', () => {
            return HttpResponse.json(barn);
        }),
        http.get('**/oppslag/arbeidsgiver', () => {
            return HttpResponse.json(arbeidsgiver);
        }),
        http.get('**/deltakelse/register/hent/alle', () => {
            return HttpResponse.json(deltakelser);
        }),
        http.post('**/marker-har-sokt', () => {
            return HttpResponse.json({});
        }),
        http.post('**/ungdomsytelse/soknad/innsending', () => {
            return new HttpResponse(null, { status: 200 });
        }),
        http.post('**/ungdomsytelse/oppgavebekreftelse/innsending', () => {
            return new HttpResponse(null, { status: 200 });
        }),
        http.post('**/ungdomsytelse/inntektsrapportering/innsending', () => {
            return new HttpResponse(null, { status: 200 });
        }),
        // http.get(`**/mellomlagring/UNGDOMSYTELSE`, async () => {
        //     const data = localStorage.getItem(MellomlagringStorageKey);
        //     const jsonData = JSON.parse(JSON.stringify(data) || '{}');
        //     await delay(350);
        //     return new HttpResponse(jsonData, { status: 200 });
        // }),
        // http.post(`**/mellomlagring/UNGDOMSYTELSE`, async ({ request }) => {
        //     const data = await request.text();
        //     localStorage.setItem(MellomlagringStorageKey, data);
        //     return new HttpResponse(null, { status: 200 });
        // }),
        // http.put(`**/mellomlagring/UNGDOMSYTELSE`, async ({ request }) => {
        //     const data = await request.text();
        //     localStorage.setItem(MellomlagringStorageKey, data);
        //     return new HttpResponse(null, { status: 200 });
        // }),
        // http.delete(`**/mellomlagring/UNGDOMSYTELSE`, () => {
        //     localStorage.setItem(MellomlagringStorageKey, '');
        //     return new HttpResponse(null, { status: 200 });
        // }),
    ];
};
