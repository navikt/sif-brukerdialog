import { expect, test } from '@playwright/test';
import { gåTilDeltakerSide } from '../utils/deltakelseHandlingerUtils';

// nyligRegistrert-scenariet: AKTIV NYBEGYNNER
const DELTAKER_ID = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890';

test.beforeEach(async ({ page }) => {
    await gåTilDeltakerSide(page, DELTAKER_ID, 'AKTIV NYBEGYNNER');
});

test('Hent opp registrert deltaker', async ({ page }) => {
    await expect(page.getByText('35879Kopier')).toBeVisible();
    await expect(page.getByText('(25 år)')).toBeVisible();
    await expect(page.getByText('Startdato:', { exact: true })).toBeVisible();
    await page.getByRole('button', { name: 'Lukk deltaker' }).click();
    await expect(page.getByText('Finn deltaker')).toBeVisible();
});

test('Endre startdato', async ({ page }) => {
    await page.getByRole('button', { name: 'Endre startdato' }).click();
    await page.getByRole('button', { name: 'Åpne datovelger' }).click();
    // Velg dag 4 i måneden som vises (04.11.2025 gitt demoMockDate=2025-12-10)
    await page.getByRole('button', { name: 'tirsdag 4' }).click();
    await page.getByRole('checkbox', { name: 'Jeg bekrefter' }).check();
    await page.getByTestId('typedFormikForm-submitButton').click();
    await page.getByRole('button', { name: 'Ok, lukk' }).click();
    // Vent på at den nye startdatoen er synlig i visningen
    await expect(page.getByText('04.11.2025')).toBeVisible();
});
