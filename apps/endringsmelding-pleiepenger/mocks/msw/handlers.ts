import { rest } from 'msw';
import { getScenarioFromLocalStorage } from '../../src/app/dev/scenarioer';

const getMockData = (scenario = 'en-arbeidsgiver-en-periode') => {
    return mockData[scenario] ? mockData[scenario] : mockData['en-arbeidsgiver-en-periode'];
};

type ScenarioMap = {
    [key: string]: ScenarioData;
};

interface ScenarioData {
    søker: any;
    sak: any;
    arbeidsgiver: any;
}
const mockData: ScenarioMap = {
    ['en-arbeidsgiver-en-periode']: {
        søker: require('../data/scenario/en-arbeidsgiver-en-periode/søker-mock.json'),
        sak: require('../data/scenario/en-arbeidsgiver-en-periode/sak-mock.json'),
        arbeidsgiver: require('../data/scenario/en-arbeidsgiver-en-periode/arbeidsgiver-mock.json'),
    },
    ['en-arbeidsgiver-to-perioder']: {
        søker: require('../data/scenario/en-arbeidsgiver-to-perioder/søker-mock.json'),
        sak: require('../data/scenario/en-arbeidsgiver-to-perioder/sak-mock.json'),
        arbeidsgiver: require('../data/scenario/en-arbeidsgiver-to-perioder/arbeidsgiver-mock.json'),
    },
    ['arbeidsgiver-og-frilanser']: {
        søker: require('../data/scenario/arbeidsgiver-og-frilanser/søker-mock.json'),
        sak: require('../data/scenario/arbeidsgiver-og-frilanser/sak-mock.json'),
        arbeidsgiver: require('../data/scenario/arbeidsgiver-og-frilanser/arbeidsgiver-mock.json'),
    },
    ['arbeidsgivere-og-frilanser']: {
        søker: require('../data/scenario/arbeidsgivere-og-frilanser/søker-mock.json'),
        sak: require('../data/scenario/arbeidsgivere-og-frilanser/sak-mock.json'),
        arbeidsgiver: require('../data/scenario/arbeidsgivere-og-frilanser/arbeidsgiver-mock.json'),
    },
    ['debug']: {
        søker: require('../data/scenario/debug/søker-mock.json'),
        sak: require('../data/scenario/debug/sak-mock.json'),
        arbeidsgiver: require('../data/scenario/debug/arbeidsgiver-mock.json'),
    },
    ['selvstendig-næringsdrivende']: {
        søker: require('../data/scenario/selvstendig-næringsdrivende/søker-mock.json'),
        sak: require('../data/scenario/selvstendig-næringsdrivende/sak-mock.json'),
        arbeidsgiver: require('../data/scenario/selvstendig-næringsdrivende/arbeidsgiver-mock.json'),
    },
    ['flere-saker']: {
        søker: require('../data/scenario/flere-saker/søker-mock.json'),
        sak: require('../data/scenario/flere-saker/sak-mock.json'),
        arbeidsgiver: require('../data/scenario/flere-saker/arbeidsgiver-mock.json'),
    },
    ['ingen-sak']: {
        søker: require('../data/scenario/ingen-sak/søker-mock.json'),
        sak: require('../data/scenario/ingen-sak/sak-mock.json'),
        arbeidsgiver: require('../data/scenario/ingen-sak/arbeidsgiver-mock.json'),
    },
    ['arbeidsgiver-ikke-i-sak']: {
        søker: require('../data/scenario/arbeidsgiver-ikke-i-sak/søker-mock.json'),
        sak: require('../data/scenario/arbeidsgiver-ikke-i-sak/sak-mock.json'),
        arbeidsgiver: require('../data/scenario/arbeidsgiver-ikke-i-sak/arbeidsgiver-mock.json'),
    },
    ['arbeidsaktivitet-uten-arbeidsgiver']: {
        søker: require('../data/scenario/arbeidsaktivitet-uten-arbeidsgiver/søker-mock.json'),
        sak: require('../data/scenario/arbeidsaktivitet-uten-arbeidsgiver/sak-mock.json'),
        arbeidsgiver: require('../data/scenario/arbeidsaktivitet-uten-arbeidsgiver/arbeidsgiver-mock.json'),
    },
    ['ugyldig-k9-format']: {
        søker: require('../data/scenario/ugyldig-k9-format/søker-mock.json'),
        sak: require('../data/scenario/ugyldig-k9-format/sak-mock.json'),
        arbeidsgiver: require('../data/scenario/ugyldig-k9-format/arbeidsgiver-mock.json'),
    },
};

const baseUrl = '*';

const MellomlagringStorageKey = 'mellomlagring-endring-psb';

export const getHandlers = () => {
    const scenario = getScenarioFromLocalStorage();
    const { sak, arbeidsgiver, søker } = getMockData(scenario.value);

    const handlers = [
        rest.get(`${baseUrl}/health/isAlive`, (req, res, ctx) => res(ctx.status(200))),
        rest.get(`${baseUrl}/health/isReady`, (req, res, ctx) => res(ctx.status(200))),
        rest.get(`${baseUrl}/oppslag/soker`, (req, res, ctx) => {
            return res(ctx.status(200), ctx.json(søker));
        }),
        rest.get(`${baseUrl}/innsyn/sak`, (req, res, ctx) => {
            return res(ctx.delay(250), ctx.status(200), ctx.json(sak));
        }),
        rest.get(`${baseUrl}/oppslag/arbeidsgiver`, (req, res, ctx) => {
            return res(ctx.status(200), ctx.json(arbeidsgiver));
        }),
        rest.get(`${baseUrl}/mellomlagring/ENDRINGSMELDING_PLEIEPENGER_SYKT_BARN`, (req, res, ctx) => {
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
        rest.delete(`${baseUrl}/mellomlagring/ENDRINGSMELDING_PLEIEPENGER_SYKT_BARN`, (req, res, ctx) => {
            localStorage.setItem(MellomlagringStorageKey, '');
            return res(ctx.status(200));
        }),
        rest.post(`${baseUrl}/pleiepenger-sykt-barn/endringsmelding/innsending`, (req, res, ctx) => {
            return res(ctx.status(200));
        }),
    ];

    return handlers;
};

// export { handlers };
