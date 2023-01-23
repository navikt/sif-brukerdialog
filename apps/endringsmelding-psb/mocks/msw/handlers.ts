import { rest } from 'msw';

const søkerJson = require('../data/soker3/søker-mock.json');
const sakJson = require('../data/soker3/sak-mock.json');
const arbeidsgiverJson = require('../data/soker3/arbeidsgiver-mock.json');

const baseUrl = '*';

const MellomlagringStorageKey = 'mellomlagring-endring-psb';

const handlers = [
    rest.get(`${baseUrl}/health/isAlive`, (req, res, ctx) => res(ctx.status(200))),
    rest.get(`${baseUrl}/health/isReady`, (req, res, ctx) => res(ctx.status(200))),
    rest.get(`${baseUrl}/oppslag/soker?ytelse=endringsmelding-pleiepenger`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(søkerJson));
    }),
    rest.get(`${baseUrl}/innsyn/sak`, (req, res, ctx) => {
        return res(ctx.delay(250), ctx.status(200), ctx.json(sakJson));
    }),
    rest.get(`${baseUrl}/oppslag/arbeidsgiver`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(arbeidsgiverJson));
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
