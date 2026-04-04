import { expect, test } from '@playwright/test';

import { ScenarioType } from '../../mock/scenarios/types';
import { setScenario } from '../utils/scenario';

test('gjenopptar barnesteg fra mellomlagring etter reload', async ({ page }) => {
    await setScenario(page, ScenarioType.default);

    await page.goto('/');
    await page.locator('input[type="checkbox"]').check();
    await page.locator('button[type="submit"]').click();

    const barnRadio = page.getByRole('radio', { name: /Alfa Testesen/ });
    await expect(barnRadio).toBeVisible();
    await barnRadio.check();
    await page.locator('button[type="submit"]').click();

    await expect(page.getByRole('group', { name: 'Bor du i Trondheim' })).toBeVisible();

    await page.goto('/');

    await expect(page.getByRole('heading', { name: 'Hvilket barn gjelder søknaden for?' })).toBeVisible();
    await expect(page).toHaveURL(/\/soknad\/barn$/);
    await expect(barnRadio).toBeChecked();
});
