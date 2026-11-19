import { SøknadRoutes } from '@app/søknad/config/SøknadRoutes';
import { expect, test } from '@playwright/test';

import { routeUtils } from '../../utils/routeUtils';

test('Sende endring om tid omsorgstilbud', async ({ page }) => {
    await routeUtils.resumeFromRoute(page, SøknadRoutes.VELKOMMEN, 'arbeidsgivere-og-frilanser');
    await page.getByText('Tid i omsorgstilbud').click();
    await page
        .locator('div')
        .filter({ hasText: /^Jeg bekrefter at jeg har forstått mitt ansvar når jeg sender inn en endring$/ })
        .click();
    await page.getByTestId('typedFormikForm-submitButton').click();
    await page.getByRole('button', { name: 'Legg til endring for en periode' }).click();
    await page.getByRole('button', { name: 'Åpne datovelger' }).first().click();
    await expect(page.getByLabel('Velg dato').getByText('januar 2023')).toBeVisible();
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
    await page.getByText('Alle dager i mars 2023', { exact: true }).click();
    await page.getByRole('button', { name: 'Lagre' }).click();
    await page.getByTestId('typedFormikForm-submitButton').click();
    await expect(page.getByRole('heading', { name: 'Februar 2023 - 9 dager endret' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Mars 2023 - 23 dager endret' })).toBeVisible();
    await page.getByText('Jeg bekrefter at').click();
    await page.getByTestId('typedFormikForm-submitButton').click();
    await expect(page.getByRole('heading', { name: 'Melding om endring er lagt' })).toBeVisible();
});
