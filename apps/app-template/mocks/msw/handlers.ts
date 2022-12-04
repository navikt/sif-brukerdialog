import { rest } from 'msw';

const søkerJson = require('../data/søker1/søker-mock.json');

const baseUrl = 'http://localhost:8089';

const MellomlagringStorageKey = 'app_template_mellomlaging';

const handlers = [
    rest.get(`${baseUrl}/health/isAlive`, (req, res, ctx) => res(ctx.status(200))),
    rest.get(`${baseUrl}/health/isReady`, (req, res, ctx) => res(ctx.status(200))),
    rest.get(`${baseUrl}/soker`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(søkerJson));
    }),
    rest.get(`${baseUrl}/mellomlagring`, (req, res, ctx) => {
        const data = localStorage.getItem(MellomlagringStorageKey);
        const jsonData = JSON.parse(data || '{}');
        return res(ctx.status(200), ctx.json(jsonData));
    }),
    rest.post(`${baseUrl}/mellomlagring`, async (req, res, ctx) => {
        const data = await req.text();
        localStorage.setItem(MellomlagringStorageKey, data);
        return res(ctx.status(200));
    }),
    rest.put(`${baseUrl}/mellomlagring`, async (req, res, ctx) => {
        const data = await req.text();
        localStorage.setItem(MellomlagringStorageKey, data);
        return res(ctx.status(200));
    }),
    rest.delete(`${baseUrl}/mellomlagring`, (req, res, ctx) => {
        localStorage.setItem(MellomlagringStorageKey, '');
        return res(ctx.status(200));
    }),
];

export { handlers };
