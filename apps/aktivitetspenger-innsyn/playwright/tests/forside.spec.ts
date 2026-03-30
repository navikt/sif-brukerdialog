import { expect, test } from '@playwright/test';

import { setScenario } from '../utils/scenario';
import { testAccessibility } from '../utils/testAccessibility';

test('viser tomtilstand for uloste oppgaver i default-scenarioet', async ({ page }) => {
    await setScenario(page, 'default');

    await page.goto('/');

    await expect(page.getByRole('heading', { name: 'Dine aktivitetspenger' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Dine oppgaver' })).toBeVisible();
    await expect(page.getByText('Du har ingen uløste oppgaver')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Tidligere oppgaver' })).toBeVisible();

    await testAccessibility(page);
});

test('kan åpne en oppgave direkte med BrowserRouter og scenario-data', async ({ page }) => {
    await setScenario(page, 'avvikInntekt');

    await page.goto('/');

    await page.getByRole('link', { name: /Sjekk inntekten din i/i }).click();

    await expect(page).toHaveURL(/\/oppgave\//);
    await expect(page.getByText('Stemmer inntekten vi har fått oppgitt?')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Send inn svaret ditt' })).toBeVisible();

    await testAccessibility(page);
});
