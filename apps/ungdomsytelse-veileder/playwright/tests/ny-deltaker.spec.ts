import { setNow } from '../utils/setNow';
import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await setNow(page);
    await page.goto(`./`);
});

test('Søk opp og legg til ny deltaker', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Fødselsnummer/d-nummer:' }).fill('56857102105');
    await page.getByRole('button', { name: 'Søk' }).click();

    await expect(page.getByText('TØFFEL, GLORETE')).toBeVisible();
    await expect(page.getByText('Ikke registrert som deltaker')).toBeVisible();

    await page.getByText('Registrer som ny deltaker').click();
    await page.getByRole('radio', { name: 'Ja' }).check();
    await page.getByRole('button', { name: 'Åpne datovelger' }).click();
    await page.getByRole('button', { name: 'torsdag 29' }).click();
    await page.locator('label').filter({ hasText: 'Bekreft deltakelse' }).click();
    await page.getByRole('checkbox', { name: 'Bekreft deltakelse' }).uncheck();
    await page.getByRole('button', { name: 'Registrer' }).click();
    await page.getByText('Du må bekrefte deltakelsen').click();
    await page.getByRole('checkbox', { name: 'Bekreft deltakelse' }).check();
    await page.getByRole('button', { name: 'Registrer' }).click();

    await expect(page.getByText('Søknad om ungdomsprogramytelse er')).toBeVisible();
    await expect(page.getByRole('definition').filter({ hasText: 'GLORETE TØFFEL' })).toBeVisible();
    await expect(page.getByText('02105Kopier')).toBeVisible();
    await expect(page.getByText('(26 år)')).toBeVisible();
    await expect(page.getByText('Startdato:torsdag 29.05.')).toBeVisible();
    await expect(page.getByText('Sluttdato:-Registrer sluttdato')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Slett deltaker' })).toBeVisible();
    await page.getByRole('button', { name: 'Lukk deltaker' }).click();
    await expect(page.getByText('Finn deltaker')).toBeVisible();
});
