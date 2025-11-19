import { expect, test } from '@playwright/test';

import { MockScenario, setupMockRoutes } from '../utils/setup-mock-routes';

test('Ingen sak, ingen søknad', async ({ page }) => {
    await setupMockRoutes(page, MockScenario.INGEN_SAK_ELLER_SOKNADER);

    await page.goto('http://localhost:8080/innsyn');
    await expect(page.getByRole('heading', { level: 1, name: 'Dine pleiepenger for sykt barn' })).toBeVisible();
    await expect(page.getByText('Vi finner ingen sak om pleiepenger for sykt barn')).toBeVisible();
});

test('Ingen sak, men søknader', async ({ page }) => {
    await setupMockRoutes(page, MockScenario.KUN_SØKNADER);

    await page.goto('http://localhost:8080/innsyn');
    await expect(page.getByRole('heading', { level: 1, name: 'Dine pleiepenger for sykt barn' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Dine søknader, endringer og' })).toBeVisible();

    await page
        .getByLabel('Søknad om pleiepenger sykt barnMottatt: tirsdag 16. september 2025, kl. 11:')
        .getByRole('button', { name: 'Vis mer' })
        .click();

    await expect(page.getByRole('link', { name: 'Dokumentikon Søknad om' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Søknad og eventuelle vedlegg' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Dokumentikon Bekreftelse til' })).toBeVisible();
});
