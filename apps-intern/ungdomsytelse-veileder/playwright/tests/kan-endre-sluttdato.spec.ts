import { expect, test } from '@playwright/test';
import { åpneDeltakelseHandlingerPanel, gåTilDeltakerSide } from '../utils/deltakelseHandlingerUtils';

// kanEndreSluttdato-scenariet: UTMELDT AKTIV — søkt, fremtidig sluttdato
const DELTAKER_ID = 'f9cdfa5f-f255-4b7a-9a96-4077be9aa8dd';

test.beforeEach(async ({ page }) => {
    await gåTilDeltakerSide(page, DELTAKER_ID, 'UTMELDT AKTIV');
});

test('kanEndreSluttdato: viser riktige handlinger', async ({ page }) => {
    await åpneDeltakelseHandlingerPanel(page);
    const kanEndreSluttdatoRad = page.locator('text=kanEndreSluttdato').locator('..');
    await expect(kanEndreSluttdatoRad.getByText('true')).toBeVisible();
    const kanMeldesUtRad = page.locator('text=kanMeldesUt').locator('..');
    await expect(kanMeldesUtRad.getByText('false')).toBeVisible();
    const kanForlengeRad = page.locator('text=kanForlengePeriode').locator('..');
    await expect(kanForlengeRad.getByText('false')).toBeVisible();
});

test('kanEndreSluttdato: kan endre sluttdato', async ({ page }) => {
    await page.getByRole('button', { name: 'Endre sluttdato' }).click();
    await page.getByRole('button', { name: 'Åpne datovelger' }).click();
    await page.getByRole('button', { name: 'mandag 15' }).click();
    await page.getByRole('checkbox', { name: 'Jeg bekrefter' }).check();
    await page.getByTestId('typedFormikForm-submitButton').click();
    await page.getByRole('button', { name: 'Ok, lukk' }).click();
    await expect(page.getByText('Sluttdato:', { exact: true })).toBeVisible();
    await expect(page.getByText('Mandag 15.')).toBeVisible();
});
