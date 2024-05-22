import { test, expect } from '@playwright/test';
import { setNow } from '../utils/setNow';
import { routeUtils } from '../utils/routeUtils';

test.beforeEach(async ({ page }) => {
    await setNow(page);
});

test('Velkommen side', async ({ page }) => {
    await routeUtils.setupMockRoutes(page);
    await page.goto('http://localhost:8080/familie/sykdom-i-familien/soknad/pleiepenger/soknad/velkommen');
    await page.getByLabel('Jeg bekrefter at jeg har').check();
    await page.getByRole('button', { name: 'Start søknad' }).click();

    await expect(page.getByRole('heading', { name: 'Barn', level: 1 })).toBeVisible();
    await page.getByLabel('ALFABETISK FAGGOTTFødt').check();
    await page.getByTestId('typedFormikForm-submitButton').click();
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
    await page.getByRole('group', { name: 'Skal du reise til utlandet i' }).getByLabel('Nei').check();
    await page.getByRole('group', { name: 'Skal du ha ferie i perioden' }).getByLabel('Nei').check();
    await page.getByTestId('typedFormikForm-submitButton').click();
    await page.getByTestId('er-ansatt_yes').check();
    await page.getByLabel('Hvor mange timer jobber du').click();
    await page.getByLabel('Hvor mange timer jobber du').fill('30');
    await page.getByTestId('arbeidssituasjonFrilanser').getByText('Nei').first().click();
    await page.getByRole('group', { name: 'Jobber du som frilanser eller' }).getByLabel('Ja').check();
    await page.getByRole('group', { name: 'Jobber du som frilanser eller' }).getByLabel('Nei').check();
    await page.getByTestId('arbeidssituasjonSelvstendig').getByLabel('Nei').check();
    await page.getByTestId('arbeidssituasjonOpptjeningUtland').getByLabel('Nei').check();
    await page.getByTestId('arbeidssituasjonUtenlandskNæring').getByLabel('Nei').check();
    await page.getByTestId('typedFormikForm-submitButton').click();
    await page.getByLabel('Jeg jobber ikke').check();
    await page.getByTestId('typedFormikForm-submitButton').click();
    await page.getByTestId('erIOmsorgstilbud-fremtid_no').check();
    await page.getByTestId('typedFormikForm-submitButton').click();
    await page.getByRole('group', { name: 'Har du bodd i utlandet i hele' }).getByLabel('Nei').check();
    await page.getByRole('group', { name: 'Planlegger du å bo i utlandet' }).getByLabel('Nei').check();
    await page.getByTestId('typedFormikForm-submitButton').click();
    await page.getByTestId('typedFormikForm-submitButton').click();
    await page.getByText('Jeg bekrefter at').click();
    await page.getByTestId('typedFormikForm-submitButton').click();
    await page.getByRole('heading', { name: 'Vi har mottatt søknaden din' }).click();
});
