import { expect, Page } from '@playwright/test';

export const fyllUtArbeidssituasjonStep = async (page: Page) => {
    await expect(page.getByRole('heading', { level: 1, name: 'Din arbeidssituasjon' })).toBeVisible();
    await page
        .getByRole('group', {
            name: 'Stemmer det at du er ansatt hos Arbeids- og velferdsetaten i perioden du søker for?',
        })
        .getByLabel('Ja')
        .check();
    await page
        .getByLabel('Hvor mange timer jobber du normalt per uke hos Arbeids- og velferdsetaten når du ikke har fravær?')
        .click();
    await page
        .getByLabel('Hvor mange timer jobber du normalt per uke hos Arbeids- og velferdsetaten når du ikke har fravær?')
        .fill('37,5');
    await page.getByRole('group', { name: 'Er du frilanser i perioden du' }).getByLabel('Ja').check();
    await page.getByRole('button', { name: 'Åpne datovelger' }).click();
    await page.getByLabel('År', { exact: true }).selectOption('2021');
    await page.getByLabel('mandag 6').click();
    await page.getByRole('group', { name: 'Jobber du fortsatt som' }).getByLabel('Ja').check();
    await page.getByLabel('Hvor mange timer jobber du normalt per uke som frilanser når du ikke har fravær?').click();
    await page
        .getByLabel('Hvor mange timer jobber du normalt per uke som frilanser når du ikke har fravær?')
        .fill('20');
    await page
        .getByRole('group', { name: 'Er du selvstendig næringsdrivende i perioden du søker for?' })
        .getByLabel('Nei')
        .check();
    await page
        .getByRole('group', {
            name: 'Har du jobbet som arbeidstaker eller frilanser i et annet EØS-land i løpet av de 3 siste månedene før perioden du søker om?',
        })
        .getByLabel('Nei')
        .check();
    await page
        .getByRole('group', {
            name: 'Har du jobbet som selvstendig næringsdrivende i et annet EØS-land i løpet av de 3 siste årene før perioden du søker om?',
        })
        .getByLabel('Nei')
        .check();
    await page.getByTestId('typedFormikForm-submitButton').click();
};

export const kontrollerArbeidssituasjonOppsummering = async (page: Page) => {
    await expect(
        page.getByText('Arbeids- og velferdsetaten (organisasjonsnummer 123451234) Er ansatt i'),
    ).toBeVisible();
    await expect(page.getByText('Jobber normalt 20 timer per')).toBeVisible();
    await expect(page.getByText('FrilanserStartet som frilanser 06.12.2021')).toBeVisible();
    await expect(page.getByText('Er ikke selvstendig næ')).toBeVisible();
    await expect(
        page.getByText('Har ikke jobbet som arbeidstaker eller frilanser i et annet EØS-land i løpet av'),
    ).toBeVisible();
    await expect(
        page.getByText('Har ikke jobbet som selvstendig næringsdrivende i et annet EØS-land i løpet av'),
    ).toBeVisible();
};
