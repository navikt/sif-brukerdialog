import { rest } from 'msw';

const BACKEND_BASE_URL = 'http://localhost:8099';

export const testHandlers = {
    isAlive: rest.get(`${BACKEND_BASE_URL}/health/isAlive`, (req, res, ctx) => res(ctx.status(200))),
    isReady: rest.get(`${BACKEND_BASE_URL}/health/isReady`, (req, res, ctx) => res(ctx.status(200))),
};
