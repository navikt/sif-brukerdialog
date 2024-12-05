import { expect, Page } from '@playwright/test';
import { lastOppDokument } from '../utils/dokumentUtils';

export const fyllUtRegistrertBarn = async (page: Page) => {
    await page.getByRole('heading', { level: 1, name: 'Om personen du pleier' });
    await page.getByText('ALFABETISK FAGGOTT').click();
    await page.getByTestId('typedFormikForm-submitButton').click();
};

export const fyllUtAnnetBarn = async (page: Page) => {
    await page.getByRole('heading', { level: 1, name: 'Om personen du pleier' });
    await page.getByLabel('Søknaden gjelder et annet barn').check();
    await page.getByLabel('Barnet har ikke fødselsnummer').check();
    await page.locator('label').filter({ hasText: 'Barnet bor i utlandet' }).click();
    await page.getByLabel('Barnets navn').fill('Erik');
    await page.getByRole('button', { name: 'Åpne datovelger' }).click();
    await page.getByLabel('onsdag 4').click();
    await page.getByText('Fosterforelder').click();
    await lastOppDokument(page, page.locator('input[type="file"]'), './e2e/playwright/files/navlogopng.png');
    await page.getByTestId('typedFormikForm-submitButton').click();
};

export const kontrollerRegistrertBarnOppsummering = async (page: Page) => {
    await expect(page.getByRole('heading', { name: 'Om barnet' })).toBeVisible();
    await expect(page.getByText('NavnALFABETISK FAGGOTT')).toBeVisible();
    await expect(page.getByText('Fødselsdato08.06.2019')).toBeVisible();
};
export const kontrollerAnnetBarnOppsummering = async (page: Page) => {
    await expect(page.getByRole('heading', { name: 'Om barnet' })).toBeVisible();
    await expect(page.getByText('Fødselsdato04.12.2024')).toBeVisible();
    await expect(page.getByText('NavnErik')).toBeVisible();
    await expect(page.getByText('Uten fødselsnummer/D-nummerBarnet bor i utlandet')).toBeVisible();
    await expect(page.getByText('FødselsattestIkonnavlogopng.')).toBeVisible();
    await expect(page.getByText('Relasjon til barnetFosterforelder')).toBeVisible();
};
