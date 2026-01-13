import { expect, test } from '@playwright/test';

import { MockScenario, setupMockRoutes } from '../utils/setup-mock-routes';
import { testAccessibility } from '../utils/testAccessibility';

test.beforeEach(async ({ page }) => {
    await setupMockRoutes(page, MockScenario.TO_SAKER);
});

test('Velg sak ved flere saker', async ({ page }) => {
    await page.goto('http://localhost:8080/innsyn');
    await expect(page.getByRole('heading', { level: 1, name: 'Dine pleiepenger for sykt barn' })).toBeVisible();

    await expect(page.getByText('BEVISST SANSFødt 14. april')).toBeVisible();
    await expect(page.getByText('GOD BALSAMFødt 22. desember')).toBeVisible();

    await testAccessibility(page);

    await page.getByRole('link', { name: 'BEVISST SANS' }).click();

    await expect(page.getByText('Saksnummer: 100097Y')).toBeVisible();
});

test('Saksdetaljer + historikk', async ({ page }) => {
    await page.goto('http://localhost:8080/innsyn');
    await expect(page.getByRole('heading', { level: 1, name: 'Dine pleiepenger for sykt barn' })).toBeVisible();

    await expect(page.getByText('BEVISST SANSFødt 14. april')).toBeVisible();
    await expect(page.getByText('GOD BALSAMFødt 22. desember')).toBeVisible();

    await page.getByRole('link', { name: 'BEVISST SANS' }).click();

    await expect(page.getByText('Saksnummer: 100097Y|')).toBeVisible();
    await expect(
        page.getByText('Vi har fått søknaden din om pleiepenger13.09.2025, kl. 14:21Se dokumenter og'),
    ).toBeVisible();
    await page.getByRole('button', { name: 'Se dokumenter og bekreftelse' }).click();
    await expect(
        page.getByText('Søknad og eventuelle vedlegg i søknadDokumentikon PDFSøknad om pleiepenger for'),
    ).toBeVisible();

    await testAccessibility(page);

    await page.getByRole('link', { name: 'Se alle hendelser' }).click();

    await expect(page.getByRole('heading', { level: 1, name: 'Historikk' })).toBeVisible();
    await testAccessibility(page);

    await page.getByRole('link', { name: 'Tilbake til sak' }).click();

    await expect(page.getByRole('heading', { level: 1, name: 'Din pleiepengesak for sykt barn' })).toBeVisible();
    await expect(page.getByText('Saksnummer: 100097Y|')).toBeVisible();
});

test('Bytte mellom sak', async ({ page }) => {
    await page.goto('http://localhost:8080/innsyn');
    await expect(page.getByRole('heading', { level: 1, name: 'Dine pleiepenger for sykt barn' })).toBeVisible();

    await expect(page.getByText('BEVISST SANSFødt 14. april')).toBeVisible();
    await expect(page.getByText('GOD BALSAMFødt 22. desember')).toBeVisible();

    await page.getByRole('link', { name: 'BEVISST SANS' }).click();

    await expect(page.getByText('Saksnummer: 100097Y')).toBeVisible();

    await page.getByRole('link', { name: 'Dine pleiepengesaker' }).click();
    await expect(page.getByRole('heading', { level: 1, name: 'Dine pleiepenger for sykt barn' })).toBeVisible();

    await page.getByRole('link', { name: 'GOD BALSAM' }).click();
    await expect(page.getByText('Saksnummer: 1001F8G')).toBeVisible();

    await testAccessibility(page);
});
