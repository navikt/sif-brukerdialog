import { Page } from '@playwright/test';
import { e2eMockData } from '../../mock-data/';

export const setupMockRoutes = async (page: Page, props?: { mellomlagring: any }) => {
    await page.route('**hotjar**', async (route) => {
        await route.fulfill({ status: 200 });
    });
    await page.route('https://login.nav.no/**', async (route) => {
        await route.fulfill({ status: 200 });
    });
    await page.route('https://amplitude.nav.no/collect-auto', async (route) => {
        await route.fulfill({ status: 200 });
    });
    await page.route('**collect**', async (route) => {
        await route.fulfill({ status: 200 });
    });
    await page.route('https://www.nav.no/person/nav-dekoratoren-api/auth', async (route) => {
        await route.fulfill({ status: 200 });
    });
    await page.route('https://www.nav.no/person/nav-dekoratoren-api/auth', async (route) => {
        await route.fulfill({ status: 200 });
    });
    await page.route('**/mellomlagring/PLEIEPENGER_SYKT_BARN', async (route, request) => {
        if (request.method() === 'GET') {
            await route.fulfill({ status: 200, body: JSON.stringify(props?.mellomlagring || {}) });
            return;
        }
        await route.fulfill({ status: 200, body: '{}' });
    });

    await page.route('**/oppslag/soker', async (route) => {
        await route.fulfill({ status: 200, body: JSON.stringify(e2eMockData.søker) });
    });
    await page.route('**/oppslag/barn', async (route) => {
        await route.fulfill({ status: 200, body: JSON.stringify(e2eMockData.barn) });
    });
    await page.route('**/oppslag/arbeidsgiver*', async (route) => {
        await route.fulfill({ status: 200, body: JSON.stringify(e2eMockData.arbeidsgiver) });
    });

    await page.route('**/pleiepenger-sykt-barn/innsending', async (route, request) => {
        if (request.method() === 'POST') {
            await route.fulfill({ status: 200 });
            return;
        }
        await route.fulfill({ status: 200, body: '{}' });
    });
};
