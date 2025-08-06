import { Page } from '@playwright/test';
import { barnMock } from '../mock-data/barnMock';
import { søkerMock } from '../mock-data/søkerMock';

export const setupMockApi = async (page: Page, props?: { mellomlagring: any }) => {
    await page.route('**/oppslag/soker', async (route) => {
        await route.fulfill({ status: 200, body: JSON.stringify(søkerMock) });
    });
    await page.route('**/oppslag/barn**', async (route) => {
        await route.fulfill({ status: 200, body: JSON.stringify(barnMock) });
    });
    await page.route('**/innsending', async (route) => {
        await route.fulfill({ status: 200 });
    });
    await page.route('**/mellomlagring/OMSORGSDAGER_ALENEOMSORG', async (route, request) => {
        if (request.method() === 'GET') {
            await route.fulfill({ status: 200, body: JSON.stringify(props?.mellomlagring || {}) });
            return;
        }
        await route.fulfill({ status: 200, body: '{}' });
    });
    await page.route('*', async (route) => {
        console.log(route);
        await route.fulfill({ status: 200 });
    });
};
