import { Page, expect } from '@playwright/test';

export const fyllUtPleietrengendeMedFnr = async (page: Page) => {
    await page.getByRole('heading', { level: 1, name: 'Om personen du pleier' });
    await page.getByLabel('Navn på den du skal pleie').fill('Test Testesen');
    await page.getByRole('textbox', { name: 'Fødselsnummer/D-nummer' }).fill('27857798800');
    await page.getByRole('group', { name: 'Er dere flere som skal dele på pleiepengene?' }).getByLabel('Ja').check();
};

export const kontrollerPleietrengendeMedFnr = async (page: Page) => {
    await expect(page.getByRole('heading', { level: 1, name: 'Oppsummering' })).toBeVisible();
    await expect(page.getByText('Test TestesenFødselsnummer: 2 7 8 5 7 7 9 8 8 0 027857798800')).toBeTruthy();
};
