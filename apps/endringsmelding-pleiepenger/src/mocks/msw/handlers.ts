import { http, HttpResponse, delay } from 'msw';
import { getScenarioFromLocalStorage } from '../../app/dev/scenarioer';
import { getScenarioMockData } from '../data/scenario';

const baseUrl = '*';

const MellomlagringStorageKey = 'mellomlagring-endring-psb';

export const getHandlers = () => {
    const scenario = getScenarioFromLocalStorage();
    const { sak, arbeidsgiver, søker } = getScenarioMockData(scenario.value);

    const handlers = [
        http.get(`${baseUrl}/health/isAlive`, () => new HttpResponse(null, { status: 200 })),
        http.get(`${baseUrl}/health/isReady`, () => new HttpResponse(null, { status: 200 })),
        http.get(`${baseUrl}/oppslag/soker`, () => {
            return new HttpResponse(JSON.stringify(søker), { status: 200 });
        }),
        http.get(`${baseUrl}/oppslag/soker-ikkeLoggetInn`, () => {
            new HttpResponse(null, { status: 401 });
        }),
        http.get(`${baseUrl}/innsyn/sak`, async () => {
            await delay(250);
            return new HttpResponse(JSON.stringify(sak), { status: 200 });
        }),
        http.get(`${baseUrl}/oppslag/arbeidsgiver`, () => {
            return new HttpResponse(JSON.stringify(arbeidsgiver), { status: 200 });
        }),
        http.get(`${baseUrl}/mellomlagring/ENDRINGSMELDING_PLEIEPENGER_SYKT_BARN`, () => {
            const data = localStorage.getItem(MellomlagringStorageKey);
            const jsonData = JSON.parse(JSON.stringify(data) || '{}');
            return new HttpResponse(jsonData, { status: 200 });
        }),
        http.post(`${baseUrl}/mellomlagring/ENDRINGSMELDING_PLEIEPENGER_SYKT_BARN`, async ({ request }) => {
            const data = await request.text();
            localStorage.setItem(MellomlagringStorageKey, data);
            return new HttpResponse(null, { status: 200 });
        }),
        http.put(`${baseUrl}/mellomlagring/ENDRINGSMELDING_PLEIEPENGER_SYKT_BARN`, async ({ request }) => {
            const data = await request.text();
            localStorage.setItem(MellomlagringStorageKey, data);
            return new HttpResponse(null, { status: 200 });
        }),
        http.delete(`${baseUrl}/mellomlagring/ENDRINGSMELDING_PLEIEPENGER_SYKT_BARN`, () => {
            localStorage.setItem(MellomlagringStorageKey, '');
            return new HttpResponse(null, { status: 200 });
        }),
        http.post(`${baseUrl}/pleiepenger-sykt-barn/endringsmelding/innsending`, () => {
            return new HttpResponse(null, { status: 200 });
        }),
    ];

    return handlers;
};
