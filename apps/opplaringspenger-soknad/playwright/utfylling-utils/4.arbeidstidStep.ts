import { expect, Page } from '@playwright/test';

import { testAccessibility } from '../utils/testAccessibility';

export const fyllUtArbeidstid = async (page: Page) => {
    await expect(page.getByRole('heading', { level: 1, name: 'Fravær i søknadsperioden' })).toBeVisible();
    await page
        .getByRole('radiogroup', { name: 'Hvor mye fravær har du hos SNODIG FISKER' })
        .getByLabel('Jeg er delvis borte')
        .check();
    await page.getByRole('group', { name: 'mandag 2. desember' }).getByLabel('Timer').fill('5');
    await page.getByRole('group', { name: 'tirsdag 3. desember' }).getByLabel('Timer').fill('0');
    await page.getByRole('group', { name: 'onsdag 4. desember' }).getByLabel('Timer').fill('0');
    await page.getByRole('group', { name: 'torsdag 5. desember' }).getByLabel('Timer').fill('0');
    await page.getByRole('group', { name: 'fredag 6. desember' }).getByLabel('Minutt').fill('30');

    await page
        .getByRole('radiogroup', { name: 'Hvor mye fravær har du som frilanser' })
        .getByLabel('Jeg er ikke borte')
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
    await expect(
        page.getByText('Hvor mye fravær har du som frilanser på grunn av opplæring og reisetid?Jeg er ikke borte fra'),
    ).toBeVisible();
};
