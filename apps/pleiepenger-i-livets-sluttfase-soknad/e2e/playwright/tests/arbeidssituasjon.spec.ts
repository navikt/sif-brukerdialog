import { expect, test } from '@playwright/test';
import { SøknadRoutes } from '../../../src/app/types/SøknadRoutes';
import { routeUtils } from '../utils/routeUtils';
import { setNow as setNow } from '../utils/setNow';

test.beforeEach(async ({ page }) => {
    await setNow(page);
    await routeUtils.resumeFromRoute(page, SøknadRoutes.ARBEIDSSITUASJON);
});

test('Viser riktig informasjon fra mellomlagring', async ({ page }) => {
    await expect(page).toHaveTitle('Arbeidssituasjon - Søknad om pleiepenger i livets sluttfase');
});
