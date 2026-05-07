import { expect, test } from '@playwright/test';
import { setNow } from '../utils/setNow';

const gåTilDeltakerSide = async (page: any) => {
    await page.goto(`./deltaker/a1b2c3d4-e5f6-7890-abcd-ef1234567890`);
    await expect(page.getByRole('heading', { name: 'AKTIV NYBEGYNNER' })).toBeVisible();
};

test.beforeEach(async ({ page }) => {
    await setNow(page);
    await gåTilDeltakerSide(page);
});

test('Hent opp registrert deltaker', async ({ page }) => {
    await page.getByRole('heading', { name: 'AKTIV NYBEGYNNER' }).click();
    await page.getByText('98392Kopier').click();
    await page.getByText('(26 år)').click();
    await page.getByText('Startdato:mandag 10.03.2025').click();
    await page.getByRole('button', { name: 'Lukk deltaker' }).click();
});

test('Endre startdato', async ({ page }) => {
    await page.getByRole('button', { name: 'Endre startdato' }).click();
    await page.getByRole('button', { name: 'Åpne datovelger' }).click();
    await page.getByRole('button', { name: 'tirsdag 4' }).click();
    await page.getByRole('checkbox', { name: 'Jeg bekrefter' }).check();
    await page.getByTestId('typedFormikForm-submitButton').click();
    await page.getByRole('button', { name: 'Ok, lukk' }).click();
    await expect(page.getByText('Startdato:tirsdag 04.11.2025')).toBeVisible();
});
