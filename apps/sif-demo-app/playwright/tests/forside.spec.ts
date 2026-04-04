import { expect, test } from '@playwright/test';

import { ScenarioType } from '../../mock/scenarios/types';
import { setScenario } from '../utils/scenario';
import { testAccessibility } from '../utils/testAccessibility';

test('viser forside for demo-appen', async ({ page }) => {
    await setScenario(page, ScenarioType.default);

    await page.goto('/');

    await expect(page.getByRole('heading', { name: 'Søknad om YTELSE' })).toBeVisible();
    await expect(page.locator('input[type="checkbox"]')).toHaveCount(1);
    await expect(page.locator('button[type="submit"]')).toBeVisible();
    await expect(page.getByText('Det er viktig at du gir oss riktige opplysninger').first()).toBeVisible();
    await testAccessibility(page);
});

test('viser tomtilstand i barnesteget når bruker ikke har registrerte barn', async ({ page }) => {
    await setScenario(page, ScenarioType.ingenRegistrerteBarn);

    await page.goto('/');
    await page.locator('input[type="checkbox"]').check();
    await page.locator('button[type="submit"]').click();

    await expect(page.getByRole('heading', { name: 'Om barnet' })).toBeVisible();
    await expect(page.getByText('Det er ingen barn registrert på deg i Folkeregisteret.')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Neste steg' })).toBeVisible();
    await testAccessibility(page);
});
