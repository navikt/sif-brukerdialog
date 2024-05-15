import { expect, test } from '@playwright/test';
import { routeUtils } from '../../utils/routeUtils';
import { setNow as setNow } from '../../utils/setNow';
import { SøknadRoutes } from '../../../../src/app/søknad/config/SøknadRoutes';
import { ugyldigK9FormatSakMock } from '../../../mock-data/ugyldigK9FormatSakMock';
import { flereSakerMock } from '../../../mock-data/flereSakerMock';

test.beforeEach(async ({ page }) => {
    await setNow(page);
});

test('Ugyldig k9format på sak', async ({ page }) => {
    await routeUtils.resumeFromRoute(page, SøknadRoutes.VELKOMMEN);
    await page.route('**/api/innsyn/sak', async (route) => {
        await route.fulfill({ status: 200, body: JSON.stringify([ugyldigK9FormatSakMock]) });
    });
    await expect(page).toHaveTitle('Ingen tilgang - Endringsmelding for pleiepenger sykt barn');
    await expect(page.getByText('Hei STERK')).toBeVisible();
    await expect(page.getByTestId('ugyldigK9FormatSak')).toBeVisible();
});

test('Ingen sak funnet', async ({ page }) => {
    await routeUtils.resumeFromRoute(page, SøknadRoutes.VELKOMMEN);
    await page.route('**/api/innsyn/sak', async (route) => {
        await route.fulfill({ status: 200, body: JSON.stringify([]) });
    });
    await expect(page).toHaveTitle('Ingen tilgang - Endringsmelding for pleiepenger sykt barn');
    await expect(page.getByText('Hei STERK')).toBeVisible();
    await expect(page.getByTestId('ingenSak')).toBeVisible();
});

test('Flere saker', async ({ page }) => {
    await routeUtils.resumeFromRoute(page, SøknadRoutes.VELKOMMEN);
    await page.route('**/api/innsyn/sak', async (route) => {
        await route.fulfill({ status: 200, body: JSON.stringify(flereSakerMock) });
    });
    await expect(page).toHaveTitle('Ingen tilgang - Endringsmelding for pleiepenger sykt barn');
    await expect(page.getByText('Hei STERK')).toBeVisible();
    await expect(page.getByTestId('flereSaker')).toBeVisible();
});
