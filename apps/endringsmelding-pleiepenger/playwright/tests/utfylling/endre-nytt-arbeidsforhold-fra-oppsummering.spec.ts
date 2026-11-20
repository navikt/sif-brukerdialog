import { SøknadRoutes } from '@app/søknad/config/SøknadRoutes';
import { expect, test } from '@playwright/test';

import { routeUtils } from '../../utils/routeUtils';

test('Endre nytt arbeidsforhold fra nei til ja fra oppsummeringen går via arbeidstid', async ({ page }) => {
    await routeUtils.resumeFromRoute(page, SøknadRoutes.VELKOMMEN, 'arbeidsgiver-ikke-i-sak');

    /** Velkommen */
    await page.getByTestId('endreArbeidstid').check();
    await page.getByTestId('bekreft-label').click();
    await page.getByTestId('typedFormikForm-submitButton').click();

    /** Ukjent arbeidsforhold - ikke ansatt i noen av dem */
    await page.getByTestId('ukjentArbeidsforhold_a_947064642').getByLabel('Nei').check();
    await page.getByTestId('ukjentArbeidsforhold_a_947064643').getByLabel('Nei').check();
    await page.getByTestId('typedFormikForm-submitButton').click();

    /** Arbeidstid - går videre uten endringer */
    await expect(page).toHaveTitle('Jobb i pleiepengeperioden - Endringsmelding for pleiepenger sykt barn');
    await page.getByTestId('typedFormikForm-submitButton').click();

    /** Oppsummering - endrer det ene arbeidsforholdet fra nei til ja */
    await page.getByRole('link', { name: 'Endre nytt arbeidsforhold' }).click();
    await page.getByTestId('ukjentArbeidsforhold_a_947064643').getByLabel('Ja').check();
    await page.getByTestId('ukjentArbeidsforhold_a_947064643').getByLabel('Hvor mange timer jobber du').fill('30');
    await page.getByLabel('Hovedinnhold').click();
    await page.getByTestId('typedFormikForm-submitButton').click();

    /** Arbeidstid - må innom for å svare for det nye arbeidsforholdet */
    await expect(page).toHaveTitle('Jobb i pleiepengeperioden - Endringsmelding for pleiepenger sykt barn');
    await page.getByTestId('aktivitet_a_947064643').getByTestId('SOM_VANLIG').check();
    await page.getByTestId('typedFormikForm-submitButton').click();

    /** Oppsummering - kan sende inn */
    await page.getByText('Jeg bekrefter at').click();
    await page.getByTestId('typedFormikForm-submitButton').click();
    await expect(page.getByRole('heading', { name: 'Melding om endring er lagt til saken din' })).toBeVisible();
});
