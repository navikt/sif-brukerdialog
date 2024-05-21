import { test } from '@playwright/test';
import { setNow } from '../../utils/setNow';
import { routeUtils } from '../../utils/routeUtils';

test.beforeEach(async ({ page }) => {
    await setNow(page);
});

test('Velkommen side', async ({ page }) => {
    await routeUtils.setupMockRoutes(page);
    await page.goto('http://localhost:8080/familie/sykdom-i-familien/soknad/pleiepenger/soknad/velkommen');
    await page.getByLabel('Jeg bekrefter at jeg har').check();
});
