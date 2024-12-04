import { Page } from '@playwright/test';

export const fyllUtOpplæringStep = async (page: Page) => {
    await page.getByRole('heading', { name: 'Om opplæringen' }).isVisible();
    await page.getByLabel('Hvor foregår opplæringen?').fill('AHus avdeling 1');
    await leggTilPeriode(page);
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
    await page
        .locator('div')
        .filter({ hasText: /^Når reiser du til opplæringsstedet\?Åpne datovelger$/ })
        .getByRole('button')
        .click();
    await page.getByRole('button', { name: 'Lukk datovelger' }).click();
    await page
        .locator('div')
        .filter({ hasText: /^Når reiser du til opplæringsstedet\?Åpne datovelger$/ })
        .getByRole('button')
        .click();
    await page.getByRole('button', { name: 'mandag 2', exact: true }).click();
    await page
        .locator('div')
        .filter({ hasText: /^Når er du hjemme fra opplæringsstedet\?Åpne datovelger$/ })
        .getByRole('button')
        .click();
    await page.getByRole('button', { name: 'mandag 9' }).click();
    await page.getByLabel('Årsak for reisetid over en dag').fill('En forklaring');
    await page.getByRole('group', { name: 'Jobber du noe de dagene du er' }).getByLabel('Ja').check();
    await page.getByRole('group', { name: 'Skal du ha ferie i løpet av s' }).getByLabel('Ja').check();
};

const leggTilFerie = async (page: Page) => {
    await page.getByRole('group', { name: 'Skal du ha ferie i løpet av s' }).getByLabel('Ja').check();
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
