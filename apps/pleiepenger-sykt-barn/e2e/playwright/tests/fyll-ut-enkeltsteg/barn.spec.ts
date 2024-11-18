import { expect, test } from '@playwright/test';
import { routeUtils } from '../../utils/routeUtils';
import { setNow } from '../../utils/setNow';

test.beforeEach(async ({ page }) => {
    await setNow(page);
    await routeUtils.setupMockRoutes(page);
    await page.goto('http://localhost:8080/familie/sykdom-i-familien/soknad/pleiepenger/soknad/velkommen');
    await expect(page.getByRole('heading', { name: 'Hei, Test' })).toBeVisible();
    await page.getByText('Jeg bekrefter at jeg har').click();
    await page.getByRole('button', { name: 'Start søknad' }).click();
    await expect(page.getByRole('heading', { name: 'Barn', level: 1 })).toBeVisible();
});

test.afterEach(async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Perioden med pleiepenger' })).toBeVisible();
});

test.describe('Barn steg', () => {
    test('Registrert barn', async ({ page }) => {
        await page.getByLabel('ALFABETISK FAGGOTTFødt').check();
        await page.getByTestId('typedFormikForm-submitButton').click();
    });
    test('Annet barn - utlandet', async ({ page }) => {
        await page.getByText('Søknaden gjelder et annet barn', { exact: true }).click();
        await page.getByText('Barnet har ikke fødselsnummer').click();
        await page.getByText('Barnet bor i utlandet').click();
        await page.getByLabel('Barnets navn').fill('Tore');
        await page.getByRole('button', { name: 'Åpne datovelger' }).click();
        await page.getByRole('button', { name: 'Gå til forrige måned' }).click();
        await page.getByLabel('torsdag 1', { exact: true }).click();
        await page.getByText('Fosterforelder').click();
        await page.getByRole('group', { name: 'Hvilken relasjon har du til' }).getByLabel('Annet').check();
        await page.getByTestId('opplysninger-om-barnet-relasjonAnnetBeskrivelse').click();
        await page.getByTestId('opplysninger-om-barnet-relasjonAnnetBeskrivelse').fill('Beskrivelse');
        const [fileChooser] = await Promise.all([
            page.waitForEvent('filechooser'),
            await page.locator('input[type="file"]').dispatchEvent('click'),
        ]);
        await fileChooser.setFiles('./e2e/playwright/files/navlogopng.png');
        const listItems = await page.getByText('navlogopng.png');
        await expect(listItems).toHaveCount(1);

        await page.getByTestId('typedFormikForm-submitButton').click();
    });
    test('Annet barn', async ({ page }) => {
        await page.getByText('Søknaden gjelder et annet barn', { exact: true }).click();
        await page.getByLabel('Barnets fødselsnummer/D-nummer').click();
        await page.getByLabel('Barnets fødselsnummer/D-nummer').fill('02869599258');
        await page.getByLabel('Barnets navn').click();
        await page.getByLabel('Barnets navn').fill('Tore');
        await page.getByLabel('Barnets navn').press('Tab');
        await page.getByLabel('Mor', { exact: true }).check();
        await page.getByTestId('typedFormikForm-submitButton').click();
    });
});
