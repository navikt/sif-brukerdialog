import { BrowserContext, Page } from '@playwright/test';
import { setupNavnoConsentCookieForPlaywrightTests } from '../../../../../packages/sif-common-core-ds/src/utils/navnoConsentCookieUtils';
import { barnMock } from '../mock-data/barnMock';
import { søkerMock } from '../mock-data/søkerMock';

export const setupMockRoutes = async (page: Page, context: BrowserContext, props?: { mellomlagring: any }) => {
    await setupNavnoConsentCookieForPlaywrightTests(context);
    await page.route('**/vedlegg', async (route) => {
        await route.fulfill({
            status: 200,
            headers: { Location: '/vedlegg/123', 'access-control-expose-headers': 'Location' },
        });
    });
    await page.route('**/mellomlagring/OMSORGSPENGER_UTVIDET_RETT', async (route, request) => {
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
    await page.route('**/har-gyldig-vedtak', async (route) => {
        await route.fulfill({
            status: 200,
            body: JSON.stringify({
                harInnvilgedeBehandlinger: false,
            }),
        });
    });
    await page.route('*', async (route) => {
        await route.fulfill({ status: 200 });
    });
};
