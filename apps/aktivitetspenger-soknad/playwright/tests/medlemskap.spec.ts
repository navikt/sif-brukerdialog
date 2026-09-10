import { expect, Page, test } from '@playwright/test';

import { ScenarioType } from '../../mock/scenarios/types';
import { mellomlagringTilMedlemskap } from '../mock-data/mellomlagring';
import { setScenario, setScenarioWithMellomlagring } from '../utils/scenario';
import { testAccessibility } from '../utils/testAccessibility';

const harBoddINorge = 'Har du bodd sammenhengende i Norge de fem siste årene?';
const harJobbetINorge = 'Har du jobbet sammenhengende i Norge de siste fem årene?';
const harJobbetUtenforNorge = 'Har du jobbet utenfor Norge de fem siste årene?';

const svar = async (page: Page, spørsmål: string | RegExp, s: 'Ja' | 'Nei') => {
    await page.getByRole('radiogroup', { name: spørsmål }).getByLabel(s, { exact: true }).check();
};

const startSøknadTilMedlemskap = async (page: Page) => {
    await setScenario(page, ScenarioType.kanSøkeFørstegang);
    await page.goto('/');
    await page.getByLabel('Jeg bekrefter at jeg vil svare så riktig som jeg kan.').check();
    await page.getByRole('button', { name: 'Start søknad' }).click();
    await page.getByText('Ja').click();
    await page.getByRole('button', { name: 'Neste steg' }).click();
    await svar(page, 'Bor du i Trondheim kommune?', 'Ja');
    await page.getByRole('button', { name: 'Neste steg' }).click();
    await expect(page).toHaveURL(/\/soknad\/medlemskap/);
};

const gåTilOppsummering = async (page: Page) => {
    await page.getByRole('button', { name: 'Neste steg' }).click();
    await expect(page).toHaveURL(/\/soknad\/barn/);
    await svar(page, /Stemmer opplysningen om barna?/, 'Ja');
    await page.getByRole('button', { name: 'Neste steg' }).click();
    await expect(page).toHaveURL(/\/soknad\/oppsummering/);
};

const leggTilArbeidsperiode = async (page: Page, land: string, fraOgMed: string, tilOgMed: string) => {
    await page.getByRole('button', { name: 'Legg til periode med jobb utenfor Norge' }).click();
    const dialog = page.getByRole('dialog');
    await dialog.getByLabel('Velg land').selectOption({ label: land });
    await dialog.getByLabel('Fra og med').fill(fraOgMed);
    await dialog.getByLabel('Til og med').fill(tilOgMed);
    await dialog.getByRole('button', { name: 'Legg til', exact: true }).click();
};

test('gjenopptar søknaden på medlemskap med mellomlagring', async ({ page }) => {
    await setScenarioWithMellomlagring(page, ScenarioType.kanSøkeFørstegang, mellomlagringTilMedlemskap);
    await page.goto('/');

    await expect(page).toHaveURL(/\/soknad\/medlemskap/);
    await expect(page.getByRole('radiogroup', { name: harBoddINorge })).toBeVisible();
    await testAccessibility(page);
});

test('viser bare besvarte spørsmål når søkeren har bodd i Norge og ikke jobbet i utlandet', async ({ page }) => {
    await startSøknadTilMedlemskap(page);
    await svar(page, harBoddINorge, 'Ja');
    await svar(page, harJobbetUtenforNorge, 'Nei');
    await gåTilOppsummering(page);

    const oppsummering = page.getByRole('heading', { name: 'Medlemskap' }).locator('..').locator('..');
    await expect(oppsummering.getByText(harBoddINorge)).toBeVisible();
    await expect(oppsummering.getByText(harJobbetUtenforNorge)).toBeVisible();
    await expect(oppsummering.getByText(harJobbetINorge)).not.toBeVisible();
    await expect(oppsummering.getByText('Jobb utenfor Norge siste 5 år')).not.toBeVisible();
    await testAccessibility(page);
});

test('legger til og fjerner arbeidsperioder og viser den gjenværende perioden i oppsummeringen', async ({ page }) => {
    await startSøknadTilMedlemskap(page);
    await svar(page, harBoddINorge, 'Nei');
    await svar(page, harJobbetINorge, 'Ja');
    await svar(page, harJobbetUtenforNorge, 'Ja');

    await leggTilArbeidsperiode(page, 'Sverige', '01.01.2024', '31.01.2024');
    await expect(page.getByRole('button', { name: /Fjern.*Sverige/ })).toBeVisible();
    await page.getByRole('button', { name: /Fjern.*Sverige/ }).click();
    await expect(page.getByRole('button', { name: /Fjern.*Sverige/ })).not.toBeVisible();

    await leggTilArbeidsperiode(page, 'Danmark', '01.02.2024', '29.02.2024');
    await gåTilOppsummering(page);

    const oppsummering = page.getByRole('heading', { name: 'Medlemskap' }).locator('..').locator('..');
    await expect(oppsummering.getByText(harJobbetINorge)).toBeVisible();
    await expect(oppsummering.getByText(harJobbetUtenforNorge)).toBeVisible();
    await expect(oppsummering.getByText('Jobb utenfor Norge siste 5 år')).toBeVisible();
    await expect(oppsummering.getByText(/01\.02\.2024.*29\.02\.2024: Danmark/)).toBeVisible();
    await expect(oppsummering.getByText('Sverige')).not.toBeVisible();
    await testAccessibility(page);
});

test('viser utenlandsopphold når søkeren ikke har bodd eller jobbet sammenhengende i Norge', async ({ page }) => {
    await startSøknadTilMedlemskap(page);
    await svar(page, harBoddINorge, 'Nei');
    await svar(page, harJobbetINorge, 'Nei');

    await page.getByRole('button', { name: 'Legg til utenlandsopphold' }).click();
    const dialog = page.getByRole('dialog');
    await dialog.getByLabel('Velg land').selectOption({ label: 'Danmark' });
    await dialog.getByLabel('Fra og med').fill('01.03.2024');
    await dialog.getByLabel('Til og med').fill('31.03.2024');
    await dialog
        .getByRole('radiogroup', { name: 'Jobbet du i dette landet i denne perioden?' })
        .getByLabel('Nei', { exact: true })
        .check();
    await dialog.getByRole('button', { name: 'Legg til', exact: true }).click();
    await gåTilOppsummering(page);

    const oppsummering = page.getByRole('heading', { name: 'Medlemskap' }).locator('..').locator('..');
    await expect(oppsummering.getByText(harJobbetINorge)).toBeVisible();
    await expect(oppsummering.getByText(harJobbetUtenforNorge)).not.toBeVisible();
    await expect(oppsummering.getByText('Bosteder utenfor Norge siste 5 år')).toBeVisible();
    await expect(oppsummering.getByText(/01\.03\.2024.*31\.03\.2024: Danmark/)).toBeVisible();
    await expect(oppsummering.getByText('Jobbet i perioden: Nei.')).toBeVisible();
    await testAccessibility(page);
});
