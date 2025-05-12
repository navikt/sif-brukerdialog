import { test } from '@playwright/test';
import { setNow } from '../utils/setNow';
import { setupMockRoutes } from '../utils/setupMockRoutes';

test.beforeEach(async ({ page, context }) => {
    await setNow(page);
    await setupMockRoutes(page, context);
});

test('Fyll ut søknad og kontroller oppsummering', async ({ page }) => {
    await page.goto(`./`);
});
