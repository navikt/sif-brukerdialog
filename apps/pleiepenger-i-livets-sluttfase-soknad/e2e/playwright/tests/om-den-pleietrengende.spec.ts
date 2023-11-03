import { expect, test } from '@playwright/test';
import { SøknadRoutes } from '../../../src/app/types/SøknadRoutes';
import { routeUtils } from '../utils/routeUtils';
import { setNow as setNow } from '../utils/setNow';

test.beforeEach(async ({ page }) => {
    await setNow(page);
    await routeUtils.startOnRoute(page, SøknadRoutes.OPPLYSNINGER_OM_PLEIETRENGENDE);
});

test.describe('Informasjon om den pleietrengende', () => {
    test('Starter med mellomlagring', async ({ page }) => {
        await expect(page).toHaveTitle('Om personen du pleier - Søknad om pleiepenger i livets sluttfase');
        await expect(page.getByRole('textbox', { name: 'Navn på den du skal pleie' })).toHaveValue('Test Testesen');
        await expect(page.getByRole('textbox', { name: 'Fødselsnummer/D-nummer' })).toHaveValue('27857798800');

        const radioNei = await page
            .getByRole('group', { name: 'Er dere flere som skal dele på pleiepengene?' })
            .getByRole('radio', { name: 'Nei' });

        await expect(radioNei).toBeChecked();
    });

    test('Validering av navn', async ({ page }) => {
        await page.getByRole('textbox', { name: 'Navn på den du skal pleie' }).fill('');
        await page.getByRole('button', { name: 'Neste' }).click();

        const errorMessages = await page.getByLabel('Feil i skjema');
        expect(await errorMessages.isVisible()).toBeTruthy();
        expect(await errorMessages.getByText('Du må skrive inn navnet til den du pleier.').isVisible()).toBeTruthy();
    });
});
