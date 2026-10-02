import { SøknadRoutes } from '@app/søknad/config/SøknadRoutes';
import { expect, test } from '@playwright/test';

import { routeUtils } from '../../utils/routeUtils';

/**
 * Arbeidsgiveren har to sammenhengende ansettelsesperioder (t.o.m. 05.12.2022 og f.o.m. 06.12.2022).
 * Bruker skal da få tilgang, og ukene i endringsperioden skal kunne endres - også uke 49,
 * hvor de to ansettelsesperiodene går over i hverandre.
 */
test('Arbeidsgiver med to sammenhengende ansettelsesperioder gir tilgang og uker kan endres', async ({ page }) => {
    await routeUtils.resumeFromRoute(
        page,
        SøknadRoutes.VELKOMMEN,
        'en-arbeidsgiver-to-ansettelser-samme-uke-uten-opphold',
    );

    /** Bruker skal ikke bli sendt til ingen tilgang-siden */
    await expect(page.getByTestId('endreArbeidstid')).toBeVisible();
    await page.getByTestId('endreArbeidstid').check();
    await page.getByTestId('bekreft-label').click();
    await page.getByTestId('typedFormikForm-submitButton').click();

    /** Arbeidstid - ukene rundt overgangen mellom ansettelsesperiodene skal kunne endres */
    await page.getByRole('button', { name: 'Vis alle uker' }).first().click();

    /** Ukenummer gjentar seg over år, så radene identifiseres med dato */
    const uke48 = page.getByRole('row', { name: /Uke 48\s+01\.12\.2022/ });
    const uke49 = page.getByRole('row', { name: /Uke 49\s+05\.12\.2022/ });

    await expect(uke48).toBeVisible();
    await expect(uke49).toBeVisible();
    await expect(uke49.getByTestId('endre-button')).toBeVisible();
});
