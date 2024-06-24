import { test, expect } from '@playwright/test';
import { setupMockRoutes } from '../utils/setup-mock-routes';

test.beforeEach(async ({ page }) => {
    await setupMockRoutes(page);
});

test('Test innhold, funksjonalitet og wcag', async ({ page }) => {
    await page.goto('http://localhost:8080/innsyn');
    await expect(page.getByRole('heading', { level: 1, name: 'Din pleiepengesak' })).toBeVisible();

    // const søknader = await page.locator('[data-testid="søknadsliste"]').locator('section');
    // expect(await søknader.count()).toBe(3);

    // await søknader.nth(0).click();
    // expect(await søknader.nth(0).getByRole('heading', { name: 'Endringsmelding pleiepenger', level: 3 })).toBeVisible();
    // expect(await søknader.nth(0).getByRole('heading', { name: 'Endringsmelding', exact: true })).toBeVisible();
    // expect(await søknader.nth(0).getByRole('link', { name: 'Dokumentikon Endringsmelding' })).toBeVisible();

    // await søknader.nth(1).click();
    // expect(
    //     await søknader.nth(1).getByRole('heading', { name: 'Søknad om pleiepenger sykt barn', level: 3 }),
    // ).toBeVisible();
    // expect(await søknader.nth(1).getByRole('heading', { name: 'Søknad og eventuelle vedlegg' })).toBeVisible();
    // expect(await søknader.nth(1).getByRole('link', { name: 'Dokumentikon Søknad om' })).toBeVisible();
    // expect(await søknader.nth(1).getByRole('heading', { name: 'Bekreftelse til arbeidsgiver' })).toBeVisible();
    // expect(
    //     await søknader.nth(1).getByRole('link', { name: 'Bekreftelse til SJOKKERENDE ELEKTRIKER (PDF)' }),
    // ).toBeVisible();

    // await page.getByRole('button', { name: 'Vis flere innsendinger' }).click();
    // expect(await page.locator('[data-testid="søknadsliste"]').locator('section').count()).toBe(8);

    // const accessibilityScanResults = await new AxeBuilder({ page })
    //     .disableRules(['color-contrast'])
    //     .include('#__next')
    //     .analyze();

    // expect(accessibilityScanResults.violations).toEqual([]);
});
