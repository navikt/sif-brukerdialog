import { rest } from 'msw';

const søkerJson = require('../data/soker1/søker-mock.json');
const sakJson = require('../data/soker1/sak-mock.json');
const arbeidsgiverJson = require('../data/soker1/arbeidsgiver-mock.json');

// const søkerJson = require('../data/soker2/søker-mock.json');
// const sakJson = require('../data/soker2/sak-mock.json');
// const arbeidsgiverJson = require('../data/soker2/arbeidsgiver-mock.json');

// const søkerJson = require('../data/soker4/søker-mock.json');
// const sakJson = require('../data/soker4/sak-mock.json');
// const arbeidsgiverJson = require('../data/soker4/arbeidsgiver-mock.json');

// const søkerJson = require('../data/soker5-ukedag-ikke-søkt-for/søker-mock.json');
// const sakJson = require('../data/soker5-ukedag-ikke-søkt-for/sak-mock.json');
// const arbeidsgiverJson = require('../data/soker5-ukedag-ikke-søkt-for/arbeidsgiver-mock.json');

// const søkerJson = require('../data/soker7-ugyldig-sak/søker-mock.json');
// const sakJson = require('../data/soker7-ugyldig-sak/sak-mock.json');
// const arbeidsgiverJson = require('../data/soker7-ugyldig-sak/arbeidsgiver-mock.json');

const baseUrl = '*';

const MellomlagringStorageKey = 'mellomlagring-endring-psb';

const handlers = [
    rest.get(`${baseUrl}/health/isAlive`, (req, res, ctx) => res(ctx.status(200))),
    rest.get(`${baseUrl}/health/isReady`, (req, res, ctx) => res(ctx.status(200))),
    rest.get(`${baseUrl}/oppslag/soker`, (req, res, ctx) => {
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
