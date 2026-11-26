import { SøknadRoutes } from '@app/søknad/config/SøknadRoutes';
import { expect, test } from '@playwright/test';

import { routeUtils } from '../../utils/routeUtils';

test('Legge til endring i omsorgstilbud fra oppsummeringen', async ({ page }) => {
    await routeUtils.resumeFromRoute(page, SøknadRoutes.VELKOMMEN, 'arbeidsgivere-og-frilanser');

    /** Velkommen - velger kun ferie */
    await page.getByTestId('endreLovbestemtFerie').check();
    await page.getByLabel('Jeg bekrefter at jeg har').check();
    await page.getByRole('main').getByTestId('typedFormikForm-submitButton').click();

    /** Ferie - går videre uten endringer */
    await expect(page).toHaveTitle('Ferie i pleiepengeperioden - Endringsmelding for pleiepenger sykt barn');
    await page.getByRole('main').getByTestId('typedFormikForm-submitButton').click();

    /** Oppsummering - omsorgstilbud er ikke valgt, men kan legges til */
    await expect(page.getByText('Endre omsorgstilbud')).toBeVisible();

    const mellomlagringMedOmsorgstilbud = page.waitForRequest(
        (request) =>
            request.url().includes('/mellomlagring/') &&
            request.method() !== 'GET' &&
            request.postDataJSON()?.valgteEndringer?.tilsynsordning === true,
    );
    await page.getByRole('link', { name: 'Endre omsorgstilbud' }).click();
    await mellomlagringMedOmsorgstilbud;

    /** Omsorgstilbud - steget er lagt til og kan fylles ut */
    await expect(page).toHaveTitle('Tid i omsorgstilbud - Endringsmelding for pleiepenger sykt barn');
    await page.getByRole('button', { name: 'Legg til endring for en periode' }).click();
    await page.getByRole('button', { name: 'Åpne datovelger' }).first().click();
    await page.getByRole('button', { name: 'Gå til neste måned' }).click();
    await page.getByRole('button', { name: 'mandag 6' }).click();
    await page.getByRole('button', { name: 'Åpne datovelger' }).nth(1).click();
    await page.getByRole('button', { name: 'fredag 24' }).click();
    await page.getByRole('group', { name: 'Mandager' }).getByLabel('Timer').fill('1');
    await page.getByRole('button', { name: 'Ok' }).click();
    await page.getByRole('main').getByTestId('typedFormikForm-submitButton').click();

    /** Oppsummering - endringen i omsorgstilbud vises, og ferie er fortsatt med */
    await expect(page.getByText('Omsorgstilbud').nth(2)).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Februar 2023 - 3 dager endret' })).toBeVisible();
    await expect(page.getByText('Endre ferie')).toBeVisible();

    await page.getByText('Jeg bekrefter at').click();
    await page.getByRole('main').getByTestId('typedFormikForm-submitButton').click();
    await expect(page.getByRole('heading', { name: 'Melding om endring er lagt til saken din' })).toBeVisible();
});
