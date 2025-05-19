import { setNow } from '../utils/setNow';
import { test, expect } from '@playwright/test';

const gåTilDeltakerSide = async (page: any) => {
    await page.goto(`./deltaker/699b9f97-b0d7-4b78-9b8e-8758feb9e0fd`);
    await expect(page.getByRole('heading', { name: 'PRESENTABEL HOFTE' })).toBeVisible();
};

test.beforeEach(async ({ page }) => {
    await setNow(page);
    await gåTilDeltakerSide(page);
});

test('Hent opp registrert deltaker', async ({ page }) => {
    await page.getByRole('heading', { name: 'PRESENTABEL HOFTE' }).click();
    await page.getByText('98392Kopier').click();
    await page.getByText('(26 år)').click();
    await page.getByText('Startdato:onsdag 01.01.').click();
    await page.getByText('Sluttdato:-Registrer sluttdato').click();
    await page.getByRole('button', { name: 'Lukk deltaker' }).click();
});

test('Endre startdato', async ({ page }) => {
    await page.getByRole('button', { name: 'Endre startdato' }).click();
    await page.getByRole('button', { name: 'Åpne datovelger' }).click();
    await page.getByRole('button', { name: 'mandag 17' }).click();
    await page.getByRole('radio', { name: 'Ja' }).check();
    await page.getByRole('checkbox', { name: 'Jeg bekrefter' }).check();
    await page.getByTestId('typedFormikForm-submitButton').click();
    await page.getByRole('button', { name: 'Ok, lukk' }).click();
    await expect(page.getByText('Startdato:mandag 17.02.')).toBeVisible();
});

test('Registrere sluttdato', async ({ page }) => {
    await page.getByRole('button', { name: 'Registrer sluttdato' }).click();
    await page.getByRole('button', { name: 'Åpne datovelger' }).click();
    await page.getByRole('button', { name: 'fredag 16' }).click();
    await page.getByRole('radio', { name: 'Ja' }).check();
    await page.getByRole('checkbox', { name: 'Jeg bekrefter' }).check();
    await page.getByTestId('typedFormikForm-submitButton').click();
    await page.getByRole('button', { name: 'Ok, lukk' }).click();
    await expect(page.getByText('Sluttdato:fredag 16.05.')).toBeVisible();
});
