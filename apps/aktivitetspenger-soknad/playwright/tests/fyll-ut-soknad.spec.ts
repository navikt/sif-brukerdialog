import { expect, Page, test } from '@playwright/test';

import { ScenarioType } from '../../mock/scenarios/types';
import { setScenario } from '../utils/scenario';
import { testAccessibility } from '../utils/testAccessibility';

const svarJa = async (page: Page, spørsmål: string | RegExp) => {
    const gruppe = page.getByRole('radiogroup', { name: spørsmål });
    await gruppe.getByLabel('Ja', { exact: true }).check();
};

const svarNei = async (page: Page, spørsmål: string | RegExp) => {
    const gruppe = page.getByRole('radiogroup', { name: spørsmål });
    await gruppe.getByLabel('Nei', { exact: true }).check();
};

const gåTilNesteSteg = async (page: Page, steg: string) => {
    await page.getByRole('button', { name: 'Neste steg' }).click();
    await expect(page).toHaveURL(new RegExp(`/soknad/${steg}`));
};

test('fyller ut og sender inn søknaden', async ({ page }) => {
    await setScenario(page, ScenarioType.kanSøkeFørstegang);
    await page.goto('/');

    await expect(page.getByRole('heading', { name: 'Søknad om aktivitetspenger' })).toBeVisible();
    await testAccessibility(page);

    await page.getByLabel('Jeg bekrefter at jeg vil svare så riktig som jeg kan.').check();
    await page.getByRole('button', { name: 'Start søknad' }).click();

    // const kontonummerSpørsmål = /Stemmer det at ditt kontonummer er/;
    // await expect(page.getByRole('radiogroup', { name: kontonummerSpørsmål })).toBeVisible();
    await testAccessibility(page);
    await page.getByText('Ja').click();
    // await svarJa(page, kontonummerSpørsmål);
    await gåTilNesteSteg(page, 'bosted');

    const bostedSpørsmål = 'Bor du i Trondheim kommune?';
    await expect(page.getByRole('radiogroup', { name: bostedSpørsmål })).toBeVisible();
    await svarJa(page, bostedSpørsmål);
    await testAccessibility(page);
    await gåTilNesteSteg(page, 'medlemskap');

    const boddINorgeSpørsmål = 'Har du bodd sammenhengende i Norge de fem siste årene?';
    await expect(page.getByRole('radiogroup', { name: boddINorgeSpørsmål })).toBeVisible();
    await testAccessibility(page);
    await svarJa(page, boddINorgeSpørsmål);

    const jobbetUtenforNorgeSpørsmål = 'Har du jobbet utenfor Norge de fem siste årene?';
    await expect(page.getByRole('radiogroup', { name: jobbetUtenforNorgeSpørsmål })).toBeVisible();
    await svarNei(page, jobbetUtenforNorgeSpørsmål);
    await gåTilNesteSteg(page, 'barn');

    const barnSpørsmål = /Stemmer opplysningen om barna?/;
    await expect(page.getByRole('radiogroup', { name: barnSpørsmål })).toBeVisible();
    await testAccessibility(page);
    await svarJa(page, barnSpørsmål);
    await gåTilNesteSteg(page, 'oppsummering');

    await expect(page.getByLabel('Velg startdato som skal gjelde for denne søknaden')).toBeVisible();
    await testAccessibility(page);
    await page.getByLabel('Jeg bekrefter at opplysningene jeg har gitt er riktige').check();
    await page.getByRole('button', { name: 'Send inn' }).click();

    await expect(page.getByRole('heading', { name: 'Søknaden er sendt' })).toBeVisible();
    await testAccessibility(page);
});
