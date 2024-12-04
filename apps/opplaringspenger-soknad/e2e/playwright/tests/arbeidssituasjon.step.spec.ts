import { test, expect, Page } from '@playwright/test';
import { mellomlagringMock } from '../mock-data/mellomlagringMock';
import { setNow } from '../utils/setNow';
import { setupMockRoutes } from '../utils/setupMockRoutes';
import { routeUtils } from '../utils/routeUtils';
import { SøknadRoutes } from '../../../src/app/types/SøknadRoutes';

test.beforeEach(async ({ page }) => {
    await setNow(page);
    await setupMockRoutes(page, {
        mellomlagring: mellomlagringMock,
    });
    await routeUtils.resumeFromRoute(page, SøknadRoutes.ARBEIDSSITUASJON);
    await expect(page.getByRole('heading', { name: 'Arbeidssituasjon' })).toBeVisible();
});

test('Fyll ut arbeidssituasjon steg', async ({ page }) => {
    await fyllUtArbeidssituasjonStep(page);
});

const fyllUtArbeidssituasjonStep = async (page: Page) => {
    await expect(page.getByRole('heading', { level: 1, name: 'Arbeidssituasjon' })).toBeVisible();
    await page
        .getByRole('group', {
            name: 'Stemmer det at du er ansatt hos Arbeids- og velferdsetaten i perioden du søker for?',
        })
        .getByLabel('Ja')
        .check();
    await page
        .getByLabel('Hvor mange timer jobber du normalt per uke hos Arbeids- og velferdsetaten når du ikke har fravær?')
        .click();
    await page
        .getByLabel('Hvor mange timer jobber du normalt per uke hos Arbeids- og velferdsetaten når du ikke har fravær?')
        .fill('37,5');
    await page.getByRole('group', { name: 'Er du frilanser i perioden du søker for?' }).getByLabel('Nei').check();
    await page
        .getByRole('group', { name: 'Er du selvstendig næringsdrivende i perioden du søker for?' })
        .getByLabel('Nei')
        .check();
    await page
        .getByRole('group', {
            name: 'Har du jobbet som arbeidstaker eller frilanser i et annet EØS-land i løpet av de 3 siste månedene før perioden du søker om?',
        })
        .getByLabel('Nei')
        .check();
    await page
        .getByRole('group', {
            name: 'Har du jobbet som selvstendig næringsdrivende i et annet EØS-land i løpet av de 3 siste årene før perioden du søker om?',
        })
        .getByLabel('Nei')
        .check();
    await page.getByRole('button', { name: 'Neste steg', exact: true }).click();
};
