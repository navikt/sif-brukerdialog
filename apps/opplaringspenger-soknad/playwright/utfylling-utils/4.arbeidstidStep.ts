import { expect, Page } from '@playwright/test';

import { testAccessibility } from '../utils/testAccessibility';

export const fyllUtArbeidstid = async (page: Page) => {
    await expect(
        page.getByRole('heading', { level: 1, name: 'Fravær fra jobb på dagene du er i opplæring' }),
    ).toBeVisible();
    await page
        .getByRole('group', { name: 'Hvor mye fravær har du fra jobb hos SNODIG FISKER' })
        .getByLabel('Jeg er delvis borte')
        .check();
    await page.getByRole('group', { name: 'mandag 2. desember' }).getByLabel('Timer').click();
    await page.getByRole('group', { name: 'mandag 2. desember' }).getByLabel('Timer').fill('5');
    await page.getByRole('group', { name: 'Uke 49' }).getByLabel('Timer').first().click();
    await page.getByRole('group', { name: 'Uke 49' }).getByLabel('Timer').first().fill('5');
    await page.getByRole('group', { name: 'fredag 6. desember' }).getByLabel('Minutt').click();
    await page.getByRole('group', { name: 'fredag 6. desember' }).getByLabel('Minutt').fill('30');
    await page
        .getByRole('group', { name: 'Hvor mye fravær har du fra jobb som frilanser' })
        .getByLabel('Jeg jobber som normalt')
        .check();
    await testAccessibility(page);
    await page.getByTestId('typedFormikForm-submitButton').click();
};

export const kontrollerArbeidstidOppsummering = async (page: Page) => {
    await expect(page.getByRole('heading', { name: 'Timer med fravær' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'SNODIG FISKER (' }).nth(1)).toBeVisible();
    await expect(page.getByText('Jeg er delvis borte fra jobb fordi jeg er på')).toBeVisible();
    await expect(page.getByText('mandag 02.12.2024:5 timer 0')).toBeVisible();
    await expect(page.getByText('fredag 06.12.2024:0 timer 30')).toBeVisible();
    await expect(page.getByText('fredag 06.12.2024:0 timer 30')).toBeVisible();
    await expect(page.getByText('FrilanserJeg jobber som normalt')).toBeVisible();
};
