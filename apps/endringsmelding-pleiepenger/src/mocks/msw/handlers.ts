import { http, HttpResponse, delay } from 'msw';
import { getScenarioFromLocalStorage } from '../../app/dev/scenarioer';
import { ArbeidsaktivitetUtenArbeidsgiver } from '../data/scenario/arbeidsaktivitet-uten-arbeidsgiver/ArbeidsaktivitetUtenArbeidsgiver';
import { ArbeidsgiverIkkeISak } from '../data/scenario/arbeidsgiver-ikke-i-sak/ArbeidsgiverIkkeISak';
import { ArbeidsgiverOgFrilanser } from '../data/scenario/arbeidsgiver-og-frilanser/ArbeidsgiverOgFrilanser';
import { ArbeidsgivereOgFrilanser } from '../data/scenario/arbeidsgivere-og-frilanser/ArbeidsgivereOgFrilanser';
import { Debug } from '../data/scenario/debug/Debug';
import { EnArbeidsgiverEnPeriode } from '../data/scenario/en-arbeidsgiver-en-periode/EnArbeidsgiverEnPeriode';
import { EnArbeidsgiverToPerioder } from '../data/scenario/en-arbeidsgiver-to-perioder/EnArbeidsgiverToPerioder';
import { FlereSaker } from '../data/scenario/flere-saker/FlereSaker';
import { IngenSak } from '../data/scenario/ingen-sak/IngenSak';
import { SelvstendigNæringsdrivende } from '../data/scenario/selvstendig-næringsdrivende/SelvstendigNæringsdrivende';
import { UgyldigK9Format } from '../data/scenario/ugyldig-k9-format/UgyldigK9Format';

const getMockData = (scenario = 'en-arbeidsgiver-en-periode') => {
    return mockData[scenario] ? mockData[scenario] : mockData['en-arbeidsgiver-en-periode'];
};

type ScenarioMap = {
    [key: string]: ScenarioData;
};

export interface ScenarioData {
    søker: any;
    sak: any;
    arbeidsgiver: any;
}
const mockData: ScenarioMap = {
    ['en-arbeidsgiver-en-periode']: EnArbeidsgiverEnPeriode,
    ['en-arbeidsgiver-to-perioder']: EnArbeidsgiverToPerioder,
    ['arbeidsgiver-og-frilanser']: ArbeidsgiverOgFrilanser,
    ['arbeidsgivere-og-frilanser']: ArbeidsgivereOgFrilanser,
    ['debug']: Debug,
    ['selvstendig-næringsdrivende']: SelvstendigNæringsdrivende,
    ['flere-saker']: FlereSaker,
    ['ingen-sak']: IngenSak,
    ['arbeidsgiver-ikke-i-sak']: ArbeidsgiverIkkeISak,
    ['arbeidsaktivitet-uten-arbeidsgiver']: ArbeidsaktivitetUtenArbeidsgiver,
    ['ugyldig-k9-format']: UgyldigK9Format,
};

const baseUrl = '*';

const MellomlagringStorageKey = 'mellomlagring-endring-psb';

export const getHandlers = () => {
    const scenario = getScenarioFromLocalStorage();
    const { sak, arbeidsgiver, søker } = getMockData(scenario.value);

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
