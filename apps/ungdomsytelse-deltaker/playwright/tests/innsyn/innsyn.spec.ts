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
    memoryStore.setScenario(ScenarioType.søknadSendt);

    await page.goto(`./ungdomsprogrammet/ytelsen`);
    await expect(page.getByRole('heading', { name: 'Din ungdomsprogramytelse' })).toBeVisible();

    // Accessibility test
    await testAccessibility(page);
});

test('Innsyn - opphørt deltakelse', async ({ page }) => {
    memoryStore.setScenario(ScenarioType.opphørt);

    await page.goto(`./ungdomsprogrammet/ytelsen`);
    await expect(page.getByRole('heading', { name: 'Din ungdomsprogramytelse' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Deltakelsen er opphørt' })).toBeVisible();
});

test('Innsyn - ikke startet deltakelse', async ({ page }) => {
    memoryStore.setScenario(ScenarioType.ikkeStartet);

    await page.goto(`./ungdomsprogrammet/ytelsen`);
    await expect(page.getByRole('heading', { name: 'Din ungdomsprogramytelse' })).toBeVisible();
    await expect(page.getByText('Du ble meldt inn i ungdomsprogrammet')).toBeVisible();
    await expect(page.getByText('På denne siden får du')).toBeVisible();
});

test('Innsyn - avsluttet deltakelse', async ({ page }) => {
    memoryStore.setScenario(ScenarioType.avsluttet);

    await page.goto(`./ungdomsprogrammet/ytelsen`);
    await expect(page.getByRole('heading', { name: 'Din ungdomsprogramytelse' })).toBeVisible();
    await expect(page.getByText('Du var i ungdomsprogrammet')).toBeVisible();
});
