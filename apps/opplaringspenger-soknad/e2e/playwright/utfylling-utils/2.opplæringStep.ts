import { Page, expect } from '@playwright/test';

export const fyllUtOpplæringEnPeriode = async (page: Page) => {
    await page.getByRole('heading', { name: 'Om opplæringen' }).isVisible();
    await page.getByLabel('Hvor foregår opplæringen?').fill('AHus avdeling 1');
    await leggTilPeriode1(page);
    await leggTilReisedag(page);
    await leggTilFerie(page);
    await page.getByTestId('typedFormikForm-submitButton').click();
};

export const fyllUtOpplæringToPerioder = async (page: Page) => {
    await page.getByRole('heading', { name: 'Om opplæringen' }).isVisible();
    await page.getByLabel('Hvor foregår opplæringen?').fill('AHus avdeling 1');
    await page.getByRole('button', { name: 'Legg til ny periode' }).click();
    await leggTilPeriode1(page);
    await leggTilPeriode2(page);
    await leggTilReisedag(page);
    await leggTilFerie(page);
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

export const kontrollerOpplæringEnPeriodeOppsummering = async (page: Page) => {
    await expect(page.getByText('Hvor foregår opplæringen?AHus')).toBeVisible();
    await expect(page.locator('li').filter({ hasText: '02.12.2024 - 08.12.2024' })).toBeVisible();
    await expect(
        page.getByText('Reiser du på dager du søker om hvor du ikke har kurs eller opplæring?Ja'),
    ).toBeVisible();
    await expect(page.getByText('Reisedager uten kurs eller opplæringTirsdag')).toBeVisible();
    await expect(page.getByText('Årsak til reisetidkombinerer')).toBeVisible();
    await expect(page.getByText('Skal du ta ut ferie i perioden?Ja')).toBeVisible();
    await expect(page.getByText('Ferie i perioden04.12.2024 - 05.12.2024')).toBeVisible();
};

export const kontrollerOpplæringFlerePerioderOppsummering = async (page: Page) => {
    await expect(page.getByText('Hvor foregår opplæringen?AHus')).toBeVisible();
    await expect(
        page.getByText('Hvilke dager søker du opplæringspenger?02.12.2024 - 08.12.202416.12.2024 -'),
    ).toBeVisible();
    await expect(
        page.getByText('Reiser du på dager du søker om hvor du ikke har kurs eller opplæring?Ja'),
    ).toBeVisible();
    await expect(page.getByText('Reisedager uten kurs eller opplæringTirsdag')).toBeVisible();
    await expect(page.getByText('Skal du ta ut ferie i perioden?Ja')).toBeVisible();
    await expect(page.getByText('Ferie i perioden04.12.2024 - 05.12.2024')).toBeVisible();
};
