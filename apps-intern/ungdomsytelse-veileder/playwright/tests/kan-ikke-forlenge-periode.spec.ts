import { expect, test } from '@playwright/test';
import { setNow } from '../utils/setNow';
import { åpneDeltakelseHandlingerPanel, gåTilDeltakerSide } from '../utils/deltakelseHandlingerUtils';

// kanIkkeForlengePeriode-scenariet: UTENFOR VINDU — utløpt og mer enn 6 uker siden
const DELTAKER_ID = '0ea083fc-058e-4a79-baed-37ede478dfc0';

test.beforeEach(async ({ page }) => {
    await setNow(page);
    await gåTilDeltakerSide(page, DELTAKER_ID, 'UTENFOR VINDU');
});

test('kanIkkeForlengePeriode: alle handlinger false', async ({ page }) => {
    await åpneDeltakelseHandlingerPanel(page);
    for (const handling of [
        'kanEndreStartdato',
        'kanMeldesUt',
        'kanEndreSluttdato',
        'kanForlengePeriode',
        'kanSlettes',
    ]) {
        const rad = page.locator(`text=${handling}`).locator('..');
        await expect(rad.getByText('false')).toBeVisible();
    }
});

test('kanIkkeForlengePeriode: ingen handlingsknapper synlige', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Endre startdato' })).not.toBeVisible();
    await expect(page.getByRole('button', { name: 'Registrer sluttdato' })).not.toBeVisible();
    await expect(page.getByRole('button', { name: 'Registrer forlenget periode' })).not.toBeVisible();
});
