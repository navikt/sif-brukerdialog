import { Page, expect } from '@playwright/test';

const fyllUtMedlemskapSteg = async (page: Page) => {
    await expect(page.getByRole('heading', { level: 1, name: 'Medlemskap' })).toBeVisible();
    await page
        .getByRole('group', { name: 'Har du bodd i utlandet i hele eller deler av de siste 12 månedene?' })
        .getByLabel('Ja')
        .check();

    await page
        .getByRole('group', { name: 'Planlegger du å bo i utlandet i hele eller deler av de neste 12 månedene?' })
        .getByLabel('Ja')
        .check();

    await page.getByRole('button', { name: 'Legg til nytt utenlandsopphold' }).first().click();
    await page.getByLabel('Fra og med').fill('10.08.2023');
    await page.getByLabel('Til og med').fill('11.08.2023');
    await page.getByLabel('Velg land').selectOption('ABW');
    await page.getByLabel('Utenlandsopphold siste 12 måneder').getByTestId('typedFormikForm-submitButton').click();

    await page.getByRole('button', { name: 'Legg til nytt utenlandsopphold' }).nth(1).click();
    await page.getByLabel('Fra og med').fill('01.01.2024');
    await page.getByLabel('Til og med').fill('10.02.2024');
    await page.getByLabel('Velg land').selectOption('AZE');
    await page.getByLabel('Utenlandsopphold neste 12 måneder').getByTestId('typedFormikForm-submitButton').click();
};

export const medlemskapSteg = {
    fyllUtMedlemskapSteg,
};
