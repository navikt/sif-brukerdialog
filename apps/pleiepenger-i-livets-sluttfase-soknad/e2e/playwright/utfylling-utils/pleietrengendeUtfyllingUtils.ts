import { Page, expect } from '@playwright/test';

export const fyllUtPleietrengendeMedFnr = async (page: Page) => {
    await expect(page.getByRole('heading', { level: 1, name: 'Om personen du pleier' })).toBeVisible();
    await page.getByLabel('Navn på den du skal pleie').fill('Test Testesen');
    await page.getByRole('textbox', { name: 'Fødselsnummer/D-nummer' }).fill('27857798800');
    await page.getByRole('group', { name: 'Er dere flere som skal dele på pleiepengene?' }).getByLabel('Ja').check();
};

export const kontrollerPleietrengendeMedFnr = async (page: Page) => {
    await expect(await page.getByRole('heading', { level: 1, name: 'Oppsummering' })).toBeVisible();
    await expect(await page.getByText('Test TestesenFødselsnummer: 2 7 8 5 7 7 9 8 8 0 027857798800')).toBeTruthy();
};

export const fyllUtPleietrengendeUtenFnr = async (page: Page) => {
    await page.getByLabel('Personen har ikke fødselsnummer/D-nummer').check();
    await page.getByRole('button', { name: 'Åpne datovelger' }).click();
    await page.getByLabel('År', { exact: true }).selectOption('1994');
    await page.getByLabel('Måned', { exact: true }).selectOption('3');
    await page.getByLabel('Mandag 4').click();
    await page.getByText('Annet').click();
    await page.getByRole('button', { name: 'Last opp ID' }).click();

    await expect(page.locator('.attachmentListElement')).toHaveCount(0);
    await page.locator('input[name="pleietrengendeId"]').setInputFiles('./e2e/playwright/files/navlogopng.png');
    await expect(page.locator('.attachmentListElement')).toHaveCount(1);
    await expect(page.getByText('navlogopng.png').isVisible()).toBeTruthy();
};

export const kontrollerPleietrengendeUtenFnr = async (page: Page) => {
    /** Kontroller oppsummering */
    await expect(await page.getByText('Test Testesen').isVisible()).toBeTruthy();
    await expect(await page.getByText('Fødselsdato: 04.04.1994').isVisible()).toBeTruthy();
    await expect(await page.locator('a').getByText('navlogopng.png').nth(0).isVisible()).toBeTruthy();
    await expect(
        await page.getByText('Oppgitt grunn for at hen ikke har fødselsnummer eller D-nummer: Annet').isVisible(),
    ).toBeTruthy();
    await expect(await page.getByText('Er dere flere som skal dele på pleiepengene?Nei').isVisible()).toBeTruthy();
};
