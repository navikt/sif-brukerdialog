import { rest } from 'msw';

const søkerJson = require('../data/soker1/søker-mock.json');
const sakJson = require('../data/soker1/sak-mock.json');
const arbeidsgiverJson = require('../data/soker1/arbeidsgiver-mock.json');

const baseUrl = 'http://localhost:8099';

const handlers = [
    rest.get(`${baseUrl}/health/isAlive`, (req, res, ctx) => res(ctx.status(200))),
    rest.get(`${baseUrl}/health/isReady`, (req, res, ctx) => res(ctx.status(200))),
    rest.get(`${baseUrl}/soker`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(søkerJson));
    }),
    rest.get(`${baseUrl}/innsyn/sak`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(sakJson));
    }),
    rest.get(`${baseUrl}/arbeidsgiver`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(arbeidsgiverJson));
    }),
    rest.get(`${baseUrl}/endringsmelding/mellomlagring`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({}));
    }),
    rest.post(`${baseUrl}/endringsmelding/mellomlagring`, (req, res, ctx) => {
        return res(ctx.status(200));
    }),
    rest.put(`${baseUrl}/endringsmelding/mellomlagring`, (req, res, ctx) => {
        return res(ctx.status(200));
    }),
    rest.delete(`${baseUrl}/endringsmelding/mellomlagring`, (req, res, ctx) => {
        return res(ctx.status(200));
    }),
];

export { handlers };
