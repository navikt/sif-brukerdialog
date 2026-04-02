import { expect, Page, test } from '@playwright/test';
import { ScenarioType } from '../../mock/scenarios/types';

import { setScenario } from '../utils/scenario';
import { testAccessibility } from '../utils/testAccessibility';

const åpneOppgaveFraForside = async (page: Page, oppgaveTittel: RegExp) => {
    await page.goto('/');
    await page.getByRole('link', { name: oppgaveTittel }).click();
    await expect(page).toHaveURL(/\/oppgave\//);
};

const gåTilbakeTilForsideOgVerifiserBesvart = async (page: Page) => {
    await page.getByRole('button', { name: 'Tilbake til oversikten' }).click();
    await expect(page.getByRole('heading', { name: 'Dine oppgaver' })).toBeVisible();
    await expect(page.getByText('Du har ingen uløste oppgaver')).toBeVisible();
};

test('rapporterInntektDelerAvMåned kan besvares og viser registrert svar ved gjenåpning', async ({ page }) => {
    await setScenario(page, ScenarioType.rapporterInntektDelerAvMåned);

    await åpneOppgaveFraForside(page, /Meld fra om du hadde inntekt i/i);

    await expect(page.getByText(/selv om du ikke hadde ungdomsprogramytelsen hele måneden/i)).toBeVisible();

    await page
        .getByRole('group', { name: /Hadde du inntekt i/i })
        .getByLabel('Ja')
        .check();
    await page.getByLabel('Hvor mye hadde du i inntekt før skatt?').fill('9800');
    await page.getByRole('button', { name: 'Send inn svaret ditt' }).click();

    await expect(page.getByRole('heading', { name: 'Svaret ditt er sendt inn' })).toBeVisible();
    await testAccessibility(page);

    await gåTilbakeTilForsideOgVerifiserBesvart(page);

    await page.getByRole('link', { name: /Meld fra om du hadde inntekt i/i }).click();
    await expect(page.getByRole('heading', { name: 'Oppsummering' })).toBeVisible();
    await expect(page.getByText(/Hadde du inntekt i.*Ja/s)).toBeVisible();
    await expect(page.getByText(/Inntekt før skatt/i)).toBeVisible();
    await testAccessibility(page);
});

test('avvikInntekt kan besvares med ja og viser registrert svar ved gjenåpning', async ({ page }) => {
    await setScenario(page, ScenarioType.avvikInntekt);

    await åpneOppgaveFraForside(page, /Sjekk inntekten din i/i);

    await page
        .getByRole('group', { name: 'Stemmer inntekten vi har fått oppgitt?' })
        .getByLabel('Ja, inntekten stemmer')
        .check();
    await page.getByRole('button', { name: 'Send inn svaret ditt' }).click();

    await expect(page.getByRole('heading', { name: 'Svaret ditt er sendt inn' })).toBeVisible();
    await testAccessibility(page);

    await gåTilbakeTilForsideOgVerifiserBesvart(page);

    await page.getByRole('link', { name: /Sjekk inntekten din i/i }).click();
    await expect(page.getByRole('heading', { name: /Tilbakemelding på inntekt/i })).toBeVisible();
    await expect(page.getByText(/Stemmer inntekten vi har fått oppgitt\?/i)).toBeVisible();
    await expect(page.getByText('Ja, inntekten stemmer')).toBeVisible();
    await testAccessibility(page);
});

test('avvikInntektDelerAvMåned kan besvares med nei og tekst, og viser registrert svar ved gjenåpning', async ({
    page,
}) => {
    await setScenario(page, ScenarioType.avvikInntektDelerAvMåned);

    await åpneOppgaveFraForside(page, /Sjekk inntekten din i/i);

    const tilbakemelding = 'Beløpet virker for høyt sammenlignet med lønnsslipp.';

    await page
        .getByRole('group', { name: 'Stemmer inntekten vi har fått oppgitt?' })
        .getByLabel('Nei, inntekten stemmer ikke. Jeg har en tilbakemelding.')
        .check();
    await page.getByRole('textbox', { name: 'Tilbakemelding' }).fill(tilbakemelding);
    await page.getByRole('button', { name: 'Send inn svaret ditt' }).click();

    await expect(page.getByRole('heading', { name: 'Svaret ditt er sendt inn' })).toBeVisible();
    await testAccessibility(page);

    await gåTilbakeTilForsideOgVerifiserBesvart(page);

    await page.getByRole('link', { name: /Sjekk inntekten din i/i }).click();
    await expect(page.getByRole('heading', { name: /Tilbakemelding på inntekt/i })).toBeVisible();
    await expect(page.getByText('Nei, inntekten stemmer ikke. Jeg har en tilbakemelding.')).toBeVisible();
    await expect(page.getByText(tilbakemelding)).toBeVisible();
    await testAccessibility(page);
});
