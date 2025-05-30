import { BrowserContext, Page } from '@playwright/test';
import { playwrightApiMockData } from '../mock-data/playwrightApiMockData';
import { setupNavnoConsentCookieForPlaywrightTests } from '../../../../../packages/sif-common-core-ds/src/utils/navnoConsentCookieUtils';

export const setupMockRoutes = async (page: Page, context: BrowserContext, props?: { mellomlagring: any }) => {
    await setupNavnoConsentCookieForPlaywrightTests(context);
    await page.route('**hotjar**', async (route) => {
        await route.fulfill({ status: 200 });
    });
    await page.route('https://login.nav.no/**', async (route) => {
        await route.fulfill({ status: 200 });
    });
    await page.route('https://www.nav.no/person/nav-dekoratoren-api/auth', async (route) => {
        await route.fulfill({ status: 200 });
    });
    await page.route('**/mellomlagring/PLEIEPENGER_LIVETS_SLUTTFASE', async (route, request) => {
        if (request.method() === 'GET') {
            await route.fulfill({ status: 200, body: JSON.stringify(props?.mellomlagring || {}) });
            return;
        }
        await route.fulfill({ status: 200, body: '{}' });
    });
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
    await page.route('**/innsending', async (route) => {
        await route.fulfill({ status: 200 });
    });
};
