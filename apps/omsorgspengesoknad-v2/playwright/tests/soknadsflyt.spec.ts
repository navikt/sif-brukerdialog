import { expect, Page, test } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

import { ScenarioType } from '../../mock/scenarios/types';
import { setScenario } from '../utils/scenario';

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.resolve(currentDir, '../files/navlogopng.png');
const høyereRisikoBeskrivelse =
    'Barnet trenger tett oppfølging og hyppige kontroller som gjør at jeg må være borte fra jobb oftere.';

const expectSummaryValue = async (page: Page, term: string, value: string) => {
    const row = page.locator('div').filter({ hasText: term }).filter({ hasText: value }).first();
    await expect(row).toBeVisible();
};

const startSøknad = async (page: Page, scenario: ScenarioType) => {
    await setScenario(page, scenario);
    await page.goto('/');
    await page.locator('input[type="checkbox"]').check();
    await page.locator('button[type="submit"]').click();
    await expect(page.getByRole('heading', { name: 'Hvilket barn gjelder søknaden?' })).toBeVisible();
};

const fyllUtFellesBarnespørsmål = async (page: Page) => {
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

const lastOppLegeerklæringOgGåTilOppsummering = async (page: Page) => {
    await expect(page.getByText('Last opp legeerklæringen')).toBeVisible();
    await page.locator('input[type="file"]').setInputFiles(filePath);
    await expect(page.getByText('navlogopng.png')).toBeVisible();
    await page.locator('button[type="submit"]').click();
    await expect(page.getByRole('heading', { name: 'Om deg' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Om barnet' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Vedlegg' })).toBeVisible();
};

const sendInnSøknad = async (page: Page) => {
    await page
        .getByRole('checkbox', {
            name: 'Jeg bekrefter at opplysningene jeg har gitt er riktige, og at jeg ikke har holdt tilbake opplysninger som har betydning for min rett til omsorgspenger.',
        })
        .check();
    await page.locator('button[type="submit"]').click();
    await expect(
        page.getByRole('heading', {
            name: 'Vi har mottatt søknad om ekstra omsorgsdager for barn som har kronisk/langvarig sykdom eller funksjonshemning',
        }),
    ).toBeVisible();
    await expect(page).toHaveURL(/\/kvittering$/);
};

const expectFellesOppsummering = async (page: Page) => {
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

test('fyller ut søknaden med registrert barn, vedlegg og sender inn', async ({ page }) => {
    await startSøknad(page, ScenarioType.default);

    await page.getByText('Alfa Testesen').click();
    await fyllUtFellesBarnespørsmål(page);
    await lastOppLegeerklæringOgGåTilOppsummering(page);
    await expectFellesOppsummering(page);
    await expect(page.getByText('Alfa Testesen')).toBeVisible();
    await expect(page.getByText('8. juni 2019')).toBeVisible();
    await expect(page.getByText('Din relasjon til barnet')).toHaveCount(0);

    await sendInnSøknad(page);
});

test('fyller ut søknaden uten registrerte barn, vedlegg og sender inn', async ({ page }) => {
    await startSøknad(page, ScenarioType.ingenRegistrerteBarn);

    await page.getByText('Søknaden gjelder et annet barn').click();
    await page.getByLabel('Barnets fødselsdato').fill('08.06.2019');
    await page.getByLabel('Barnets fødselsnummer/D-nummer').fill('09847696068');
    await page.getByLabel('Barnets navn').fill('Beta Testesen');
    await page.getByRole('group', { name: 'Min relasjon til barnet' }).getByRole('radio', { name: 'Mor' }).check();
    await fyllUtFellesBarnespørsmål(page);
    await lastOppLegeerklæringOgGåTilOppsummering(page);
    await expectFellesOppsummering(page);
    await expect(page.getByText('Beta Testesen')).toBeVisible();
    await expect(page.getByText('09847696068')).toBeVisible();
    await expect(page.getByText('7. juni 2019')).toBeVisible();
    await expectSummaryValue(page, 'Din relasjon til barnet', 'Mor');

    await sendInnSøknad(page);
});
