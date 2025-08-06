import AxeBuilder from '@axe-core/playwright'; // 1
import { expect, test } from '@playwright/test';
import { registerMockRoutes } from '../utils/registerMockRoutes';
import { setNow } from '../utils/setNow';
import { memoryStore } from '../../mock/state/memoryStore';
import { ScenarioType } from '../../mock/scenarios/types';

test.beforeEach(async ({ page, context }) => {
    await setNow(page);
    await registerMockRoutes(page, context);
});

const testAccessibility = async (page) => {
    const accessibilityScanResults = await new AxeBuilder({ page }).disableRules('color-contrast').analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
};

test('Fyll ut søknad og kontroller oppsummering', async ({ page }) => {
    memoryStore.setScenario(ScenarioType.harIkkeSøkt);

    await page.goto(`./`);

    // 1. Accessibility test before starting the application
    await testAccessibility(page);

    await page.getByRole('heading', { name: 'Hei Test!' }).click();
    await page.getByRole('checkbox', { name: 'Jeg vil svare så godt jeg kan' }).check();
    await page.getByRole('button', { name: 'Start søknad' }).click();

    await testAccessibility(page);

    await page.getByText('Er kontonummeret ditt 1234 56').click();
    await page.getByRole('radio', { name: 'Ja' }).check();
    await page.getByRole('radio', { name: 'Nei' }).check();
    await page.getByText('Vi anbefaler at du endrer').click();
    await page.getByRole('button', { name: 'Neste steg' }).click();

    await testAccessibility(page);

    await page.getByText('ALFABETISK TURLØYPE').click();
    await page.getByRole('radio', { name: 'Ja' }).check();
    await page.getByRole('radio', { name: 'Nei' }).check();
    await page.getByRole('heading', { name: 'Vi henter opplysninger fra' }).click();
    await page.getByRole('button', { name: 'Neste steg' }).click();
    await page.locator('header').filter({ hasText: 'Kontonummer for' }).getByRole('link').click();
    await page.getByRole('radio', { name: 'Ja' }).check();
    await page.getByRole('button', { name: 'Neste steg' }).click();

    await testAccessibility(page);
    await page.getByRole('radio', { name: 'Ja' }).check();
    await page.getByRole('button', { name: 'Neste steg' }).click();

    await testAccessibility(page);
    await page.getByText('Er kontonummeret ditt 1234 56 78901?Ja').click();
    await page.getByText('Barn vi har registrert på deg:ALFABETISK TURLØYPE').click();
    await page.getByText('Stemmer opplysningen om barnet?Ja').click();
    await page.getByRole('checkbox', { name: 'Jeg bekrefter at' }).check();
    await page.locator('header').filter({ hasText: 'Kontonummer for' }).getByRole('link').click();
    await page.getByRole('radio', { name: 'Nei' }).check();
    await page.getByRole('button', { name: 'Neste steg' }).click();
    await page.getByRole('radio', { name: 'Nei' }).check();
    await page.getByRole('button', { name: 'Neste steg' }).click();
    await page.getByText('Er kontonummeret ditt 1234 56 78901?Nei').click();
    await page.getByText('Barn vi har registrert på deg:ALFABETISK TURLØYPE').click();
    await page.getByText('Stemmer opplysningen om barnet?Nei').click();
    await page.getByRole('checkbox', { name: 'Jeg bekrefter at' }).check();
    await page.getByRole('button', { name: 'Send søknad' }).click();
    await expect(page.getByText('Søknaden er sendt!Vi har fått')).toBeVisible();
    await testAccessibility(page);
});
