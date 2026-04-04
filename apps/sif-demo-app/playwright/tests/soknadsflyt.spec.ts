import { expect, test } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

import { ScenarioType } from '../../mock/scenarios/types';
import { setScenario } from '../utils/scenario';

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.resolve(currentDir, '../files/test.pdf');

test('fyller ut søknaden med registrert barn og vedlegg', async ({ page }) => {
    await setScenario(page, ScenarioType.default);

    await page.goto('/');
    await page.locator('input[type="checkbox"]').check();
    await page.locator('button[type="submit"]').click();

    await expect(page.getByRole('heading', { name: 'Hvilket barn gjelder søknaden for?' })).toBeVisible();
    await page.getByText('Alfa Testesen').click();
    await page.locator('button[type="submit"]').click();

    await expect(page.getByRole('group', { name: 'Bor du i Trondheim' })).toBeVisible();
    await page.getByRole('group', { name: 'Bor du i Trondheim' }).getByLabel('Ja', { exact: true }).check();
    await page.getByRole('group', { name: 'Bor du utenfor Trondheim' }).getByLabel('Nei', { exact: true }).check();
    await page.locator('button[type="submit"]').click();

    await expect(page.getByText('Last opp vedlegg')).toBeVisible();
    await page.locator('input[type="file"]').setInputFiles(filePath);
    await expect(page.getByText('test.pdf')).toBeVisible();
    await page.locator('button[type="submit"]').click();

    await expect(page.getByRole('heading', { name: 'Om deg' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Barn' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Bosted' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Vedlegg' })).toBeVisible();
    await expect(page.getByText('Test Testesen')).toBeVisible();
    await expect(page.getByText('Alfa Testesen')).toBeVisible();
    await expect(page.getByText('test.pdf')).toBeVisible();

    await page
        .getByRole('checkbox', { name: 'Jeg bekrefter at opplysningene jeg har gitt er riktige.' })
        .check();
    await page.getByRole('button', { name: 'Send inn' }).click();

    await expect(page).toHaveURL(/\/kvittering$/);
    await expect(page.getByRole('heading', { name: 'Kvittering' })).toBeVisible();
    await expect(page.getByText('Søknaden din er sendt inn!')).toBeVisible();
});