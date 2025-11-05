// fea3b98e-9042-4c60-aee9-f3817151b539

import { expect, test } from '@playwright/test';

import { ScenarioType } from '../../../mock/scenarios/types';
import { memoryStore } from '../../../mock/state/memoryStore';
import { registerMockRoutes } from '../../utils/registerMockRoutes';
import { setNow } from '../../utils/setNow';
import { testAccessibility } from '../../utils/testAccessibility';

test.beforeEach(async ({ page, context }) => {
    await setNow(page);
    await registerMockRoutes(page, context);
    memoryStore.setScenario(ScenarioType.søknadSendt);
    await page.goto(`./`);
});

test.describe('Innsyn - oppgaver', () => {
    test('Forside er tilgjengelig', async ({ page }) => {
        await expect(page.getByRole('heading', { name: 'Din ungdoms­program­ytelse' })).toBeVisible();
        await testAccessibility(page);
    });

    test('Søk ytelse oppgave', async ({ page }) => {
        await page.getByRole('link', { name: 'Søknad for' }).click();
        await testAccessibility(page);
        await expect(page.getByRole('heading', { name: 'Søknad for ungdoms' })).toBeVisible();
        await expect(page.getByText('Startdato1. mai')).toBeVisible();
        await expect(page.getByText('Du kan se alle dine svar i sø')).toBeVisible();
        await page.getByRole('button', { name: 'Tilbake til oversikten' }).click();
        await expect(page.getByRole('heading', { name: 'Din ungdomsprogramytelse' })).toBeVisible();
    });

    test.describe('Endret startdato', () => {
        test.beforeEach(async ({ page }) => {
            memoryStore.setScenario(ScenarioType.endretStartdato);
            await page.goto(`./`);
        });

        test('Ingen tilbakemelding', async ({ page }) => {
            await page.getByRole('link', { name: 'Se og gi tilbakemelding på' }).click();

            // Detaljer
            await expect(page.getByRole('heading', { name: 'Tilbakemelding på endret' })).toBeVisible();
            await testAccessibility(page);
            await expect(page.getByRole('strong').getByText('22. juni')).toBeVisible();
            await expect(page.getByText('Fristen for å svare er senest 7. aug')).toBeVisible();
            await page.getByRole('radio', { name: 'Nei' }).check();
            await page.getByRole('button', { name: 'Send inn svaret ditt' }).click();

            // Kvittering
            await expect(page.getByRole('heading', { name: 'Tilbakemelding på endret' })).toBeVisible();
            await testAccessibility(page);
            await expect(page.getByText('Svaret ditt er sendt innDu')).toBeVisible();
            await page.getByRole('button', { name: 'Tilbake til oversikten' }).click();

            // Forside
            await expect(page.getByRole('heading', { name: 'Din ungdomsprogramytelse' })).toBeVisible();
            const tidligereOppgaver = await page.locator('div:has-text("Tidligere oppgaver")');
            await expect(
                tidligereOppgaver.getByRole('link', { name: 'Se og gi tilbakemelding på endret startdato' }),
            ).toBeVisible();

            // Kontroller at svar vises riktig
            await tidligereOppgaver.getByRole('link', { name: 'Se og gi tilbakemelding på endret startdato' }).click();
            await expect(page.getByRole('heading', { name: 'Tilbakemelding på endret' })).toBeVisible();
            await expect(page.getByText('Har du en tilbakemelding på startdatoen?Nei')).toBeVisible();
        });
        test('Med tilbakemelding', async ({ page }) => {
            await page.getByRole('link', { name: 'Se og gi tilbakemelding på' }).click();

            // Detaljer
            await expect(page.getByRole('heading', { name: 'Tilbakemelding på endret' })).toBeVisible();
            await testAccessibility(page);
            await expect(page.getByRole('strong').getByText('22. juni')).toBeVisible();
            await expect(page.getByText('Fristen for å svare er senest 7. aug')).toBeVisible();
            await page.getByRole('radio', { name: 'Ja' }).check();
            await page.getByRole('textbox', { name: 'Tilbakemelding' }).click();
            await page.getByRole('textbox', { name: 'Tilbakemelding' }).fill('Startdatoen er ikke riktig');
            await page.getByRole('button', { name: 'Send inn svaret ditt' }).click();

            // Kvittering
            await expect(page.getByRole('heading', { name: 'Tilbakemelding på endret' })).toBeVisible();
            await testAccessibility(page);
            await expect(page.getByText('Svaret ditt er sendt innDu')).toBeVisible();
            await page.getByRole('button', { name: 'Tilbake til oversikten' }).click();

            // Forside
            await expect(page.getByRole('heading', { name: 'Din ungdomsprogramytelse' })).toBeVisible();

            const tidligereOppgaver = await page.locator('div:has-text("Tidligere oppgaver")');
            await expect(
                tidligereOppgaver.getByRole('link', { name: 'Se og gi tilbakemelding på endret startdato' }),
            ).toBeVisible();
            await tidligereOppgaver.getByRole('link', { name: 'Se og gi tilbakemelding på endret startdato' }).click();
            await expect(page.getByRole('heading', { name: 'Tilbakemelding på endret' })).toBeVisible();
            await expect(page.getByText('Har du en tilbakemelding på startdatoen?Ja')).toBeVisible();
            await expect(page.getByText('TilbakemeldingStartdatoen er')).toBeVisible();
        });
    });

    test.describe('Meld fra om inntekt', async () => {
        test.beforeEach(async ({ page }) => {
            memoryStore.setScenario(ScenarioType.rapporterInntekt);
            await page.goto(`./`);
        });

        test('Ingen inntekt', async ({ page }) => {
            const nyeOppgaver = page.getByRole('heading', { name: 'Dine oppgaver' }).locator('..');
            await nyeOppgaver.getByRole('link', { name: 'Meld fra om du hadde inntekt i juli' }).click();
            await expect(page.getByRole('heading', { name: 'Inntekt i juli' })).toBeVisible();
            await page.getByLabel('Hadde du inntekt i juli?').getByText('Nei').click();
            await page.getByRole('button', { name: 'Send inn svaret ditt' }).click();
            await expect(page.getByText('Svaret ditt er sendt innTakk')).toBeVisible();
            await page.getByRole('button', { name: 'Tilbake til oversikten' }).click();

            const tidligereOppgaver = page.getByRole('heading', { name: 'Tidligere oppgaver' }).locator('..');
            await tidligereOppgaver.getByRole('link', { name: 'Meld fra om du hadde inntekt i juli' }).click();
            await expect(page.getByText('Hadde du inntekt i juli?Nei')).toBeVisible();
        });
        test('Med inntekt', async ({ page }) => {
            const nyeOppgaver = page.getByRole('heading', { name: 'Dine oppgaver' }).locator('..');
            await nyeOppgaver.getByRole('link', { name: 'Meld fra om du hadde inntekt i juli' }).click();
            await expect(page.getByRole('heading', { name: 'Inntekt i juli' })).toBeVisible();
            await page.getByRole('radio', { name: 'Ja' }).click();
            await page.getByRole('textbox', { name: 'Hvor mye hadde du i inntekt før' }).fill('2350');
            await page.getByRole('button', { name: 'Send inn svaret ditt' }).click();
            await expect(page.getByText('Svaret ditt er sendt innVi får')).toBeVisible();
            await page.getByRole('button', { name: 'Tilbake til oversikten' }).click();

            const tidligereOppgaver = page.getByRole('heading', { name: 'Tidligere oppgaver' }).locator('..');
            await tidligereOppgaver.getByRole('link', { name: 'Meld fra om du hadde inntekt i juli' }).click();
            await expect(page.getByText('Hadde du inntekt i juli?Ja')).toBeVisible();
            await expect(page.getByText('Inntekt før skatt2 350')).toBeVisible();
            await page.getByRole('button', { name: 'Tilbake til oversikten' }).click();
        });
    });
    test.describe('Tilbakemelding om avvik i inntekt', async () => {
        test.beforeEach(async ({ page }) => {
            memoryStore.setScenario(ScenarioType.avvikInntekt);
            await page.goto(`./`);
        });
        test('Ingen tilbakemelding/stemmer inntekten', async ({ page }) => {
            const nyeOppgaver = page.getByRole('heading', { name: 'Dine oppgaver' }).locator('..');
            await nyeOppgaver.getByRole('link', { name: 'Sjekk inntekten din i juli 2025' }).click();
            await expect(page.getByRole('heading', { name: 'Tilbakemelding på inntekt i juli 2025' })).toBeVisible();
            await expect(page.getByRole('row', { name: 'SJOKKERENDE ELEKTRIKER 20' })).toBeVisible();
            await expect(page.getByText('7. august 2025', { exact: true })).toBeVisible();
            await page.getByRole('radio', { name: 'Ja, inntekten stemmer' }).check();
            await page.getByTestId('typedFormikForm-submitButton').click();
            // Kvittering
            await expect(page.getByText('Svaret ditt er sendt innVi')).toBeVisible();
            await page.getByRole('button', { name: 'Tilbake til oversikten' }).click();

            const tidligereOppgaver = page.getByRole('heading', { name: 'Tidligere oppgaver' }).locator('..');
            await tidligereOppgaver.getByRole('link', { name: 'Sjekk inntekten din i juli 2025' }).click();
            await expect(page.getByRole('row', { name: 'SJOKKERENDE ELEKTRIKER 20' }).getByRole('cell')).toBeVisible();
            await expect(page.getByText('Stemmer inntekten vi har fått oppgitt?Ja')).toBeVisible();
            await page.getByRole('button', { name: 'Tilbake til oversikten' }).click();
            await expect(page.getByText('Din ungdomsprogramytelseStartdato 15. juni')).toBeVisible();
        });
        test('Med tilbakemelding/er inntekten feil', async ({ page }) => {
            const nyeOppgaver = page.getByRole('heading', { name: 'Dine oppgaver' }).locator('..');
            await nyeOppgaver.getByRole('link', { name: 'Sjekk inntekten din i juli 2025' }).click();
            await expect(page.getByRole('heading', { name: 'Tilbakemelding på inntekt i juli 2025' })).toBeVisible();
            await expect(page.getByRole('row', { name: 'SJOKKERENDE ELEKTRIKER 20' })).toBeVisible();
            await expect(page.getByText('7. august 2025', { exact: true })).toBeVisible();
            await page.getByRole('radio', { name: 'Nei' }).check();
            await page.getByRole('textbox', { name: 'Tilbakemelding' }).fill('Inntekten fra SJOKKERENDE');
            await page.getByRole('button', { name: 'Send inn svaret ditt' }).click();

            // Kvittering
            await expect(page.getByRole('heading', { name: 'Tilbakemelding på inntekt i juli 2025' })).toBeVisible();
            await testAccessibility(page);
            await expect(page.getByText('Svaret ditt er sendt innVi')).toBeVisible();
            await page.getByRole('button', { name: 'Tilbake til oversikten' }).click();

            // Forside
            const tidligereOppgaver = page.getByRole('heading', { name: 'Tidligere oppgaver' }).locator('..');
            await tidligereOppgaver.getByRole('link', { name: 'Sjekk inntekten din i juli 2025' }).click();

            // Oppsummering
            await expect(page.getByRole('row', { name: 'SJOKKERENDE ELEKTRIKER 20' }).getByRole('cell')).toBeVisible();
            await expect(page.getByText('Stemmer inntekten vi har fått oppgitt?Nei')).toBeVisible();
            await expect(page.getByText('TilbakemeldingInntekten fra')).toBeVisible();
            await page.getByRole('button', { name: 'Tilbake til oversikten' }).click();

            // Forside
            await expect(page.getByText('Din ungdomsprogramytelseStartdato 15. juni')).toBeVisible();
        });
    });
});
