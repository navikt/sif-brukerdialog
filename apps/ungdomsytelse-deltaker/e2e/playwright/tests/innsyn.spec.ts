import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { registerMockRoutes } from '../utils/registerMockRoutes';
import { setNow } from '../utils/setNow';
import { memoryStore } from '../../../mock/state/memoryStore';
import { ScenarioType } from '../../../mock/scenarios/types';

test.beforeEach(async ({ page, context }) => {
    await setNow(page);
    await registerMockRoutes(page, context);
});

const testAccessibility = async (page) => {
    const accessibilityScanResults = await new AxeBuilder({ page }).disableRules('color-contrast').analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
};

test('Innsyn - har søkt', async ({ page }) => {
    memoryStore.setScenario(ScenarioType.harSøkt);

    await page.goto(`./`);

    // 1. Accessibility test before starting the application
    await testAccessibility(page);
});
