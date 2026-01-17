import { expect, test } from '@playwright/test';

import { setNow } from '../../utils/setNow';
import { setupMockRoutes } from '../../utils/setupMockRoutes';
import { testAccessibility } from '../../utils/testAccessibility';

test('Søker har ikke tilgang', async ({ page }) => {
    await setNow(page);
    await setupMockRoutes(page);
    await page.route('**/oppslag/soker', async (route) => {
        await route.fulfill({ status: 451 });
    });
    await page.goto('http://localhost:8080/familie/sykdom-i-familien/soknad/pleiepenger/soknad/velkommen');
    await expect(page.getByRole('heading', { name: 'Ingen tilgang' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Her kan du laste ned papirsø' })).toBeVisible();
    await testAccessibility(page);
});
