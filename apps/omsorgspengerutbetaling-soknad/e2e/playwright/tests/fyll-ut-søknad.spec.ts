import { test } from '@playwright/test';
import { playwrightApiMockData } from '../mock-data/playwrightApiMockData';
import { utfyllingUtils } from '../utils/utfyllingUtils';

// const startUrl = 'http://localhost:8080/familie/sykdom-i-familien/soknad/omsorgspengerutbetaling';

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
        await page.route('**/vedlegg', async (route) => {
            await route.fulfill({
                status: 200,
                headers: { Location: '/vedlegg', 'access-control-expose-headers': 'Location' },
            });
        });
    });

    test('Fyller ut søknad med valgt barn', async ({ page }) => {
        await utfyllingUtils.startSøknad(page);
        await utfyllingUtils.fyllUtOmBarnMinstEttYngre13år(page);
        await utfyllingUtils.fyllUtFraværSteg(page);
        await utfyllingUtils.lastOppLegeerklæring(page);

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
