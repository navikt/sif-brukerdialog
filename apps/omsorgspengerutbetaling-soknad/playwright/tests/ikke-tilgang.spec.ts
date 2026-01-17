import { expect, test } from '@playwright/test';

import { testAccessibility } from '../utils/testAccessibility';
import { startUrl } from '../utils/utfyllingUtils';

test('Søker har ikke tilgang', async ({ page }) => {
    await page.route('**/mellomlagring/OMSORGSPENGER_UTBETALING_SNF', async (route) => {
        await route.fulfill({ status: 200, body: '{}' });
    });
    await page.route('**/oppslag/soker', async (route) => {
        await route.fulfill({ status: 451 });
    });
    await page.goto(startUrl);
    await expect(page.getByRole('heading', { name: 'Ingen tilgang' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Her kan du laste ned papirsø' })).toBeVisible();
    await testAccessibility(page);
});
