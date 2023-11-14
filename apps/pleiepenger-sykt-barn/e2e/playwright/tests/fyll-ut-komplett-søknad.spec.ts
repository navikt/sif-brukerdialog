import { test, expect } from '@playwright/test';
import { setupMockApi } from '../setup/setupMockApi';
import { checkA11y, getSøknadsperiode } from '../setup';
import { setNow } from '../setup/setNow';
import { fyllUtArbeidssituasjonSteg } from '../utfylling-utils/arbeidssituasjon-steg/arbeidssituasjonSteg';
import { fyllUtArbeidstidSteg } from '../utfylling-utils/arbeidstidSteg';
import { omsorgstilbudSteg } from '../utfylling-utils/omsorgstilbudSteg';
import { nattevåkOgBeredskapSteg } from '../utfylling-utils/nattevågOgBeredskapSteg';
import { medlemskapSteg } from '../utfylling-utils/medlemskapSteg';
import { barnSteg } from '../utfylling-utils/barnSteg';
import { periodeSteg } from '../utfylling-utils/periodeSteg';

const startUrl = 'http://localhost:8080/familie/sykdom-i-familien/soknad/pleiepenger/soknad/velkommen';

test.beforeEach(async ({ page }) => {
    await setNow(page);
    await setupMockApi(page);
});

test('Fyll ut komplett søknad', async ({ page }) => {
    const søknadsperiode = getSøknadsperiode();

    await page.goto(startUrl);

    /** Velkommen side */
    await expect(page.getByRole('heading', { name: 'Hei Test' })).toBeVisible();
    await page.getByLabel('Jeg bekrefter at jeg har forstått mitt ansvar som søker').check();
    await checkA11y(page);
    await page.getByRole('button', { name: 'Start søknad' }).click();

    /** Barn */
    await expect(page.getByRole('heading', { level: 1, name: 'Barn' })).toBeVisible();
    await barnSteg.fyllUtMedRegistrertBarn(page, 'ALFABETISK FAGGOTTFødt 08.12.2019');
    await checkA11y(page);
    await page.getByRole('button', { name: 'Neste', exact: true }).click();

    /** Perioden med pleiepenger */
    await expect(page.getByRole('heading', { level: 1, name: 'Perioden med pleiepenger' })).toBeVisible();
    await periodeSteg.fyllUtPeriodeStegKomplett(page, søknadsperiode);
    await page.getByRole('button', { name: 'Neste', exact: true }).click();

    /** Arbeidssituasjon */
    await expect(page.getByRole('heading', { level: 1, name: 'Arbeidssituasjonen din' })).toBeVisible();
    await fyllUtArbeidssituasjonSteg(page, søknadsperiode);
    await page.getByRole('button', { name: 'Neste', exact: true }).click();

    /** Arbeidstid */
    await expect(page.getByRole('heading', { level: 1, name: 'Jobb i søknadsperioden' })).toBeVisible();
    await fyllUtArbeidstidSteg(page);
    await page.getByRole('button', { name: 'Neste', exact: true }).click();

    /** Omsorgstilbud */
    await expect(page.getByRole('heading', { level: 1, name: 'Omsorgstilbud' })).toBeVisible();
    await omsorgstilbudSteg.fyllUtOmsorgstilbudSteg(page);
    await page.getByRole('button', { name: 'Neste', exact: true }).click();

    await expect(page.getByRole('heading', { level: 1, name: 'Nattevåk og beredskap' })).toBeVisible();
    await nattevåkOgBeredskapSteg.fyllUtNattevåkOgBeredskapSteg(page);
    await page.getByRole('button', { name: 'Neste', exact: true }).click();

    /** Medlemsskap */
    await expect(page.getByRole('heading', { level: 1, name: 'Medlemskap' })).toBeVisible();
    await medlemskapSteg.fyllUtMedlemskapSteg(page);
    await page.getByRole('button', { name: 'Neste', exact: true }).click();

    /** Legeerklæring */
    await expect(page.getByRole('heading', { level: 1, name: 'Legeerklæring' })).toBeVisible();
    await page.locator('input[name="legeerklæring"]').setInputFiles('e2e/playwright/files/navlogopng.png');
    await page.getByRole('button', { name: 'Neste', exact: true }).click();

    /** Oppsummering */
    await expect(page.getByRole('heading', { level: 1, name: 'Oppsummering' })).toBeVisible();
    await page
        .getByLabel(
            'Jeg bekrefter at opplysningene jeg har gitt er riktige, og at jeg ikke har holdt tilbake opplysninger som har betydning for min rett til pleiepenger.',
        )
        .check();
    await page.getByRole('button', { name: 'Send inn søknaden', exact: true }).click();

    /** Kvittering */
    await page.waitForURL('**/soknad-sendt');
    const heading = await page.getByRole('heading', {
        level: 2,
        name: 'Vi har mottatt søknaden din om pleiepenger for sykt barn',
    });
    await expect(heading).toBeVisible();
});
