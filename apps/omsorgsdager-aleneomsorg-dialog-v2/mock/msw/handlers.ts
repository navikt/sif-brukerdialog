import { standardProfil } from '@sif/api/mock-data';
import { http, HttpResponse } from 'msw';

const storageKey = 'OMSORGSDAGER_ALENEOMSORG_V2_MOCK_MELLOMLAGRING';

const getMellomlagring = () => {
    const data = localStorage.getItem(storageKey);
    return data ? JSON.parse(data) : {};
};

export const handlers = [
    http.get('**/oppslag/soker', () => HttpResponse.json(standardProfil.søker)),
    http.get('**/oppslag/barn', () => HttpResponse.json(standardProfil.barn)),
    http.get('**/mellomlagring/:ytelse', () => HttpResponse.json(getMellomlagring())),
    http.post('**/mellomlagring/:ytelse', async ({ request }) => {
        localStorage.setItem(storageKey, JSON.stringify(await request.json()));
        return HttpResponse.json({});
    }),
    http.put('**/mellomlagring/:ytelse', async ({ request }) => {
        localStorage.setItem(storageKey, JSON.stringify(await request.json()));
        return HttpResponse.json({});
    }),
    http.delete('**/mellomlagring/:ytelse', () => {
        localStorage.removeItem(storageKey);
        return HttpResponse.json({});
    }),
    http.post('**/omsorgsdager-aleneomsorg/innsending', () => HttpResponse.json({}, { status: 202 })),
    http.get('**/dekoratoren/**', () => new HttpResponse(null, { status: 200 })),
];
