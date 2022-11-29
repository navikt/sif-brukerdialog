import { rest } from 'msw';

const søkerJson = require('../data/søker1/søker-mock.json');

const baseUrl = 'http://localhost:8099';

const handlers = [
    rest.get(`${baseUrl}/health/isAlive`, (req, res, ctx) => res(ctx.status(200))),
    rest.get(`${baseUrl}/health/isReady`, (req, res, ctx) => res(ctx.status(200))),
    rest.get(`${baseUrl}/soker`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(søkerJson));
    }),
];

export { handlers };
