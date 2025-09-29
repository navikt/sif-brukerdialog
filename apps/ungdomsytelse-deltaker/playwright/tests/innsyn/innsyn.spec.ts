import { expect, test } from '@playwright/test';

import { ScenarioType } from '../../../mock/scenarios/types';
import { memoryStore } from '../../../mock/state/memoryStore';
import { registerMockRoutes } from '../../utils/registerMockRoutes';
import { setNow } from '../../utils/setNow';
import { testAccessibility } from '../../utils/testAccessibility';

test.beforeEach(async ({ page, context }) => {
    await setNow(page);
    await registerMockRoutes(page, context);
});

test('Innsyn - har søkt', async ({ page }) => {
    memoryStore.setScenario(ScenarioType.harSøkt);

    await page.goto(`./`);
    await expect(page.getByRole('heading', { name: 'Din ungdomsprogramytelse' })).toBeVisible();

    // 1. Accessibility test before starting the application
    await testAccessibility(page);
});
