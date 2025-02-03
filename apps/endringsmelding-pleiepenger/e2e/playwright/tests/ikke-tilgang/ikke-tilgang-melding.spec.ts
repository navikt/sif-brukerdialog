import { expect, test } from '@playwright/test';
import { SøknadRoutes } from '../../../../src/app/søknad/config/SøknadRoutes';
import { routeUtils } from '../../utils/routeUtils';
import { setNow as setNow } from '../../utils/setNow';

test.beforeEach(async ({ page }) => {
    await setNow(page);
});

test('Ugyldig k9format på sak', async ({ page }) => {
    await routeUtils.resumeFromRoute(page, SøknadRoutes.VELKOMMEN, 'ugyldig-k9-format');
    await expect(page).toHaveTitle('Ingen tilgang - Endringsmelding for pleiepenger sykt barn');
    await expect(page.getByText('Hei Nora')).toBeVisible();
    await expect(page.getByTestId('ugyldigK9FormatSak')).toBeVisible();
});

test('Ingen sak funnet', async ({ page }) => {
    await routeUtils.resumeFromRoute(page, SøknadRoutes.VELKOMMEN, 'ingen-sak');
    await expect(page).toHaveTitle('Ingen tilgang - Endringsmelding for pleiepenger sykt barn');
    await expect(page.getByText('Hei Nora')).toBeVisible();
    await expect(page.getByTestId('ingenSak')).toBeVisible();
});

test('Flere saker', async ({ page }) => {
    await routeUtils.resumeFromRoute(page, SøknadRoutes.VELKOMMEN, 'flere-saker');
    await expect(page).toHaveTitle('Ingen tilgang - Endringsmelding for pleiepenger sykt barn');
    await expect(page.getByText('Hei Nora')).toBeVisible();
    await expect(page.getByTestId('flereSaker')).toBeVisible();
});

test('Er selvstendig næringsdrivende', async ({ page }) => {
    await routeUtils.resumeFromRoute(page, SøknadRoutes.VELKOMMEN, 'selvstendig-næringsdrivende');
    await expect(page).toHaveTitle('Ingen tilgang - Endringsmelding for pleiepenger sykt barn');
    await expect(page.getByText('Hei Nora')).toBeVisible();
    await expect(page.getByTestId('erSN')).toBeVisible();
});

test('Har en arbeidsgiver med to ansettelsesforhold som slutter og starter samme uke med opphold', async ({ page }) => {
    await routeUtils.resumeFromRoute(
        page,
        SøknadRoutes.VELKOMMEN,
        'en-arbeidsgiver-to-ansettelser-samme-uke-med-opphold',
    );
    await expect(page).toHaveTitle('Ingen tilgang - Endringsmelding for pleiepenger sykt barn');
    await expect(page.getByText('Hei Nora')).toBeVisible();
    await expect(page.getByTestId('enArbeidsgiverToAnsettelserSammeUkeMedOpphold')).toBeVisible();
});
