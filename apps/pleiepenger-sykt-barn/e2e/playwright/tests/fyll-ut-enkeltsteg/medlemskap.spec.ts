import { test, expect } from '@playwright/test';
import { setNow } from '../../utils/setNow';
import { mellomlagringMock } from '../../../mock-data/mellomlagring';
import { routeUtils } from '../../utils/routeUtils';
import { StepID } from '../../../../src/app/types/StepID';

test.beforeEach(async ({ page, context }) => {
    await setNow(page);
    await routeUtils.setupMockRoutes(page, context, {
        mellomlagring: mellomlagringMock,
        lastStep: StepID.OMSORGSTILBUD,
    });
    await page.goto('http://localhost:8080/familie/sykdom-i-familien/soknad/pleiepenger/soknad/medlemskap');
    await expect(page.getByRole('heading', { name: 'Medlemskap' })).toBeVisible();
});

test.afterEach(async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Last opp legeerklæring' })).toBeVisible();
});

test.describe('Medlemskap', () => {
    test('Har ikke bodd/skal ikke bo i utlandet', async ({ page }) => {
        await page.getByRole('group', { name: 'Har du bodd i utlandet i hele' }).getByLabel('Nei').check();
        await page.getByRole('group', { name: 'Planlegger du å bo i utlandet' }).getByLabel('Nei').check();
        await page.getByTestId('typedFormikForm-submitButton').click();
    });
    test('Har bodd/skal bo i utlandet', async ({ page }) => {
        await page.getByRole('group', { name: 'Har du bodd i utlandet i hele' }).getByLabel('Ja').check();
        await page.getByRole('button', { name: 'Legg til nytt utenlandsopphold' }).click();
        await page
            .locator('div')
            .filter({ hasText: /^Fra og medÅpne datovelger$/ })
            .getByRole('button')
            .click();
        await page.getByRole('button', { name: 'Gå til forrige måned' }).click();
        await page.getByRole('button', { name: 'Gå til forrige måned' }).click();
        await page.getByLabel('mandag 7').click();
        await page
            .locator('div')
            .filter({ hasText: /^Til og medÅpne datovelger$/ })
            .getByRole('button')
            .click();
        await page.getByRole('button', { name: 'Gå til forrige måned' }).click();
        await page.getByLabel('onsdag 14').click();
        await page.getByLabel('Velg land').selectOption('BHR');
        await page.getByRole('button', { name: 'Ok' }).click();
        await page.getByRole('button', { name: 'Legg til nytt utenlandsopphold' }).click();
        await page
            .locator('div')
            .filter({ hasText: /^Fra og medÅpne datovelger$/ })
            .getByRole('button')
            .click();
        await page.getByRole('button', { name: 'Gå til forrige måned' }).click();
        await page.getByLabel('torsdag 15').click();
        await page
            .locator('div')
            .filter({ hasText: /^Til og medÅpne datovelger$/ })
            .getByRole('button')
            .click();
        await page.getByRole('button', { name: 'Gå til forrige måned' }).click();
        await page.getByRole('button', { name: 'søndag 18' }).click();
        await page.getByLabel('Velg land').selectOption('ABW');
        await page.getByRole('button', { name: 'Ok' }).click();
        await page.getByLabel('Fjern Bahrain').click();
        await page.getByText('Ja').nth(3).click();
        await page
            .getByTestId('bostedUtlandList-annetLandNeste12')
            .getByRole('button', { name: 'Legg til nytt utenlandsopphold' })
            .click();
        await page
            .locator('div')
            .filter({ hasText: /^Fra og medÅpne datovelger$/ })
            .getByRole('button')
            .click();
        await page.getByRole('button', { name: 'mandag 9' }).click();
        await page
            .locator('div')
            .filter({ hasText: /^Til og medÅpne datovelger$/ })
            .getByRole('button')
            .click();
        await page.getByRole('button', { name: 'søndag 15' }).click();
        await page.getByLabel('Velg land').selectOption('AUS');
        await page.getByRole('button', { name: 'Ok' }).click();
        await page.getByRole('link', { name: 'Australia' }).click();
        await page
            .locator('div')
            .filter({ hasText: /^Til og medÅpne datovelger$/ })
            .getByRole('button')
            .click();
        await page.getByRole('button', { name: 'søndag 22' }).click();
        await page.getByRole('button', { name: 'Ok' }).click();
        await page.getByTestId('typedFormikForm-submitButton').click();
    });
});
