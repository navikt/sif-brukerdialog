import { setNow } from '../utils/setNow';
import { setupMockRoutes } from '../utils/setupMockRoutes';
import { test } from '@playwright/test';

test.beforeEach(async ({ page, context }) => {
    await setNow(page);
    await setupMockRoutes(page, context);
});

test('Hent opp registrert deltaker', async ({ page }) => {
    await page.goto(`./`);
    await page.getByRole('textbox', { name: 'Fødselsnummer/d-nummer:' }).fill('56857102105');
    await page.getByRole('button', { name: 'Søk' }).click();
    await page.getByText('TØFFEL, GLORETE').click();
    await page.getByText('Ikke registrert som deltaker').click();
    await page.getByText('Registrer som ny deltaker').click();
    await page.getByRole('button', { name: 'Åpne datovelger' }).click();
    await page.getByRole('button', { name: 'torsdag 29' }).click();
    await page.locator('label').filter({ hasText: 'Bekreft deltakelse' }).click();
    await page.getByRole('checkbox', { name: 'Bekreft deltakelse' }).uncheck();
    await page.getByRole('button', { name: 'Registrer' }).click();
    await page.getByText('Du må bekrefte deltakelsen').click();
    await page.getByRole('checkbox', { name: 'Bekreft deltakelse' }).check();
    await page.getByRole('button', { name: 'Registrer' }).click();
    await page.getByText('Søknad om ungdomsytelse er').click();
    await page.getByRole('definition').filter({ hasText: 'GLORETE TØFFEL' }).click();
    await page.getByText('02105Kopier').click();
    await page.getByText('(26 år)').click();
    await page.getByText('Startdato:onsdag 01.01.').click();
    await page.getByText('Sluttdato:-Registrer sluttdato').click();
    await page.getByRole('heading', { name: 'Slett deltakelse' }).click();
    await page.getByRole('button', { name: 'Lukk deltaker' }).click();
});
