import { expect, Page } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

import { ScenarioType } from '../../mock/scenarios/types';
import { setScenario } from './scenario';

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.resolve(currentDir, '../files/navlogopng.png');

export const høyereRisikoBeskrivelse =
    'Barnet trenger tett oppfølging og hyppige kontroller som gjør at jeg må være borte fra jobb oftere.';

export const expectSummaryValue = async (page: Page, term: string, value: string) => {
    const row = page.locator('div').filter({ hasText: term }).filter({ hasText: value }).first();
    await expect(row).toBeVisible();
};

export const startSøknad = async (page: Page, scenario: ScenarioType) => {
    await setScenario(page, scenario);
    await page.goto('/');
    await page.locator('input[type="checkbox"]').check();
    await page.locator('button[type="submit"]').click();
    await expect(page.getByRole('heading', { name: 'Hvilket barn gjelder søknaden?' })).toBeVisible();
};

export const fyllUtFellesBarnespørsmål = async (page: Page) => {
    await page.getByRole('group', { name: 'Bor du sammen med barnet?' }).getByLabel('Ja', { exact: true }).check();
    await page
        .getByRole('group', { name: 'Har barnet kronisk/langvarig sykdom eller funksjonshemning?' })
        .getByRole('radio', { name: 'Ja' })
        .check();
    await page
        .getByRole('group', {
            name: 'Har du høyere risiko for fravær på jobb på grunn av barnets sykdom eller funksjonshemning?',
        })
        .getByRole('radio', { name: 'Ja' })
        .check();
    await page
        .getByRole('textbox', {
            name: 'Nå trenger vi en beskrivelse fra deg på hvordan barnets sykdom eller funksjonshemning gir markert høyere risiko for fravær fra jobb:',
        })
        .fill(høyereRisikoBeskrivelse);
    await page.locator('button[type="submit"]').click();
};

export const lastOppVedleggOgFortsett = async (page: Page, ventPåTekst: string) => {
    await expect(page.getByText(ventPåTekst)).toBeVisible();
    await page.locator('input[type="file"]').setInputFiles(filePath);
    await expect(page.getByText('navlogopng.png')).toBeVisible();
    await page.locator('button[type="submit"]').click();
};

export const lastOppLegeerklæringOgGåTilOppsummering = async (page: Page) => {
    await lastOppVedleggOgFortsett(page, 'Last opp legeerklæringen');
    await expect(page.getByRole('heading', { name: 'Om deg' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Om barnet' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Vedlegg' })).toBeVisible();
};

export const gåTilOppsummeringMedRegistrertBarn = async (page: Page, scenario: ScenarioType) => {
    await startSøknad(page, scenario);
    await page.getByText('Alfa Testesen').click();
    await fyllUtFellesBarnespørsmål(page);
    await lastOppLegeerklæringOgGåTilOppsummering(page);
};

export const bekreftOpplysningerOgSend = async (page: Page) => {
    await page
        .getByRole('checkbox', {
            name: 'Jeg bekrefter at opplysningene jeg har gitt er riktige, og at jeg ikke har holdt tilbake opplysninger som har betydning for min rett til omsorgspenger.',
        })
        .check();
    await page.locator('button[type="submit"]').click();
};

export const sendInnSøknad = async (page: Page) => {
    await bekreftOpplysningerOgSend(page);
    await expect(
        page.getByRole('heading', {
            name: 'Vi har mottatt søknad om ekstra omsorgsdager for barn som har kronisk/langvarig sykdom eller funksjonshemning',
        }),
    ).toBeVisible();
    await expect(page).toHaveURL(/\/kvittering$/);
};

export const expectFellesOppsummering = async (page: Page) => {
    await expect(page.getByText('Test Testesen')).toBeVisible();
    await expect(page.getByText('02068599258')).toBeVisible();
    await expectSummaryValue(page, 'Bor du sammen med barnet?', 'Ja');
    await expectSummaryValue(page, 'Har barnet kronisk/langvarig sykdom eller funksjonshemning?', 'Ja');
    await expectSummaryValue(
        page,
        'Har du høyere risiko for fravær på jobb på grunn av barnets sykdom eller funksjonshemning?',
        'Ja',
    );
    await expectSummaryValue(
        page,
        'Beskrivelse på hvordan barnets sykdom eller funksjonshemning gir høyere risiko for fravær fra jobb',
        høyereRisikoBeskrivelse,
    );
    await expect(page.getByRole('term').filter({ hasText: 'Legeerklæring' })).toBeVisible();
    await expect(page.getByText('navlogopng.png')).toBeVisible();
    await expect(page.getByText('Avtale om delt fast bosted')).toHaveCount(0);
};
