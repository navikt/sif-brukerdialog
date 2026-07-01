import { expect, test } from '@playwright/test';
import { setNow } from '../utils/setNow';
import { åpneDeltakelseHandlingerPanel, gåTilDeltakerSide } from '../utils/deltakelseHandlingerUtils';

// kanForlengePeriode-scenariet: NÆRMER PERIODESLUTT — søkt, nær periodeMaksDato
const DELTAKER_ID = 'c48cb25e-504d-49b8-8d9d-66a99697ffc6';

test.beforeEach(async ({ page }) => {
    await setNow(page);
    await gåTilDeltakerSide(page, DELTAKER_ID, 'NÆRMER PERIODESLUTT');
});

test('kanForlengePeriode: viser riktige handlinger', async ({ page }) => {
    await åpneDeltakelseHandlingerPanel(page);
    const kanForlengeRad = page.locator('text=kanForlengePeriode').locator('..');
    await expect(kanForlengeRad.getByText('true')).toBeVisible();
    const kanMeldesUtRad = page.locator('text=kanMeldesUt').locator('..');
    await expect(kanMeldesUtRad.getByText('true')).toBeVisible();
    const kanEndreSluttdatoRad = page.locator('text=kanEndreSluttdato').locator('..');
    await expect(kanEndreSluttdatoRad.getByText('false')).toBeVisible();
});

test('kanForlengePeriode: kan forlenge periode', async ({ page }) => {
    await åpneDeltakelseHandlingerPanel(page);
    await page.getByRole('button', { name: 'Registrer forlenget periode' }).click();
    await page.getByRole('radio', { name: 'Ja' }).click();
    await page.getByRole('checkbox', { name: 'Jeg bekrefter' }).check();
    await page.getByTestId('typedFormikForm-submitButton').click();
    // Etter forlengelse skal kanForlengePeriode være false
    const kanForlengeRad = page.locator('text=kanForlengePeriode').locator('..');
    await expect(kanForlengeRad.getByText('false')).toBeVisible();
});
