import { expect, test } from '@playwright/test';

import { ScenarioType } from '../../mock/scenarios/types';
import { setScenario } from '../utils/scenario';

test('viser forside for søknaden', async ({ page }) => {
    await setScenario(page, ScenarioType.default);

    await page.goto('/');

    await expect(
        page.getByRole('heading', {
            name: 'Søknad om ekstra omsorgsdager for barn som har kronisk/langvarig sykdom eller funksjonshemning',
        }),
    ).toBeVisible();
    await expect(
        page.getByText(
            'Velkommen til søknad om ekstra omsorgsdager for barn som har kronisk/langvarig sykdom eller funksjonshemning.',
        ),
    ).toBeVisible();
    await expect(page.locator('input[type="checkbox"]')).toHaveCount(1);
    await expect(page.locator('button[type="submit"]')).toBeVisible();
});
