import { Page } from '@playwright/test';
import { playwrightApiMockData } from '../mock-data/playwrightApiMockData';

export const setupMockRoutes = async (page: Page, props?: { mellomlagring: any }) => {
    await page.route('**/oppslag/soker', async (route) => {
        await route.fulfill({ status: 200, body: JSON.stringify(playwrightApiMockData.søkerMock) });
    });
    await page.route('**/oppslag/arbeidsgiver**', async (route) => {
        await route.fulfill({ status: 200, body: JSON.stringify(playwrightApiMockData.arbeidsgiverMock) });
    });
    await page.route('**/vedlegg', async (route) => {
        await route.fulfill({
            status: 200,
            headers: { Location: '/vedlegg/123', 'access-control-expose-headers': 'Location' },
        });
    });
    await page.route('**/mellomlagring/PLEIEPENGER_LIVETS_SLUTTFASE', async (route, request) => {
        if (request.method() === 'GET') {
            await route.fulfill({ status: 200, body: JSON.stringify(props?.mellomlagring || {}) });
            return;
        }
        await route.fulfill({ status: 200, body: '{}' });
    });
    await page.route('**/innsending', async (route) => {
        await route.fulfill({ status: 200 });
    });
    await page.route('*', async (route) => {
        console.log(route);
        await route.fulfill({ status: 200 });
    });
};
