import { Page } from '@playwright/test';
import { barnMock } from '../mock-data/barnMock';
import { søkerMock } from '../mock-data/søkerMock';

export const setupMockApi = async (page: Page, props?: { mellomlagring: any }) => {
    await page.route('**hotjar**', async (route) => {
        await route.fulfill({ status: 200 });
    });
    await page.route('https://login.nav.no/**', async (route) => {
        await route.fulfill({ status: 200 });
    });
    await page.route('https://www.nav.no/person/nav-dekoratoren-api/auth', async (route) => {
        await route.fulfill({ status: 200 });
    });
    await page.route('**/mellomlagring/OMSORGSPENGER_MIDLERTIDIG_ALENE', async (route, request) => {
        if (request.method() === 'GET') {
            await route.fulfill({ status: 200, body: JSON.stringify(props?.mellomlagring || {}) });
            return;
        }
        await route.fulfill({ status: 200, body: '{}' });
    });
    await page.route('**/oppslag/soker', async (route) => {
        await route.fulfill({ status: 200, body: JSON.stringify(søkerMock) });
    });
    await page.route('**/oppslag/barn**', async (route) => {
        await route.fulfill({ status: 200, body: JSON.stringify(barnMock) });
    });
    await page.route('**/innsending', async (route) => {
        await route.fulfill({ status: 200 });
    });
};
