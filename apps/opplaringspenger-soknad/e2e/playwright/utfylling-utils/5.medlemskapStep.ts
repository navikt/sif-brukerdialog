import { expect, Page } from '@playwright/test';

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

export const kontrollerMedlemskap = async (page: Page) => {
    await expect(page.getByRole('heading', { name: 'Arbeids- og velferdsetaten (' }).nth(1)).toBeVisible();
    await expect(page.getByText('Har du bodd i utlandet i de siste 12 månedene?Ja')).toBeVisible();
    await expect(page.getByText('Utenlandsopphold siste 12 måneder1. okt. 2024 - 1. nov. 2024Bahamas')).toBeVisible();
    await expect(page.getByText('Skal du bo i utlandet i de neste 12 månedene?Nei')).toBeVisible();
};
