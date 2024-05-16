import { expect, test } from '@playwright/test';
import { SøknadRoutes } from '../../../../src/app/søknad/config/SøknadRoutes';
import { routeUtils } from '../../utils/routeUtils';
import { setNow as setNow } from '../../utils/setNow';

test.beforeEach(async ({ page }) => {
    await setNow(page);
});

test('endringsmelding om ferie og arbeid', async ({ page }) => {
    await routeUtils.resumeFromRoute(page, SøknadRoutes.VELKOMMEN);
    await expect(page).toHaveTitle('Endringsmelding for pleiepenger sykt barn');
    await page.getByTestId('endreLovbestemtFerie').check();
    await page.getByTestId('endreArbeidstid').check();
    await page.getByLabel('Jeg bekrefter at jeg har').check();
    await page.getByTestId('typedFormikForm-submitButton').click();

    /** Ferie */
    await expect(page).toHaveTitle('Ferie i pleiepengeperioden - Endringsmelding for pleiepenger sykt barn');
    await page.getByLabel('Endre ferie søndag 01.01.2023').click();
    await page
        .locator('div')
        .filter({ hasText: /^Fra og medÅpne datovelger$/ })
        .getByRole('button')
        .click();
    await page.getByRole('button', { name: 'tirsdag 3', exact: true }).click();
    await page.getByRole('button', { name: 'Ok' }).click();
    await page.getByTestId('leggTilFerieKnapp').click();
    await page.getByLabel('Fra og med').click();
    await page.getByLabel('Fra og med').fill('19.01.2023');
    await page.getByLabel('Til og med').click();
    await page.getByLabel('Til og med').fill('19.01.2023');
    await page.getByRole('button', { name: 'Ok' }).click();
    await page.getByLabel('Fjern ferie torsdag 12.01.').click();
    await page.getByTestId('typedFormikForm-submitButton').click();

    /** Arbeidstid */
    await page.getByTestId('uke_48').getByTestId('endre-button').click();
    await page.getByTestId('prosent-verdi').click();
    await page.getByTestId('prosent-verdi').fill('10');
    await page.getByRole('button', { name: 'Ok' }).click();

    await page.getByTestId('uke_49').getByTestId('endre-button').click();
    await page.getByTestId('prosent-verdi').click();
    await page.getByTestId('prosent-verdi').fill('20');
    await page.getByRole('button', { name: 'Ok' }).click();

    await page.getByLabel('Jeg ønsker å endre flere uker').check();
    await page.getByTestId('uke_4').getByLabel('Uke').check();
    await page.getByTestId('uke_5').getByLabel('Uke').check();
    await page.getByTestId('endre-flere-uker-button').click();
    await page.getByTestId('prosent-verdi').click();
    await page.getByTestId('prosent-verdi').fill('50');

    await page.getByRole('button', { name: 'Ok' }).click();
    await page.getByTestId('typedFormikForm-submitButton').click();

    await page.getByText('Jeg bekrefter at').click();
    await page.getByTestId('typedFormikForm-submitButton').click();
});
