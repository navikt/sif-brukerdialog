import { expect, Page } from '@playwright/test';

export const fyllUtArbeidstid = async (page: Page) => {
    await expect(page.getByRole('heading', { level: 1, name: 'Jobb i søknadsperioden' })).toBeVisible();
    await page.getByRole('group', { name: 'Skal du jobbe noe de dagene' }).getByText('Ja').click();
    await page
        .getByRole('group', { name: 'I dagene du søker for, hvilken situasjon gjelder for deg hos Arbeids- og' })
        .getByLabel('Jeg jobber noe de dagene jeg')
        .check();
    await page.getByRole('group', { name: 'mandag 2. desember' }).getByLabel('Timer').click();
    await page.getByRole('group', { name: 'mandag 2. desember' }).getByLabel('Timer').fill('5');
    await page.getByRole('group', { name: 'Uke 50' }).getByLabel('Timer').click();
    await page.getByRole('group', { name: 'Uke 50' }).getByLabel('Timer').fill('5');
    await page.getByRole('group', { name: 'fredag 6. desember' }).getByLabel('Minutt').click();
    await page.getByRole('group', { name: 'fredag 6. desember' }).getByLabel('Minutt').fill('30');
    await page
        .getByRole('group', { name: 'I dagene du søker for, hvilken situasjon gjelder for deg som frilanser?' })
        .getByLabel('Jeg jobber som normalt, og')
        .check();
    await page.getByTestId('typedFormikForm-submitButton').click();
};

export const kontrollerArbeidstidOppsummering = async (page: Page) => {
    await expect(page.getByRole('heading', { name: 'Jobb i søknadsperioden' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Arbeids- og velferdsetaten (' }).nth(1)).toBeVisible();
    await expect(page.getByText('Jeg jobber noe de dagene jeg')).toBeVisible();
    await expect(page.getByText('Jeg jobber noe de dagene jeg')).toBeVisible();
    await expect(page.getByText('mandag 02.12.2024:5 timer 0')).toBeVisible();
    await expect(page.getByText('fredag 06.12.2024:0 timer 30')).toBeVisible();
    await expect(page.getByText('fredag 06.12.2024:0 timer 30')).toBeVisible();
    await expect(page.getByText('FrilanserJeg jobber som')).toBeVisible();
};
