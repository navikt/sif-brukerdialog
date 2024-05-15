import { expect, test } from '@playwright/test';
import { SøknadRoutes } from '../../../../src/app/søknad/config/SøknadRoutes';
import { FlereSaker } from '../../../../src/mocks/data/scenario/flere-saker/FlereSaker';
import { UgyldigK9Format } from '../../../../src/mocks/data/scenario/ugyldig-k9-format/UgyldigK9Format';
import { routeUtils } from '../../utils/routeUtils';
import { setNow as setNow } from '../../utils/setNow';

test.beforeEach(async ({ page }) => {
    await setNow(page);
});

test('Ugyldig k9format på sak', async ({ page }) => {
    await routeUtils.resumeFromRoute(page, SøknadRoutes.VELKOMMEN);
    await page.route('**/api/innsyn/sak', async (route) => {
        await route.fulfill({ status: 200, body: JSON.stringify(UgyldigK9Format.sak) });
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
        await route.fulfill({ status: 200, body: JSON.stringify(FlereSaker.sak) });
    });
    await expect(page).toHaveTitle('Ingen tilgang - Endringsmelding for pleiepenger sykt barn');
    await expect(page.getByText('Hei STERK')).toBeVisible();
    await expect(page.getByTestId('flereSaker')).toBeVisible();
});
