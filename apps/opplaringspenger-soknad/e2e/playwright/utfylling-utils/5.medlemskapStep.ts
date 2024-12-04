import { expect } from '@playwright/test';
import { Page } from '@playwright/test';

export const fyllUtMedlemskap = async (page: Page) => {
    await expect(page.getByRole('heading', { level: 1, name: 'Medlemskap' })).toBeVisible();
    await page.getByRole('group', { name: 'Har du bodd i utlandet i hele' }).getByLabel('Nei').check();
    await page.getByRole('group', { name: 'Har du bodd i utlandet i hele' }).getByLabel('Ja').check();
    await page.getByRole('button', { name: 'Legg til utenlandsopphold' }).click();
    await page
        .locator('div')
        .filter({ hasText: /^Fra og medÅpne datovelger$/ })
        .getByRole('button')
        .click();
    await page.getByRole('button', { name: 'Gå til forrige måned' }).click();
    await page.getByRole('button', { name: 'Gå til forrige måned' }).click();
    await page.getByLabel('tirsdag 1', { exact: true }).click();
    await page
        .locator('div')
        .filter({ hasText: /^Til og medÅpne datovelger$/ })
        .getByRole('button')
        .click();
    await page.getByRole('button', { name: 'Gå til forrige måned' }).click();
    await page.getByRole('button', { name: 'fredag 1', exact: true }).click();
    await page.getByLabel('Velg land').selectOption('BHS');
    await page.getByRole('button', { name: 'Ok' }).click();
    await page.getByText('Nei').nth(1).click();
    await page.getByTestId('typedFormikForm-submitButton').click();
};
