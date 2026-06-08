import { expect, test } from '@playwright/test';

import { ScenarioType } from '../../mock/scenarios/types';
import { setScenario } from '../utils/scenario';
import { testAccessibility } from '../utils/testAccessibility';

const rapporterInntektTittel = /Meld fra om du hadde inntekt i/i;

const åpneRapporterInntektOppgave = async (page: import('@playwright/test').Page) => {
    await page.getByRole('link', { name: rapporterInntektTittel }).click();
    await expect(page).toHaveURL(/\/oppgave\//);
    await expect(page.getByRole('heading', { name: /Inntekt i/i })).toBeVisible();
};

test('rapporter inntekt med beløp, og viser registrert svar ved gjenåpning', async ({ page }) => {
    await setScenario(page, ScenarioType.rapporterInntekt);

    await page.goto('/');
    await åpneRapporterInntektOppgave(page);

    await page
        .getByRole('radiogroup', { name: /Hadde du inntekt i/i })
        .getByLabel('Ja')
        .check();
    await page.getByLabel('Hvor mye hadde du i inntekt før skatt?').fill('12345');
    await page.getByRole('button', { name: 'Send inn svaret ditt' }).click();

    await expect(page.getByRole('heading', { name: 'Svaret ditt er sendt inn' })).toBeVisible();
    await expect(page.getByText('Hvis det er forskjell på inntekten du har sendt inn')).toBeVisible();
    await testAccessibility(page);

    await page.getByRole('button', { name: 'Tilbake til oversikten' }).click();

    await expect(page.getByRole('heading', { name: 'Dine oppgaver' })).toBeVisible();
    await expect(page.getByText('Du har ingen uløste oppgaver')).toBeVisible();

    await åpneRapporterInntektOppgave(page);

    await expect(page.getByRole('heading', { name: 'Oppsummering' })).toBeVisible();
    await expect(page.getByText(/Hadde du inntekt i.*Ja/s)).toBeVisible();
    await expect(page.getByText(/Inntekt før skatt/i)).toBeVisible();
    await testAccessibility(page);
});

test('rapporter inntekt uten beløp, og viser registrert nei-svar ved gjenåpning', async ({ page }) => {
    await setScenario(page, ScenarioType.rapporterInntekt);

    await page.goto('/');
    await åpneRapporterInntektOppgave(page);

    await page
        .getByRole('radiogroup', { name: /Hadde du inntekt i/i })
        .getByLabel('Nei')
        .check();
    await page.getByRole('button', { name: 'Send inn svaret ditt' }).click();

    await expect(page.getByRole('heading', { name: 'Svaret ditt er sendt inn' })).toBeVisible();
    await expect(page.getByText('Takk for at du ga oss beskjed.')).toBeVisible();
    await testAccessibility(page);

    await page.getByRole('button', { name: 'Tilbake til oversikten' }).click();

    await expect(page.getByRole('heading', { name: 'Dine oppgaver' })).toBeVisible();
    await expect(page.getByText('Du har ingen uløste oppgaver')).toBeVisible();

    await åpneRapporterInntektOppgave(page);

    await expect(page.getByRole('heading', { name: 'Oppsummering' })).toBeVisible();
    await expect(page.getByText(/Hadde du inntekt i.*Nei/s)).toBeVisible();
    await expect(page.getByText(/Inntekt før skatt/i)).not.toBeVisible();
    await testAccessibility(page);
});
