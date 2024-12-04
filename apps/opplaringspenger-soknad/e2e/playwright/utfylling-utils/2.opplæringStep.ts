import { Page, expect } from '@playwright/test';

export const fyllUtOpplæringStep = async (page: Page) => {
    await page.getByRole('heading', { name: 'Om opplæringen' }).isVisible();
    await page.getByLabel('Hvor foregår opplæringen?').fill('AHus avdeling 1');
    await leggTilPeriode(page);
    await page.getByRole('group', { name: 'Jobber du noe de dagene du er på opplæring' }).getByLabel('Ja').check();
    await leggTilFerie(page);
    await page.getByTestId('typedFormikForm-submitButton').click();
};

const leggTilPeriode = async (page: Page) => {
    await page
        .locator('div')
        .filter({ hasText: /^Fra og medÅpne datovelger$/ })
        .getByRole('button')
        .click();
    await page.getByRole('button', { name: 'mandag 2', exact: true }).click();
    await page
        .locator('div')
        .filter({ hasText: /^Til og medÅpne datovelger$/ })
        .getByRole('button')
        .click();
    await page.getByRole('button', { name: 'søndag 8' }).click();

    await page.getByRole('group', { name: 'Kursperioder' }).getByLabel('Ja').check();
    await page.getByLabel('Når reiser du til opplæringsstedet').fill('02.12.2024');
    await page.getByLabel('Når er du hjemme fra opplæringsstedet').fill('09.12.2024');
    await page.getByLabel('Når er du hjemme fra opplæringsstedet').blur();

    await page.getByLabel('Beskrivelse av reisetid').fill('kombinerer med ferie');
};

const leggTilFerie = async (page: Page) => {
    await page
        .getByRole('group', { name: 'Skal du ha ferie når du er på opplæring eller reise' })
        .getByLabel('Ja')
        .check();
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
        .click({
            button: 'right',
        });
    await page
        .getByLabel('Legg til ferie')
        .locator('div')
        .filter({ hasText: /^Til og medÅpne datovelger$/ })
        .getByRole('button')
        .click();
    await page.getByRole('button', { name: 'torsdag 5' }).click();
    await page.getByRole('button', { name: 'Ok' }).click();
};

export const kontrollerOpplæringOppsummering = async (page: Page) => {
    await expect(page.getByText('Hvor foregår opplæringen?AHus')).toBeVisible();
    await expect(page.locator('li').filter({ hasText: '02.12.2024 - 08.12.2024' })).toBeVisible();
    await expect(page.getByText('Er borte fra jobb på grunn av reise til eller fra opplæringstedet: Ja')).toBeVisible();
    await expect(page.getByText('Avreise: 02.12.2024')).toBeVisible();
    await expect(page.getByText('Hjemkomst: 09.12.2024')).toBeVisible();
    await expect(page.getByText('Beskrivelse av reisetid:kombinerer med ferie')).toBeVisible();
    await expect(page.getByText('Skal du ta ut ferie i perioden?Ja')).toBeVisible();
    await expect(page.getByText('Ferie i perioden04.12.2024 - 05.12.2024')).toBeVisible();
};
