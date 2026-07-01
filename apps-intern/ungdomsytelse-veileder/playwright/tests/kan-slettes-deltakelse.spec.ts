import { expect, test } from '@playwright/test';
import { åpneDeltakelseHandlingerPanel, gåTilDeltakerSide } from '../utils/deltakelseHandlingerUtils';

// kanSletteDeltakelse-scenariet: NYOPPRETTET INNMELDING — registrert, ikke søkt
const DELTAKER_ID = 'a9d51b57-ccae-4e42-90ce-a22f8a745050';

test.beforeEach(async ({ page }) => {
    await gåTilDeltakerSide(page, DELTAKER_ID, 'NYOPPRETTET INNMELDING');
});

test('kanSletteDeltakelse: viser riktige handlinger', async ({ page }) => {
    await åpneDeltakelseHandlingerPanel(page);
    await expect(page.getByRole('heading', { name: 'Slett ny deltaker' })).toBeVisible();
    // Verifiser verdier
    const kanSlettesRad = page.locator('text=kanSletteDeltakelse').locator('..');
    await expect(kanSlettesRad.getByText('true')).toBeVisible();
    const kanMeldesUtRad = page.locator('text=kanMeldesUt').locator('..');
    await expect(kanMeldesUtRad.getByText('false')).toBeVisible();
});

test('kanSletteDeltakelse: kan slette deltaker', async ({ page }) => {
    await page.getByRole('button', { name: 'Slett ny deltaker' }).click();
    await page.getByRole('checkbox', { name: 'Jeg bekrefter' }).check();
    await page.getByRole('button', { name: 'Slett ny deltaker', exact: true }).click();
    await page.getByRole('button', { name: 'Ok, lukk dialog', exact: true }).click();
    await expect(page.getByText('Finn deltaker')).toBeVisible();
});
