import { rest } from 'msw';
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
        rest.get(`${baseUrl}/health/isAlive`, (_req, res, ctx) => res(ctx.status(200))),
        rest.get(`${baseUrl}/health/isReady`, (_req, res, ctx) => res(ctx.status(200))),
        rest.get(`${baseUrl}/oppslag/soker`, (_req, res, ctx) => {
            return res(ctx.status(200), ctx.json(søker));
        }),
        rest.get(`${baseUrl}/oppslag/soker-ikkeLoggetInn`, (_req, res, ctx) => {
            return res(ctx.status(401));
        }),
        rest.get(`${baseUrl}/innsyn/sak`, (_req, res, ctx) => {
            return res(ctx.delay(250), ctx.status(200), ctx.json(sak));
        }),
        rest.get(`${baseUrl}/oppslag/arbeidsgiver`, (_req, res, ctx) => {
            return res(ctx.status(200), ctx.json(arbeidsgiver));
        }),
        rest.get(`${baseUrl}/mellomlagring/ENDRINGSMELDING_PLEIEPENGER_SYKT_BARN`, (_req, res, ctx) => {
            const data = localStorage.getItem(MellomlagringStorageKey);
            const jsonData = JSON.parse(data || '{}');
            return res(ctx.status(200), ctx.json(jsonData));
        }),
        rest.post(`${baseUrl}/mellomlagring/ENDRINGSMELDING_PLEIEPENGER_SYKT_BARN`, async (req, res, ctx) => {
            const data = await req.text();
            localStorage.setItem(MellomlagringStorageKey, data);
            return res(ctx.status(200));
        }),
        rest.put(`${baseUrl}/mellomlagring/ENDRINGSMELDING_PLEIEPENGER_SYKT_BARN`, async (req, res, ctx) => {
            const data = await req.text();
            localStorage.setItem(MellomlagringStorageKey, data);
            return res(ctx.status(200));
        }),
        rest.delete(`${baseUrl}/mellomlagring/ENDRINGSMELDING_PLEIEPENGER_SYKT_BARN`, (_req, res, ctx) => {
            localStorage.setItem(MellomlagringStorageKey, '');
            return res(ctx.status(200));
        }),
        rest.post(`${baseUrl}/pleiepenger-sykt-barn/endringsmelding/innsending`, (_req, res, ctx) => {
            return res(ctx.status(200));
        }),
    ];

    return handlers;
};
