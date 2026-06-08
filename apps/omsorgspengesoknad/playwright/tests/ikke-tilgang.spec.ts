import { expect, test } from '@playwright/test';

import { setupMockRoutes } from '../utils/setupMockRoutes';
import { testAccessibility } from '../utils/testAccessibility';
import { rootUrl } from '../utils/routeUtils';

test('Søker har ikke tilgang', async ({ page }) => {
    await setupMockRoutes(page);
    await page.route('**/oppslag/soker', async (route) => {
        await route.fulfill({ status: 451 });
    });
    await page.goto(rootUrl);
    await expect(page.getByRole('heading', { name: 'Ingen tilgang' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Her kan du laste ned papirsø' })).not.toBeVisible();
    await testAccessibility(page);
});
