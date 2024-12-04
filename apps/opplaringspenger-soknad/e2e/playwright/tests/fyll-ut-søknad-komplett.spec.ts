import { test } from '@playwright/test';
import { setNow } from '../utils/setNow';
import { setupMockRoutes } from '../utils/setupMockRoutes';
import { fyllUtBarnStep } from '../utfylling-utils/1.barnStep';
import { fyllUtOpplæringStep } from '../utfylling-utils/2.opplæringStep';
import { fyllUtArbeidssituasjonStep } from '../utfylling-utils/3.arbeidssituasjonStep';
import { fyllUtArbeidstid } from '../utfylling-utils/4.arbeidstidStep';
import { fyllUtMedlemskap } from '../utfylling-utils/5.medlemskapStep';
import { fyllUtDokumentasjon } from '../utfylling-utils/6.dokumentasjonStep';
import { kontrollerOppsummering, sendInSøknad } from '../utfylling-utils/oppsummeringeStep';

const startUrl = 'http://localhost:8080/familie/sykdom-i-familien/soknad/omsorgspenger/soknad/velkommen';

test.beforeEach(async ({ page }) => {
    await setNow(page);
    await setupMockRoutes(page);
});

test('Fyll ut komplett søknad', async ({ page }) => {
    await page.goto(startUrl);

    await page.getByText('Hei, PRESENTABEL').isVisible();
    await page.getByTestId('bekreft-label').click();
    await page.getByTestId('typedFormikForm-submitButton').click();

    await fyllUtBarnStep(page);
    await fyllUtOpplæringStep(page);
    await fyllUtArbeidssituasjonStep(page);
    await fyllUtArbeidstid(page);
    await fyllUtMedlemskap(page);
    await fyllUtDokumentasjon(page);
    await kontrollerOppsummering(page);
    await sendInSøknad(page);
});
