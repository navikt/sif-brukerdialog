import { expect, Page } from '@playwright/test';

export const fyllUtOpplæringEnkeltdag = async (page: Page) => {
    await page.getByRole('heading', { name: 'Om opplæringen' }).isVisible();
    await page.getByRole('combobox', { name: 'Hvor foregår opplæringen?' }).click();
    await page.getByRole('combobox', { name: 'Hvor foregår opplæringen?' }).press('ArrowDown');
    await page.getByRole('combobox', { name: 'Hvor foregår opplæringen?' }).press('ArrowDown');
    await page.getByRole('combobox', { name: 'Hvor foregår opplæringen?' }).press('Enter');

    await page.getByRole('radio', { name: 'Enkeltdag' }).check();
    await page.getByRole('button', { name: 'Åpne datovelger' }).click();
    await page.getByRole('button', { name: 'mandag 2', exact: true }).click();
    await page.getByRole('group', { name: 'Timer med opplæring' }).getByLabel('Timer').click();
    await page.getByRole('group', { name: 'Timer med opplæring' }).getByLabel('Timer').fill('5');
    await page.getByRole('group', { name: 'Timer med reise', exact: true }).getByLabel('Timer').click();
    await page.getByRole('group', { name: 'Timer med reise', exact: true }).getByLabel('Timer').fill('4');
    await page.getByRole('group', { name: 'Timer med reise', exact: true }).getByLabel('Timer').press('Tab');
    await page.getByRole('group', { name: 'Timer med reise', exact: true }).getByLabel('Minutter').fill('30');
    await page.getByTestId('typedFormikForm-submitButton').click();
};

export const fyllUtOpplæringFlereEnkeltdager = async (page: Page) => {
    await page.getByRole('heading', { name: 'Om opplæringen' }).isVisible();
    await page.getByRole('combobox', { name: 'Hvor foregår opplæringen?' }).click();
    await page.getByRole('combobox', { name: 'Hvor foregår opplæringen?' }).press('ArrowDown');
    await page.getByRole('combobox', { name: 'Hvor foregår opplæringen?' }).press('ArrowDown');
    await page.getByRole('combobox', { name: 'Hvor foregår opplæringen?' }).press('Enter');

    await page.getByRole('radio', { name: 'Enkeltdag' }).check();
    await page.getByRole('button', { name: 'Åpne datovelger' }).click();
    await page.getByRole('button', { name: 'mandag 2', exact: true }).click();
    await page.getByRole('group', { name: 'Timer med opplæring' }).getByLabel('Timer').click();
    await page.getByRole('group', { name: 'Timer med opplæring' }).getByLabel('Timer').fill('5');
    await page.getByRole('group', { name: 'Timer med reise', exact: true }).getByLabel('Timer').click();
    await page.getByRole('group', { name: 'Timer med reise', exact: true }).getByLabel('Timer').fill('4');
    await page.getByRole('group', { name: 'Timer med reise', exact: true }).getByLabel('Timer').press('Tab');
    await page.getByRole('group', { name: 'Timer med reise', exact: true }).getByLabel('Minutter').fill('30');
    await page.getByRole('button', { name: 'Legg til ny dag' }).click();
    await page.getByRole('button', { name: 'Åpne datovelger' }).nth(1).click();
    await page.getByRole('button', { name: 'onsdag 11' }).click();
    await page.getByRole('textbox', { name: 'Timer' }).nth(2).click();
    await page.getByRole('textbox', { name: 'Timer' }).nth(2).fill('2');
    await page.getByRole('textbox', { name: 'Timer' }).nth(3).click();
    await page.getByRole('textbox', { name: 'Timer' }).nth(3).fill('5');
    await page.getByTestId('typedFormikForm-submitButton').click();
};

export const fyllUtOpplæringEnPeriode = async (page: Page) => {
    await page.getByRole('heading', { name: 'Om opplæringen' }).isVisible();
    await page.getByRole('combobox', { name: 'Hvor foregår opplæringen?' }).click();
    await page.getByRole('combobox', { name: 'Hvor foregår opplæringen?' }).press('ArrowDown');
    await page.getByRole('combobox', { name: 'Hvor foregår opplæringen?' }).press('ArrowDown');
    await page.getByRole('combobox', { name: 'Hvor foregår opplæringen?' }).press('Enter');
    await page.getByRole('radio', { name: 'Periode' }).check();
    await leggTilPeriode1(page);
    await leggTilReisedag(page);
    await leggTilFerie(page);
    await leggTilUtenlandsopphold(page);
    await page.getByTestId('typedFormikForm-submitButton').click();
};

export const fyllUtOpplæringToPerioder = async (page: Page) => {
    await page.getByRole('heading', { name: 'Om opplæringen' }).isVisible();
    await page.getByRole('combobox', { name: 'Hvor foregår opplæringen?' }).click();
    await page.getByRole('combobox', { name: 'Hvor foregår opplæringen?' }).press('ArrowDown');
    await page.getByRole('combobox', { name: 'Hvor foregår opplæringen?' }).press('ArrowDown');
    await page.getByRole('combobox', { name: 'Hvor foregår opplæringen?' }).press('Enter');
    await page.getByRole('radio', { name: 'Periode' }).check();
    await page.getByRole('button', { name: 'Legg til ny periode' }).click();
    await leggTilPeriode1(page);
    await leggTilPeriode2(page);
    await leggTilReisedag(page);
    await leggTilFerie(page);
    await svarIngenUtenlandsopphold(page);
    await page.getByTestId('typedFormikForm-submitButton').click();
};

const leggTilPeriode1 = async (page: Page) => {
    await page.getByRole('button', { name: 'Åpne datovelger' }).nth(0).click();
    await page.getByRole('button', { name: 'mandag 2', exact: true }).click();
    await page.getByRole('button', { name: 'Åpne datovelger' }).nth(1).click();
    await page.getByRole('button', { name: 'søndag 8' }).click();
};

const leggTilPeriode2 = async (page: Page) => {
    await page.getByRole('group', { name: 'Periode 2' }).getByRole('button').nth(0).click();
    await page.getByRole('button', { name: 'mandag 16', exact: true }).click();
    await page.getByRole('group', { name: 'Periode 2' }).getByRole('button').nth(1).click();
    await page.getByRole('button', { name: 'tirsdag 17' }).click();
};

const leggTilReisedag = async (page: Page) => {
    await page
        .getByRole('group', { name: 'Reiser du på dager du ikke har kurs eller opplæring' })
        .getByLabel('Ja')
        .check();
    await page.getByRole('button', { name: 'Legg til reisedag' }).click();
    await page
        .getByLabel('Reisedager')
        .locator('div')
        .filter({ hasText: /^Velg datoÅpne datovelger$/ })
        .getByRole('button')
        .click();
    await page.getByRole('button', { name: 'tirsdag 3', exact: true }).click();
    await page.getByRole('button', { name: 'Ok' }).click();
    await page.getByLabel('Årsak for reisetid').fill('kombinerer med ferie');
    await page.getByLabel('Årsak for reisetid').blur();
};

const leggTilFerie = async (page: Page) => {
    await page.getByRole('group', { name: 'Skal du ha ferie i løpet av søknadsperioden' }).getByLabel('Ja').check();
    await page.getByRole('group', { name: 'Ferie i perioden' }).click();
    await page.getByRole('button', { name: 'Legg til ferie' }).click();
    await page
        .getByLabel('Legg til ferie')
        .locator('div')
        .filter({ hasText: /^Fra og medÅpne datovelger$/ })
        .getByRole('button')
        .click();
    await page.getByRole('button', { name: 'onsdag 4' }).click();
    await page
        .getByLabel('Legg til ferie')
        .locator('div')
        .filter({ hasText: /^Til og medÅpne datovelger$/ })
        .getByRole('button')
        .click();

    await page.getByRole('button', { name: 'torsdag 5' }).click();
    await page.getByRole('button', { name: 'Ok' }).click();
};

const svarIngenUtenlandsopphold = async (page: Page) => {
    await page
        .getByRole('group', { name: 'Oppholder du deg i utlandet i noen av dagene du søker for?' })
        .getByLabel('Nei')
        .check();
};

export const leggTilUtenlandsopphold = async (page: Page) => {
    await page.getByRole('group', { name: 'Oppholder du deg i utlandet i' }).getByLabel('Ja').check();
    await page.getByRole('button', { name: 'Legg til utenlandsopphold' }).click();
    await page
        .getByLabel('Utenlandsopphold')
        .locator('div')
        .filter({ hasText: /^Fra og medÅpne datovelger$/ })
        .getByRole('button')
        .click();
    await page.getByRole('button', { name: 'fredag 6' }).click();
    await page
        .getByLabel('Utenlandsopphold')
        .locator('div')
        .filter({ hasText: /^Til og medÅpne datovelger$/ })
        .getByRole('button')
        .click();
    await page.getByRole('button', { name: 'lørdag 7' }).click();
    await page.getByLabel('Velg land').selectOption('ABW');
    await page.getByRole('button', { name: 'Ok' }).click();
};

export const kontrollerOpplæringEnEnkeltdagOppsummering = async (page: Page) => {
    await expect(page.getByText('Hvor foregår opplæringen?Barnas')).toBeVisible();
    await expect(page.getByText('02.12.2024. Kurstid: 5 t. 0 m. Reisetid: 4 t. 30 m.')).toBeVisible();
};

export const kontrollerOpplæringFlereEnkeltdagerOppsummering = async (page: Page) => {
    await expect(page.getByText('Hvor foregår opplæringen?Barnas')).toBeVisible();
    await expect(page.getByText('02.12.2024. Kurstid: 5 t. 0 m. Reisetid: 4 t. 30 m.')).toBeVisible();
    await expect(page.getByText('11.12.2024. Kurstid: 2 t. 0 m. Reisetid: 5 t. 0 m.')).toBeVisible();
};

export const kontrollerOpplæringEnPeriodeOppsummering = async (page: Page) => {
    await expect(page.getByText('Hvor foregår opplæringen?Barnas')).toBeVisible();
    await expect(page.locator('li').filter({ hasText: '02.12.2024 - 08.12.2024' })).toBeVisible();
    await expect(page.getByText('Reiser du på dager du ikke har kurs eller opplæring?Ja')).toBeVisible();
    await expect(page.getByText('Reisedager uten kurs eller opplæringTirsdag')).toBeVisible();
    await expect(page.getByText('Årsak til reisetidkombinerer')).toBeVisible();
    await expect(page.getByText('Skal du ta ut ferie i perioden?Ja')).toBeVisible();
    await expect(page.getByText('Ferie i perioden04.12.2024 - 05.12.2024')).toBeVisible();
    await expect(page.getByText('Oppholder du deg i utlandet i noen av dagene du søker for?Ja')).toBeVisible();
    await expect(page.getByText('Utenlandsopphold 06.12.2024')).toBeVisible();
};

export const kontrollerOpplæringFlerePerioderOppsummering = async (page: Page) => {
    await expect(page.getByText('Hvor foregår opplæringen?Barnas')).toBeVisible();
    await expect(
        page.getByText('Hvilke perioder søker du opplæringspenger?02.12.2024 - 08.12.202416.12.2024 -'),
    ).toBeVisible();
    await expect(page.getByText('Reiser du på dager du ikke har kurs eller opplæring?Ja')).toBeVisible();
    await expect(page.getByText('Reisedager uten kurs eller opplæringTirsdag')).toBeVisible();
    await expect(page.getByText('Skal du ta ut ferie i perioden?Ja')).toBeVisible();
    await expect(page.getByText('Ferie i perioden04.12.2024 - 05.12.2024')).toBeVisible();
    await expect(page.getByText('Oppholder du deg i utlandet i noen av dagene du søker for?Nei')).toBeVisible();
};
