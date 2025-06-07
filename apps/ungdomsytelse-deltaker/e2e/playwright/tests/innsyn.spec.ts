import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { setNow } from '../utils/setNow';
import { setupMockRoutes } from '../utils/setupMockRoutes';

test.beforeEach(async ({ page, context }) => {
    await setNow(page);
    await setupMockRoutes(page, context);
});

const testAccessibility = async (page) => {
    const accessibilityScanResults = await new AxeBuilder({ page }).disableRules('color-contrast').analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
};

test('Innsyn', async ({ page }) => {
    await page.goto(`./`);

    // 1. Accessibility test before starting the application
    await testAccessibility(page);
});
