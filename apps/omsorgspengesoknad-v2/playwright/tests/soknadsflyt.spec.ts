import { expect, test } from '@playwright/test';

import { ScenarioType } from '../../mock/scenarios/types';
import {
    expectFellesOppsummering,
    expectSummaryValue,
    fyllUtFellesBarnespørsmål,
    gåTilOppsummeringMedRegistrertBarn,
    lastOppLegeerklæringOgGåTilOppsummering,
    lastOppVedleggOgFortsett,
    sendInnSøknad,
    startSøknad,
} from '../utils/soknadFlow';

test('fyller ut søknaden med registrert barn, vedlegg og sender inn', async ({ page }) => {
    await gåTilOppsummeringMedRegistrertBarn(page, ScenarioType.default);
    await expectFellesOppsummering(page);
    await expect(page.getByText('Alfa Testesen')).toBeVisible();
    await expect(page.getByText('8. juni 2019')).toBeVisible();
    await expect(page.getByText('Din relasjon til barnet')).toHaveCount(0);

    await sendInnSøknad(page);
});

test('fyller ut søknaden med registrerte barn, velger annet barn med delt bosted og sender inn', async ({ page }) => {
    await startSøknad(page, ScenarioType.default);

    await page.getByText('Søknaden gjelder et annet barn').click();
    await page.getByLabel('Barnets fødselsdato').fill('08.06.2019');
    await page.getByLabel('Barnets fødselsnummer/D-nummer').fill('09847696068');
    await page.getByLabel('Barnets navn').fill('Gamma Testesen');
    await page.getByRole('radiogroup', { name: 'Min relasjon til barnet' }).getByRole('radio', { name: 'Far' }).check();

    await page
        .getByRole('radiogroup', { name: 'Bor du sammen med barnet?' })
        .getByLabel('Ja, barnet har delt fast bosted')
        .check();
    await page
        .getByRole('radiogroup', { name: 'Har barnet kronisk/langvarig sykdom eller funksjonshemning?' })
        .getByRole('radio', { name: 'Ja' })
        .check();
    await page
        .getByRole('radiogroup', {
            name: 'Har du høyere risiko for fravær på jobb på grunn av barnets sykdom eller funksjonshemning?',
        })
        .getByRole('radio', { name: 'Ja' })
        .check();
    await page
        .getByRole('textbox', {
            name: 'Nå trenger vi en beskrivelse fra deg på hvordan barnets sykdom eller funksjonshemning gir markert høyere risiko for fravær fra jobb:',
        })
        .fill('Barnet trenger tett oppfølging og hyppige kontroller som gjør at jeg må være borte fra jobb oftere.');
    await page.locator('button[type="submit"]').click();

    await lastOppVedleggOgFortsett(page, 'Last opp legeerklæringen');

    await lastOppVedleggOgFortsett(page, 'Last opp avtalen');

    await expect(page.getByRole('heading', { name: 'Om deg' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Om barnet' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Vedlegg' })).toBeVisible();
    await expect(page.getByText('02068599258')).toBeVisible();
    await expect(page.getByText('Gamma Testesen')).toBeVisible();
    await expect(page.getByText('09847696068')).toBeVisible();
    await expect(page.getByText('8. juni 2019')).toBeVisible();
    await expectSummaryValue(page, 'Din relasjon til barnet', 'Far');
    await expectSummaryValue(page, 'Bor du sammen med barnet?', 'Ja, barnet har delt fast bosted');
    await expect(page.getByRole('term').filter({ hasText: 'Legeerklæring' })).toBeVisible();
    await expect(page.getByRole('term').filter({ hasText: 'Avtale om delt fast bosted' })).toBeVisible();

    await sendInnSøknad(page);
});

test('fyller ut søknaden uten registrerte barn, vedlegg og sender inn', async ({ page }) => {
    await startSøknad(page, ScenarioType.ingenRegistrerteBarn);

    await page.getByLabel('Barnets fødselsdato').fill('08.06.2019');
    await page.getByLabel('Barnets fødselsnummer/D-nummer').fill('09847696068');
    await page.getByLabel('Barnets navn').fill('Beta Testesen');
    await page.getByRole('group', { name: 'Min relasjon til barnet' }).getByRole('radio', { name: 'Mor' }).check();
    await fyllUtFellesBarnespørsmål(page);
    await lastOppLegeerklæringOgGåTilOppsummering(page);
    await expectFellesOppsummering(page);
    await expect(page.getByText('Beta Testesen')).toBeVisible();
    await expect(page.getByText('09847696068')).toBeVisible();
    await expect(page.getByText('8. juni 2019')).toBeVisible();
    await expectSummaryValue(page, 'Din relasjon til barnet', 'Mor');

    await sendInnSøknad(page);
});
