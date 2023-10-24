import { test, expect } from '@playwright/test';
import { playwrightApiMockData } from '../mock-data/playwrightApiMockData';

const startUrl = 'http://localhost:8080/familie/sykdom-i-familien/soknad/omsorgspengerutbetaling';

test.describe('Fyller ut søknad', () => {
    test.beforeEach(async ({ page }) => {
        await page.route('https://**.nav.no/**', async (route) => {
            await route.fulfill({ status: 200 });
        });
        await page.route('**/mellomlagring/OMSORGSPENGER_UTBETALING_SNF', async (route) => {
            await route.fulfill({ status: 200, body: '{}' });
        });
        await page.route('**/oppslag/soker', async (route) => {
            await route.fulfill({ status: 200, body: JSON.stringify(playwrightApiMockData.søkerMock) });
        });
        await page.route('**/oppslag/barn', async (route) => {
            await route.fulfill({ status: 200, body: JSON.stringify(playwrightApiMockData.barnMock) });
        });
    });

    test('Fyller ut søknad med valgt barn', async ({ page }) => {
        await page.goto(startUrl);
        const intro = page.locator('.navds-guide-panel__content');
        await expect(intro).toContainText('Velkommen til søknad om omsorgspenger');
        await page.getByLabel('Jeg bekrefter at jeg har forstått mitt ansvar som søker').check();
        await page.getByRole('button').getByText('Start søknad').click();

        /** Steg 1 - Om barn */
        await page.getByRole('heading', { name: 'Om barn' });
        await page.getByText('Ja, jeg bekrefter at jeg har dekket 10 omsorgsdager i år.').click();
        await page.getByTestId('typedFormikForm-submitButton').click();

        /** Steg 2 - Dager du søker om utbetaling for */
        await page.getByRole('heading', { name: 'Dager du søker om utbetaling for' });
        await page.getByTestId('harPerioderMedFravær_yes').check();
        await page.getByRole('button', { name: 'Legg til dager med fullt fravær fra jobb' }).click();
        await page.getByRole('button', { name: 'Åpne datovelger' }).first().click();
        await page.getByLabel('2. oktober (mandag)').click();
        await page.getByRole('button', { name: 'Åpne datovelger' }).nth(1).click();
        await page.getByLabel('6. oktober (fredag)').click();
        await page.getByLabel('Dager med fullt fravær fra jobb').getByTestId('typedFormikForm-submitButton').click();
        await page.getByTestId('harDagerMedDelvisFravær_no').check();
        await page.getByTestId('perioder_harVærtIUtlandet_no').check();
        await page.getByTestId('typedFormikForm-submitButton').click();

        /** Steg 3 - Last opp legeerklæring */
        await page.getByRole('heading', { name: 'Last opp legeerklæring' });
        await page.getByTestId('typedFormikForm-submitButton').click();

        /** Steg 4 - Arbeidssituasjon */
        await page.getByRole('heading', { name: 'Arbeidssituasjon' });
        await page.getByTestId('frilans_erFrilanser_yes').check();
        await page.getByLabel('Når startet du som frilanser?').click();
        await page.getByLabel('Når startet du som frilanser?').fill('01.01.2003');
        await page.getByLabel('Når startet du som frilanser?').press('Tab');
        await page.getByTestId('frilans_jobberFortsattSomFrilans_yes').check();
        await page.getByTestId('selvstendig_erSelvstendigNæringsdrivende_no').check();
        await page.getByTestId('typedFormikForm-submitButton').click();

        /** Steg 5 - Medlemsskap */
        await page.getByRole('heading', { name: 'Medlemskap i folketrygden' });
        await page.getByTestId('medlemskap-annetLandSiste12').getByText('Nei').click();
        await page.getByTestId('medlemskap-annetLandNeste12_no').check();
        await page.getByTestId('typedFormikForm-submitButton').click();

        /** Oppsummering */
        await page.getByRole('heading', { name: 'Oppsummering' });
        await page.getByTestId('bekreft-label').click();
        await page.getByTestId('typedFormikForm-submitButton').click();

        await page.getByRole('heading', { name: 'Vi har mottatt søknad om utbetaling av omsorgspenger' });
    });
});
