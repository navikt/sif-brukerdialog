import { rest } from 'msw';

const søkerJson = require('../data/søker1/søker-mock.json');
const arbeidsgiverJson = require('../data/søker1/arbeidsgivere-mock.json');

const baseUrl = 'http://localhost:8089';

const handlers = [
    rest.get(`${baseUrl}/health/isAlive`, (req, res, ctx) => res(ctx.status(200))),
    rest.get(`${baseUrl}/health/isReady`, (req, res, ctx) => res(ctx.status(200))),
    rest.get(`${baseUrl}/soker`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(søkerJson));
    }),
    rest.get(`${baseUrl}/arbeidsgiver`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(arbeidsgiverJson));
    }),
];

export { handlers };
