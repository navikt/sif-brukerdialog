import { expect, test } from '@playwright/test';
import { SøknadRoutes } from '../../../src/app/types/SøknadRoutes';
import { routeUtils } from '../utils/routeUtils';
import { setNow as setNow } from '../utils/setNow';

test.beforeEach(async ({ page }) => {
    await setNow(page);
});

test('Starter med mellomlagring - kommer til oppsummering', async ({ page }) => {
    await routeUtils.startOnRoute(page, SøknadRoutes.OPPSUMMERING);
    await page.goto(routeUtils.getRouteUrl(SøknadRoutes.VELKOMMEN));
    await expect(page).toHaveTitle('Oppsummering - Søknad om pleiepenger i livets sluttfase');
});
