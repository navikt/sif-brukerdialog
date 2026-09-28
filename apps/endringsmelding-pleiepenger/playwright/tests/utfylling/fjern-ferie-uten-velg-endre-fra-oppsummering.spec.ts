import { SøknadRoutes } from '@app/søknad/config/SøknadRoutes';
import { Feature } from '@app/utils/featureToggleUtils';
import { expect, test } from '@playwright/test';

import { featureToggleUtils } from '../../utils/featureToggleUtils';
import { routeUtils } from '../../utils/routeUtils';

test('Oppsummering viser kun steg i flyten når valg av endringer fra oppsummering er av', async ({ page }) => {
    await featureToggleUtils.setFeatureToggle(page, Feature.SIF_PUBLIC_VELG_ENDRE_FRA_OPPSUMMERING, 'off');
    await routeUtils.resumeFromRoute(page, SøknadRoutes.VELKOMMEN);

    /** Velkommen - velger kun ferie */
    await page.getByTestId('endreLovbestemtFerie').check();
    await page.getByLabel('Jeg bekrefter at jeg har').check();
    await page.getByTestId('typedFormikForm-submitButton').click();

    /** Ferie - fjerner ferie, som legger til arbeidstid-steget automatisk */
    await expect(page).toHaveTitle('Ferie i pleiepengeperioden - Endringsmelding for pleiepenger sykt barn');
    await page.getByLabel('Fjern ferie torsdag 12.01.').click();
    await page.getByTestId('typedFormikForm-submitButton').click();

    /** Arbeidstid - går videre uten endringer */
    await expect(page).toHaveTitle('Jobb i pleiepengeperioden - Endringsmelding for pleiepenger sykt barn');
    await page.getByTestId('typedFormikForm-submitButton').click();

    /** Oppsummering */
    // Ferie er valgt og endret: endringene vises
    await expect(page.getByRole('heading', { name: 'Endringer i ferie' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Ferie som er fjernet' })).toBeVisible();

    // Arbeidstid er lagt til i flyten, men ikke endret: info om at ingen endringer finnes vises
    await expect(page.getByRole('heading', { name: 'Arbeidstid', exact: true })).toBeVisible();
    await expect(page.getByText('Det er ikke registrert noen endringer i arbeidstid')).toBeVisible();

    // Omsorgstilbud er ikke i flyten: blokken vises ikke
    await expect(page.getByRole('heading', { name: 'Endringer i omsorgstilbud' })).toHaveCount(0);

    // Ingen endre-knapper når toggle er av
    await expect(page.getByRole('button', { name: /^Endre / })).toHaveCount(0);

    await page.getByText('Jeg bekrefter at').click();
    await page.getByTestId('typedFormikForm-submitButton').click();
    await expect(page.getByRole('heading', { name: 'Melding om endring er lagt til saken din' })).toBeVisible();
});
