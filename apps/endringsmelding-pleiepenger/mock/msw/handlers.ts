import { getInnsendtSakStorageKey, getScenarioFromLocalStorage } from '@app/dev/scenarioer';
import { SøknadApiData } from '@app/types';
import { delay, http, HttpResponse, passthrough } from 'msw';

import { getScenarioMockData } from '../data/scenario';
import { oppdaterSakerMedEndringsmelding } from './oppdaterSakMedEndringsmelding';

const baseUrl = '*';

const MellomlagringStorageKey = 'mellomlagring-endring-psb';

export const getHandlers = () => {
    const scenario = getScenarioFromLocalStorage();
    const { sak: scenarioSak, arbeidsgiver, søker } = getScenarioMockData(scenario.value);

    /** Innsendte endringer lagres per scenario, slik at de ligger i saken neste gang dialogen åpnes */
    const SakStorageKey = getInnsendtSakStorageKey(scenario.value);
    const getSak = () => {
        const lagretSak = localStorage.getItem(SakStorageKey);
        return lagretSak ? JSON.parse(lagretSak) : scenarioSak;
    };

    const handlers = [
        http.all('https://widget.uxsignals.com/*', () => passthrough()),
        http.get(`${baseUrl}/oppslag/soker`, () => {
            return new HttpResponse(JSON.stringify(søker), { status: 200 });
        }),
        http.get(`${baseUrl}/oppslag/soker-ikkeLoggetInn`, () => {
            new HttpResponse(null, { status: 401 });
        }),
        http.get(`${baseUrl}/innsyn/sak`, async () => {
            await delay(250);
            return new HttpResponse(JSON.stringify(getSak()), { status: 200 });
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
        http.post(`${baseUrl}/pleiepenger-sykt-barn/endringsmelding/innsending`, async ({ request }) => {
            const endringsmelding = (await request.json()) as SøknadApiData;
            const oppdaterteSaker = oppdaterSakerMedEndringsmelding(getSak(), endringsmelding);
            localStorage.setItem(SakStorageKey, JSON.stringify(oppdaterteSaker));
            return new HttpResponse(null, { status: 200 });
        }),
        http.post('*', () => new HttpResponse(null, { status: 200 })),
        http.get('*', () => new HttpResponse(null, { status: 200 })),
    ];

    return handlers;
};
