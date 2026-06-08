import { Page } from '@playwright/test';

import { playwrightApiMockData } from '../mock-data/playwrightApiMockData';

export const setupMockRoutes = async (page: Page) => {
    await page.route('**/oppslag/soker', async (route) => {
        await route.fulfill({ status: 200, body: JSON.stringify(playwrightApiMockData.søkerMock) });
    });

    await page.route('**/oppslag/barn', async (route) => {
        await route.fulfill({ status: 200, body: JSON.stringify(playwrightApiMockData.barnMock) });
    });

    await page.route('**/oppslag/arbeidsgiver**', async (route) => {
        await route.fulfill({ status: 200, body: JSON.stringify(playwrightApiMockData.arbeidsgiver) });
    });

    await page.route('**/vedlegg', async (route) => {
        await route.fulfill({
            status: 200,
            headers: { Location: '/vedlegg/123', 'access-control-expose-headers': 'Location' },
        });
    });

    await page.route('**/mellomlagring/OMSORGSPENGER_UTBETALING_ARBEIDSTAKER', async (route) => {
        await route.fulfill({ status: 200, body: '{}' });
    });

    await page.route('**/innsending', async (route) => {
        await route.fulfill({ status: 200 });
    });

    await page.route('*', async (route) => {
        await route.fulfill({ status: 200 });
    });
};
