import { expect, Page } from '@playwright/test';

export const fyllUtBarnStep = async (page: Page) => {
    await page.getByRole('heading', { level: 1, name: 'Om personen du pleier' });
    await page.getByText('ALFABETISK FAGGOTT').click();
    await page.getByTestId('typedFormikForm-submitButton').click();
};

export const kontrollerBarnOppsummering = async (page: Page) => {
    await expect(page.getByRole('heading', { name: 'Om barnet' })).toBeVisible();
    await expect(page.getByText('NavnALFABETISK FAGGOTT')).toBeVisible();
    await expect(page.getByText('Fødselsdato08.06.2019')).toBeVisible();
};
