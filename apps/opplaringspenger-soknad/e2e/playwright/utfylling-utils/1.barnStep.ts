import { Page } from '@playwright/test';

export const fyllUtBarnStep = async (page: Page) => {
    await page.getByRole('heading', { level: 1, name: 'Om personen du pleier' });
    await page.getByText('ALFABETISK FAGGOTT').click();
    await page.getByTestId('typedFormikForm-submitButton').click();
};
