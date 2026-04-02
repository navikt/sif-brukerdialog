import { expect, test } from '@playwright/test';
import { ScenarioType } from '../../mock/scenarios/types';

import { setScenario } from '../utils/scenario';
import { testAccessibility } from '../utils/testAccessibility';

test('kan fylle ut første steg og gå videre', async ({ page }) => {
    await setScenario(page, ScenarioType.default);

    await page.goto('/');
    await testAccessibility(page);

    await page.locator('input[type="checkbox"]').first().check();
    await page.locator('button[type="submit"]').first().click();
    await testAccessibility(page);

    await page.locator('input[name="harAndreYtelser"]').last().check();
    await page.locator('button[type="submit"]').first().click();

    await expect(page).toHaveURL(/\/soknad\/kontonummer/);
    await testAccessibility(page);
});
