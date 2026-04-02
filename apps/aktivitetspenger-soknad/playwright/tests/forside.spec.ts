import { expect, test } from '@playwright/test';
import { ScenarioType } from '../../mock/scenarios/types';

import { setScenario } from '../utils/scenario';
import { testAccessibility } from '../utils/testAccessibility';

test('laster appen og starter soknadsflyten', async ({ page }) => {
    await setScenario(page, ScenarioType.default);

    await page.goto('/');

    await expect(page.locator('main')).toBeVisible();
    await testAccessibility(page);

    await page.locator('input[type="checkbox"]').first().check();
    await page.locator('button[type="submit"]').first().click();

    await expect(page).toHaveURL(/\/soknad\/andre-ytelser/);
    await testAccessibility(page);
});
