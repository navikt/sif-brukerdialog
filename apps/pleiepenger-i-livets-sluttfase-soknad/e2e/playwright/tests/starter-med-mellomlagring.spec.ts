import { expect, test } from '@playwright/test';
import { SøknadRoutes } from '../../../src/app/types/SøknadRoutes';
import { routeUtils } from '../utils/routeUtils';
import { setNow as setNow } from '../utils/setNow';

test.beforeEach(async ({ page }) => {
    await setNow(page);
});

test('Starter med mellomlagring - kommer til oppsummering', async ({ page }) => {
    await routeUtils.resumeFromRoute(page, SøknadRoutes.OPPSUMMERING);
    await page.goto(routeUtils.getRouteUrl(SøknadRoutes.VELKOMMEN));
    await expect(page).toHaveTitle('Oppsummering - Søknad om pleiepenger i livets sluttfase');
});

test('Starter med mellomlagring - info om den pleietrengende', async ({ page }) => {
    await routeUtils.resumeFromRoute(page, SøknadRoutes.OPPLYSNINGER_OM_PLEIETRENGENDE);
    await expect(page).toHaveTitle('Om personen du pleier - Søknad om pleiepenger i livets sluttfase');
    await page.getByRole('button', { name: 'Neste', exact: true }).click();
    await page.getByRole('button', { name: 'Neste', exact: true }).click();
    await page.getByRole('button', { name: 'Neste', exact: true }).click();
    await page.getByRole('button', { name: 'Neste', exact: true }).click();
    await page.getByRole('button', { name: 'Neste', exact: true }).click();
    await expect(page).toHaveTitle('Oppsummering - Søknad om pleiepenger i livets sluttfase');
});
