import { test } from '@playwright/test';
import { setNow } from '../utils/setNow';
import { setupMockRoutes } from '../utils/setupMockRoutes';

test.beforeEach(async ({ page, context }) => {
    await setNow(page);
    await setupMockRoutes(page, context);
});

test('Fyll ut søknad og kontroller oppsummering', async ({ page }) => {
    await page.goto(`./`);
    await page.getByRole('heading', { name: 'Hei Test!' }).click();
    await page.getByRole('checkbox', { name: 'Jeg vil svare så godt jeg kan' }).check();
    await page.getByRole('button', { name: 'Start søknad' }).click();
    await page.getByText('Er kontonummeret ditt 1234 56').click();
    await page.getByRole('radio', { name: 'Ja' }).check();
    await page.getByRole('radio', { name: 'Nei' }).check();
    await page.getByText('Vi anbefaler at du endrer').click();
    await page.getByRole('button', { name: 'Neste steg' }).click();
    await page.getByText('ALFABETISK TURLØYPE').click();
    await page.getByRole('radio', { name: 'Ja' }).check();
    await page.getByRole('radio', { name: 'Nei' }).check();
    await page.getByRole('heading', { name: 'Vi henter opplysninger fra' }).click();
    await page.getByRole('button', { name: 'Neste steg' }).click();
    await page.locator('header').filter({ hasText: 'Kontonummer for' }).getByRole('link').click();
    await page.getByRole('radio', { name: 'Ja' }).check();
    await page.getByRole('button', { name: 'Neste steg' }).click();
    await page.getByRole('radio', { name: 'Ja' }).check();
    await page.getByRole('button', { name: 'Neste steg' }).click();
    await page.getByText('Stemmer det at kontonummeret ditt er 1234 56 78901?Ja').click();
    await page.getByText('Barn vi har registrert på deg:ALFABETISK TURLØYPE').click();
    await page.getByText('Stemmer informasjonen om barnet?Ja').click();
    await page.getByRole('checkbox', { name: 'Jeg bekrefter at' }).check();
    await page.locator('header').filter({ hasText: 'Kontonummer for' }).getByRole('link').click();
    await page.getByText('Nei').click();
    await page.getByRole('button', { name: 'Neste steg' }).click();
    await page.getByText('Nei').click();
    await page.getByRole('button', { name: 'Neste steg' }).click();
    await page.getByText('Stemmer det at kontonummeret ditt er 1234 56 78901?Nei').click();
    await page.getByText('Barn vi har registrert på deg:ALFABETISK TURLØYPE').click();
    await page.getByText('Stemmer informasjonen om barnet?Nei').click();
    await page.getByRole('checkbox', { name: 'Jeg bekrefter at' }).check();
    await page.getByRole('button', { name: 'Send søknad' }).click();
    await page.getByText('Søknaden er sendt!Vi har fått').click();
});
