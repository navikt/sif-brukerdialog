import { rest } from 'msw';

const søkerJson = require('../data/soker2/søker-mock.json');
const sakJson = require('../data/soker2/sak-mock.json');
const arbeidsgiverJson = require('../data/soker2/arbeidsgiver-mock.json');

const baseUrl = 'http://localhost:8099';

const MellomlagringStorageKey = 'mellomlagring-endring-psb';

const handlers = [
    rest.get(`${baseUrl}/health/isAlive`, (req, res, ctx) => res(ctx.status(200))),
    rest.get(`${baseUrl}/health/isReady`, (req, res, ctx) => res(ctx.status(200))),
    rest.get(`${baseUrl}/soker`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(søkerJson));
    }),
    rest.get(`${baseUrl}/innsyn/sak`, (req, res, ctx) => {
        return res(ctx.delay(250), ctx.status(200), ctx.json(sakJson));
    }),
    rest.get(`${baseUrl}/arbeidsgiver`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(arbeidsgiverJson));
    }),
    rest.get(`${baseUrl}/endringsmelding/mellomlagring`, (req, res, ctx) => {
        const data = localStorage.getItem(MellomlagringStorageKey);
        const jsonData = JSON.parse(data || '{}');
        return res(ctx.status(200), ctx.json(jsonData));
    }),
    rest.post(`${baseUrl}/endringsmelding/mellomlagring`, async (req, res, ctx) => {
        const data = await req.text();
        localStorage.setItem(MellomlagringStorageKey, data);
        return res(ctx.status(200));
    }),
    rest.put(`${baseUrl}/endringsmelding/mellomlagring`, async (req, res, ctx) => {
        const data = await req.text();
        localStorage.setItem(MellomlagringStorageKey, data);
        return res(ctx.status(200));
    }),
    rest.delete(`${baseUrl}/endringsmelding/mellomlagring`, (req, res, ctx) => {
        localStorage.setItem(MellomlagringStorageKey, '');
        return res(ctx.status(200));
    }),
    rest.post(`${baseUrl}/endringsmelding`, (req, res, ctx) => {
        return res(ctx.status(200));
    }),
];

export { handlers };
