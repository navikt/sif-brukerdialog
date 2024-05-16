import { test } from '@playwright/test';
import { setNow } from '../../utils/setNow';
import { routeUtils } from '../../utils/routeUtils';
import { SøknadRoutes } from '../../../../src/app/søknad/config/SøknadRoutes';

test.beforeEach(async ({ page }) => {
    await setNow(page);
});

test('test', async ({ page }) => {
    await routeUtils.resumeFromRoute(page, SøknadRoutes.VELKOMMEN, 'en-arbeidsgiver-to-perioder');
    await page.goto(
        'http://localhost:8080/familie/sykdom-i-familien/soknad/endringsmelding-pleiepenger/melding/velkommen',
    );
    await page.getByTestId('endreLovbestemtFerie').check();
    await page.getByTestId('endreArbeidstid').check();
    await page.getByLabel('Jeg bekrefter at jeg har').check();
    await page.getByTestId('typedFormikForm-submitButton').click();
    await page.getByTestId('dateRangeAccordion_1_header').click();
    await page.getByTestId('dateRangeAccordion_1').getByTestId('leggTilFerieKnapp').click();
    await page
        .locator('div')
        .filter({ hasText: /^Fra og medÅpne datovelger$/ })
        .getByRole('button')
        .click();
    await page.getByRole('button', { name: 'mandag 4' }).click();
    await page
        .locator('div')
        .filter({ hasText: /^Til og medÅpne datovelger$/ })
        .getByRole('button')
        .click();
    await page.getByRole('button', { name: 'søndag 10' }).click();
    await page.getByRole('button', { name: 'Ok' }).click();
    await page.getByTestId('dateRangeAccordion_0_header').click();
    await page.getByLabel('Fjern ferie fredag 23.12.2022').click();
    await page.getByLabel('Endre ferie lørdag 28.01.2023').click();
    await page.getByLabel('Til og med').click();
    await page.getByLabel('Til og med').press('ArrowLeft');
    await page.getByLabel('Til og med').press('ArrowLeft');
    await page.getByLabel('Til og med').press('ArrowLeft');
    await page.getByLabel('Til og med').press('ArrowLeft');
    await page.getByLabel('Til og med').press('ArrowLeft');
    await page.getByLabel('Til og med').press('ArrowLeft');
    await page.getByLabel('Til og med').press('ArrowLeft');
    await page.getByLabel('Til og med').fill('30.01.2023');
    await page.getByLabel('Til og med').press('Tab');
    await page
        .locator('div')
        .filter({ hasText: /^Til og medÅpne datovelger$/ })
        .getByRole('button')
        .press('Tab');
    await page.getByRole('button', { name: 'Ok' }).click();
    await page
        .locator('li')
        .filter({ hasText: 'tirsdag 31.01.2023Ferie' })
        .getByTestId('angre_fjern_ferie_knapp')
        .click();
    await page.getByTestId('typedFormikForm-submitButton').click();
    await page.getByTestId('dateRangeAccordion_0_header').click();
    await page.getByTestId('uke_51').getByTestId('endre-button').click();
    await page.getByTestId('prosent-verdi').click();
    await page.getByTestId('prosent-verdi').fill('0');
    await page.getByRole('button', { name: 'Ok' }).click();
    await page.getByTestId('uke_52').getByTestId('endre-button').click();
    await page.getByTestId('prosent-verdi').click();
    await page.getByTestId('prosent-verdi').fill('0');
    await page.getByRole('button', { name: 'Ok' }).click();
    await page.getByTestId('dateRangeAccordion_1_header').click();
    await page.getByTestId('typedFormikForm-submitButton').click();
    await page.getByText('Jeg bekrefter at').click();
    await page.getByText('fredag 23.12.2022 - torsdag').click();
    await page.getByText('mandag 04.12.2023 - søndag').click();
    await page.getByText('- 23.12.2022').click();
    await page.getByTestId('arbeidstid-faktisk').click();
    await page.getByTestId('typedFormikForm-submitButton').click();
    await page.getByTestId('kvittering-heading').click();
});
