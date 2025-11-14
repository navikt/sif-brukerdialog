import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

import { setupMockRoutes } from '../utils/setup-mock-routes';

test.beforeEach(async ({ page }) => {
    await setupMockRoutes(page);
});

test('Test innhold, funksjonalitet og wcag', async ({ page }) => {
    await page.goto('http://localhost:8080/innsyn');
    await expect(page.getByRole('heading', { level: 1, name: 'Din pleiepengesak for sykt barn' })).toBeVisible();

    const accessibilityScanResults = await new AxeBuilder({ page })
        .disableRules(['color-contrast'])
        .include('#__next')
        .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
});
