import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const year = new Date().getFullYear();

test('Gå gjennom kalkulatoren og sjekk WCAG', async ({ page }) => {
    await page.goto('http://localhost:8080/omsorgspenger/kalkulator-antall-omsorgsdager');

    await page.getByRole('button', { name: 'Hva betyr egne barn?' }).click();
    await page.getByLabel('Hvor mange egne barn bor med deg?').selectOption('1');
    await page.getByRole('button', { name: 'Hvorfor spør vi om det?' }).click();
    await page.getByLabel('Hvilket årstall er barnet født?').selectOption(year.toString());
    await page.getByLabel('Ja').check();
    await page
        .getByRole('group', {
            name: 'Har du fått ekstra omsorgsdager fordi barnet har en sykdom eller funksjonshemning som gjør at du oftere må være borte fra jobb?',
        })
        .getByLabel('Ja')
        .check();
    await page
        .getByRole('group', {
            name: 'Har du fått vedtak om ekstra omsorgsdager fordi du er alene om omsorgen for barnet?',
        })
        .getByLabel('Ja')
        .check();
    await page.getByTestId('typedFormikForm-submitButton').click();
    await page.getByTestId('typedFormikForm-submitButton').click();

    await page.locator('#__kalkulator-kontainer').waitFor();

    const accessibilityScanResults = await new AxeBuilder({ page }).include('#__kalkulator-kontainer').analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
});
