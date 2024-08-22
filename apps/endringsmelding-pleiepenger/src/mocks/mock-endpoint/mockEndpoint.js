// src/__test__/mock-endpoint.ts
import { setupWorker } from 'msw/browser';

const mockWorker = setupWorker();
mockWorker.start();

const ENDPOINT_MOCKS_KEY = `__ENDPOINT_MOCKS__`;

export const mockEndpoint = (endpoint, { body, httpVerb = `get`, status = 200 }) => {
    // eslint-disable-next-line no-undef
    mockWorker.use(rest[httpVerb](endpoint, (req, res, ctx) => res(ctx.status(status), ctx.json(body))));
};

export const activateStoredMocks = () => {
    const mocksRaw = localStorage.getItem(ENDPOINT_MOCKS_KEY);
    const mocks = mocksRaw ? JSON.parse(mocksRaw) : [];
    mocks.forEach((mock) => mockEndpoint(mock.endpoint, mock.options));
};
