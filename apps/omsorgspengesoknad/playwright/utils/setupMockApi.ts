import { Page } from '@playwright/test';
import { barnMock } from '../mock-data/barnMock';
import { søkerMock } from '../mock-data/søkerMock';

export const setupMockRoutes = async (page: Page, props?: { mellomlagring?: any; barnResponse: any }) => {
    await page.route('**/oppslag/soker', async (route) => {
        await route.fulfill({ status: 200, body: JSON.stringify(søkerMock) });
    });
    await page.route('**/valider/friteksfelt', async (route) => {
        await route.fulfill({ status: 200 });
    });
    await page.route('**/oppslag/barn**', async (route) => {
        await route.fulfill({ status: 200, body: JSON.stringify(props?.barnResponse || barnMock) });
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

    await page.route('*', async (route) => {
        await route.fulfill({ status: 200 });
    });
};
