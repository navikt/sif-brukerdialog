import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

import { ScenarioType } from '../../../mock/scenarios/types';
import { memoryStore } from '../../../mock/state/memoryStore';
import { registerMockRoutes } from '../../utils/registerMockRoutes';
import { setNow } from '../../utils/setNow';

test.beforeEach(async ({ page, context }) => {
    await setNow(page);
    await registerMockRoutes(page, context);
});

const testAccessibility = async (page) => {
    const accessibilityScanResults = await new AxeBuilder({ page }).disableRules('color-contrast').analyze();
    await expect(accessibilityScanResults.violations).toEqual([]);
};

test('Innsyn - har søkt', async ({ page }) => {
    memoryStore.setScenario(ScenarioType.harSøkt);

    await page.goto(`./`);
    await expect(page.getByRole('heading', { name: 'Din ungdomsprogramytelse' })).toBeVisible();

    // 1. Accessibility test before starting the application
    await testAccessibility(page);
});
