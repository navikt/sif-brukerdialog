import { rest } from 'msw';

const getMockData = (soker = 'soker1') => {
    return mockData[soker];
};

const mockData = {
    soker1: {
        søker: require('../data/soker1/søker-mock.json'),
        sak: require('../data/soker1/sak-mock.json'),
        arbeidsgiver: require('../data/soker1/arbeidsgiver-mock.json'),
    },
    soker2: {
        søker: require('../data/soker2/søker-mock.json'),
        sak: require('../data/soker2/sak-mock.json'),
        arbeidsgiver: require('../data/soker2/arbeidsgiver-mock.json'),
    },
    soker3: {
        søker: require('../data/soker3/søker-mock.json'),
        sak: require('../data/soker3/sak-mock.json'),
        arbeidsgiver: require('../data/soker3/arbeidsgiver-mock.json'),
    },
    soker4: {
        søker: require('../data/soker4/søker-mock.json'),
        sak: require('../data/soker4/sak-mock.json'),
        arbeidsgiver: require('../data/soker4/arbeidsgiver-mock.json'),
    },
    soker5: {
        søker: require('../data/soker5/søker-mock.json'),
        sak: require('../data/soker5/sak-mock.json'),
        arbeidsgiver: require('../data/soker5/arbeidsgiver-mock.json'),
    },
    soker6: {
        søker: require('../data/soker6/søker-mock.json'),
        sak: require('../data/soker6/sak-mock.json'),
        arbeidsgiver: require('../data/soker6/arbeidsgiver-mock.json'),
    },
};

const baseUrl = '*';

const MellomlagringStorageKey = 'mellomlagring-endring-psb';

const handlers = [
    rest.get(`${baseUrl}/health/isAlive`, (req, res, ctx) => res(ctx.status(200))),
    rest.get(`${baseUrl}/health/isReady`, (req, res, ctx) => res(ctx.status(200))),
    rest.get(`${baseUrl}/oppslag/soker`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(getMockData().søker));
    }),
    rest.get(`${baseUrl}/innsyn/sak`, (req, res, ctx) => {
        return res(ctx.delay(250), ctx.status(200), ctx.json(getMockData().sak));
    }),
    rest.get(`${baseUrl}/oppslag/arbeidsgiver`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(getMockData().arbeidsgiver));
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

export { handlers };
