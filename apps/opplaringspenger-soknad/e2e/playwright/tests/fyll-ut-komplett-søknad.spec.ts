import { expect, test } from '@playwright/test';
import { fyllUtRegistrertBarn } from '../utfylling-utils/1.barnStep';
import { fyllUtOpplæringEnPeriode } from '../utfylling-utils/2.opplæringStep';
import { fyllUtArbeidssituasjonStep } from '../utfylling-utils/3.arbeidssituasjonStep';
import { fyllUtArbeidstid } from '../utfylling-utils/4.arbeidstidStep';
import { fyllUtMedlemskap } from '../utfylling-utils/5.medlemskapStep';
import { fyllUtDokumentasjon } from '../utfylling-utils/6.dokumentasjonStep';
import { kontrollerOppsummering, sendInnSøknad } from '../utfylling-utils/oppsummeringeStep';
import { setNow } from '../utils/setNow';
import { setupMockRoutes } from '../utils/setupMockRoutes';

const startUrl = 'http://localhost:8080/familie/sykdom-i-familien/soknad/omsorgspenger/soknad/velkommen';

test.beforeEach(async ({ page, context }) => {
    await setNow(page);
    await setupMockRoutes(page, context);
});

test('Fyll ut komplett søknad', async ({ page }) => {
    await page.goto(startUrl);

    await page.getByText('Hei, PRESENTABEL').isVisible();
    await page.getByTestId('bekreft-label').click();
    await page.getByTestId('typedFormikForm-submitButton').click();

    await fyllUtRegistrertBarn(page);
    await expect(page.getByText('Oops, dette stemmer ikke helt')).not.toBeVisible();
    await fyllUtOpplæringEnPeriode(page);
    await expect(page.getByText('Oops, dette stemmer ikke helt')).not.toBeVisible();
    await fyllUtArbeidssituasjonStep(page);
    await expect(page.getByText('Oops, dette stemmer ikke helt')).not.toBeVisible();
    await fyllUtArbeidstid(page);
    await expect(page.getByText('Oops, dette stemmer ikke helt')).not.toBeVisible();
    await fyllUtMedlemskap(page);
    await fyllUtDokumentasjon(page);
    await kontrollerOppsummering(page);
    await sendInnSøknad(page);
});
