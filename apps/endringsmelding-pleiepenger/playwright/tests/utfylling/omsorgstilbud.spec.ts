import { expect, test } from '@playwright/test';

import { SøknadRoutes } from '../../../src/app/søknad/config/SøknadRoutes';
import { routeUtils } from '../../utils/routeUtils';
import { setNow as setNow } from '../../utils/setNow';

test.beforeEach(async ({ page }) => {
    await setNow(page);
});

test('Sende endring om tid omsorgstilbud', async ({ page }) => {
    await routeUtils.resumeFromRoute(page, SøknadRoutes.VELKOMMEN, 'arbeidsgivere-og-frilanser');
    await page.goto(
        'http://localhost:8080/familie/sykdom-i-familien/soknad/endringsmelding-pleiepenger/melding/velkommen',
    );
    await page.getByText('Tid i omsorgstilbud').click();
    await page
        .locator('div')
        .filter({ hasText: /^Jeg bekrefter at jeg har forstått mitt ansvar når jeg sender inn en endring$/ })
        .click();
    await page.getByTestId('typedFormikForm-submitButton').click();
    await page.getByRole('button', { name: 'Registrer tid for en periode' }).click();
    await page.getByRole('button', { name: 'Åpne datovelger' }).first().click();
    await page.getByRole('button', { name: 'Gå til neste måned' }).click();
    await page.getByRole('button', { name: 'Gå til neste måned' }).click();
    await page.getByRole('button', { name: 'Gå til neste måned' }).click();
    await page.getByRole('button', { name: 'Gå til neste måned' }).click();
    await page.getByRole('button', { name: 'mandag 6' }).click();
    await page.getByRole('button', { name: 'Åpne datovelger' }).nth(1).click();
    await page.getByRole('button', { name: 'fredag 24' }).click();
    await page.getByRole('group', { name: 'Mandager' }).getByLabel('Timer').fill('1');
    await page.getByRole('group', { name: 'Onsdager' }).getByLabel('Timer').fill('5');
    await page.getByRole('group', { name: 'Fredager' }).getByLabel('Timer').fill('3');
    await page.getByRole('button', { name: 'Ok' }).click();
    await page.getByLabel('mars').getByRole('button', { name: 'Vis mer' }).click();
    await page.getByTestId('calendar-grid-date-2023-03-01').click();
    await page.getByRole('radio', { name: 'Nei' }).check();
    await page.getByText('Gjenta denne tiden for flere').click();
    await page.getByText('Alle dager i mars').click();
    await page.getByRole('button', { name: 'Lagre' }).click();
    await page.getByTestId('typedFormikForm-submitButton').click();
    await page.getByLabel('februar 2023 - 9 dager endret').getByRole('button', { name: 'Vis mer' }).click();
    await page.getByLabel('mars 2023 - 23 dager endret').getByRole('button', { name: 'Vis mer' }).click();
    await page.getByText('Jeg bekrefter at').click();
    await page.getByTestId('typedFormikForm-submitButton').click();
    await expect(page.getByRole('heading', { name: 'Melding om endring er lagt' })).toBeVisible();
});
