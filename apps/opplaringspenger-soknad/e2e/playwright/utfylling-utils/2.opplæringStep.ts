import { Page } from '@playwright/test';

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
