import { expect, test } from '@playwright/test';
import { routeUtils } from '../../utils/routeUtils';
import { setNow as setNow } from '../../utils/setNow';
import { SøknadRoutes } from '../../../../src/app/søknad/config/SøknadRoutes';

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

    await expect(page).toHaveTitle('Ferie i pleiepengeperioden - Endringsmelding for pleiepenger sykt barn');
    await page.getByTestId('dateRangeAccordion_0').click();
    await page.getByTestId('dateRangeAccordion_0').getByTestId('leggTilFerieKnapp').click();

    await page
        .locator('div')
        .filter({ hasText: /^Fra og medÅpne datovelger$/ })
        .getByRole('button')
        .click();
    await page.getByRole('button', { name: 'mandag 14' }).click();
    await page
        .locator('div')
        .filter({ hasText: /^Til og medÅpne datovelger$/ })
        .getByRole('button')
        .click();
    await page.getByRole('button', { name: 'tirsdag 15' }).click();
    await page.getByRole('button', { name: 'Ok' }).click();
    await page.getByTestId('typedFormikForm-submitButton').click();

    await expect(page).toHaveTitle('Jobb i pleiepengeperioden - Endringsmelding for pleiepenger sykt barn');
    await page.getByTestId('dateRangeAccordion_1_header').click();
    await page.getByTestId('dateRangeAccordion_1').getByText('Jeg ønsker å endre flere uker').click();
    await page.getByTestId('dateRangeAccordion_1').getByLabel('Uke 49').check();
    await page.getByTestId('dateRangeAccordion_1').getByLabel('Uke 50').check();
    await page.getByTestId('endre-flere-uker-button').click();
    await page.getByTestId('prosent-verdi').click();
    await page.getByTestId('prosent-verdi').fill('20');
    await page.getByRole('button', { name: 'Ok' }).click();

    await page.getByTestId('typedFormikForm-submitButton').click();

    await expect(page).toHaveTitle('Oppsummering - Endringsmelding for pleiepenger sykt barn');
    await page.getByText('Jeg bekrefter at').click();
    await page.getByTestId('typedFormikForm-submitButton').click();
});
