import { expect, test } from '@playwright/test';
import { setNow } from '../../utils/setNow';
import { mellomlagringMock } from '../../../mock-data/mellomlagring';
import { routeUtils } from '../../utils/routeUtils';
import { StepID } from '../../../../src/app/types/StepID';

test.beforeEach(async ({ page }) => {
    await setNow(page);
});

test('Fyll ut periodesteget', async ({ page, context }) => {
    await routeUtils.setupMockRoutes(page, context, {
        mellomlagring: mellomlagringMock,
        lastStep: StepID.OPPLYSNINGER_OM_BARNET,
    });
    await page.goto('http://localhost:8080/familie/sykdom-i-familien/soknad/pleiepenger/soknad/tidsrom');
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
    await page.getByRole('button', { name: 'søndag 15' }).click();
    await page.getByLabel('Fra og med').fill('03.01.2023');
    await page
        .locator('div')
        .filter({ hasText: /^Fra og medÅpne datovelger$/ })
        .getByRole('button')
        .press('Tab');
    await page.getByLabel('Til og med').fill('10.01.2023');
    await page
        .locator('div')
        .filter({ hasText: /^Til og medÅpne datovelger$/ })
        .getByRole('button')
        .press('Tab');
    await page.getByRole('group', { name: 'Skal du reise til utlandet i' }).getByLabel('Ja').check();
    await page.getByRole('button', { name: 'Legg til utenlandsopphold' }).click();
    await page
        .getByLabel('Utenlandsopphold')
        .locator('div')
        .filter({ hasText: /^Fra og medÅpne datovelger$/ })
        .getByRole('button')
        .click();
    await page.getByRole('button', { name: 'tirsdag 3', exact: true }).click();
    await page
        .getByLabel('Utenlandsopphold')
        .locator('div')
        .filter({ hasText: /^Til og medÅpne datovelger$/ })
        .getByRole('button')
        .click();
    await page.getByRole('button', { name: 'onsdag 4' }).click();
    await page.getByLabel('Velg land').selectOption('AFG');
    await page.getByLabel('Velg land').selectOption('AFG');
    await page.getByLabel('Utenlandsopphold').getByLabel('Ja', { exact: true }).check();
    await page.getByRole('group', { name: 'Er barnet innlagt i' }).getByLabel('Ja').check();
    await page.getByRole('button', { name: 'Legg til periode barnet er' }).click();
    await page
        .getByLabel('Periode barnet er innlagt')
        .locator('div')
        .filter({ hasText: /^Fra og medÅpne datovelger$/ })
        .getByRole('button')
        .click();
    await page.getByRole('button', { name: 'tirsdag 3', exact: true }).click();
    await page
        .getByLabel('Periode barnet er innlagt')
        .locator('div')
        .filter({ hasText: /^Til og medÅpne datovelger$/ })
        .getByRole('button')
        .click();
    await page.getByRole('button', { name: 'tirsdag 3', exact: true }).click();
    await page.getByLabel('Periode barnet er innlagt').getByTestId('typedFormikForm-submitButton').click();
    await page.getByText('For norsk offentlig regning').click();
    await page.getByRole('button', { name: 'Ok' }).click();
    await page.getByRole('group', { name: 'Skal du ha ferie i perioden' }).getByLabel('Ja').check();
    await page.getByRole('button', { name: 'Legg til ferie' }).click();
    await page
        .getByLabel('Ferie')
        .locator('div')
        .filter({ hasText: /^Fra og medÅpne datovelger$/ })
        .getByRole('button')
        .click();
    await page.getByRole('button', { name: 'onsdag 4' }).click();
    await page
        .getByLabel('Ferie')
        .locator('div')
        .filter({ hasText: /^Til og medÅpne datovelger$/ })
        .getByRole('button')
        .click();
    await page.getByRole('button', { name: 'torsdag 5' }).click();
    await page.getByRole('button', { name: 'Ok' }).click();
    await page.getByRole('button', { name: 'Legg til ferie' }).click();
    await page
        .getByLabel('Ferie')
        .locator('div')
        .filter({ hasText: /^Fra og medÅpne datovelger$/ })
        .getByRole('button')
        .click();
    await page.getByRole('button', { name: 'søndag 8' }).click();
    await page
        .getByLabel('Ferie')
        .locator('div')
        .filter({ hasText: /^Til og medÅpne datovelger$/ })
        .getByRole('button')
        .click();
    await page.getByRole('button', { name: 'mandag 9' }).click();
    await page.getByRole('button', { name: 'Ok' }).click();
    await page.getByRole('link', { name: 'jan. 2023 - 5. jan. 2023' }).click();
    await page
        .getByLabel('Ferie')
        .locator('div')
        .filter({ hasText: /^Til og medÅpne datovelger$/ })
        .getByRole('button')
        .click();
    await page.getByRole('button', { name: 'onsdag 4' }).click();
    await page.getByRole('button', { name: 'Ok' }).click();
    await page.getByTestId('typedFormikForm-submitButton').click();
    await expect(page.getByRole('heading', { name: 'Arbeidssituasjonen din' })).toBeVisible();
});
