import { test } from '@playwright/test';
import { playwrightApiMockData } from '../mock-data/playwrightApiMockData';

const startUrl =
    'http://localhost:8080/familie/sykdom-i-familien/soknad/pleiepenger-i-livets-sluttfase/soknad/velkommen';

test.describe('Fylle ut og sende inn søknad', () => {
    test.beforeEach(async ({ page }) => {
        await page.route('https://login.nav.no/**', async (route) => {
            await route.fulfill({ status: 200 });
        });
        await page.route('https://www.nav.no/person/nav-dekoratoren-api/auth', async (route) => {
            await route.fulfill({ status: 200 });
        });
        await page.route('**/mellomlagring/PLEIEPENGER_LIVETS_SLUTTFASE', async (route) => {
            await route.fulfill({ status: 200, body: '{}' });
        });
        await page.route('**/oppslag/soker', async (route) => {
            await route.fulfill({ status: 200, body: JSON.stringify(playwrightApiMockData.søkerMock) });
        });
        await page.route('**/oppslag/arbeidsgiver', async (route) => {
            await route.fulfill({ status: 200, body: JSON.stringify(playwrightApiMockData.arbeidsgiverMock) });
        });
        await page.route('**/innsending', async (route) => {
            await route.fulfill({ status: 200 });
        });
    });

    test('Søknad med fnr', async ({ page }) => {
        await page.goto(startUrl);

        /** Velkommen side */
        await page.getByRole('heading', { level: 1, name: 'Hei PRESENTABEL' });
        await page.getByLabel('Jeg bekrefter at jeg har forstått mitt ansvar som søker').click();
        await page.getByRole('button', { name: 'Start søknad' }).click();

        /** Pleietrengende side */
        await page.getByRole('heading', { level: 1, name: 'Om personen du pleier' });
        await page.getByLabel('Navn på den du skal pleie').fill('Test Testesen');
        await page.getByRole('textbox', { name: 'Fødselsnummer/D-nummer' }).fill('27857798800');
        await page
            .getByRole('group', { name: 'Er dere flere som skal dele på pleiepengene?' })
            .getByLabel('Ja')
            .check();
        await page.getByRole('button', { name: 'Neste' }).click();

        /** Tidsrom side */
        await page.getByRole('heading', { level: 1, name: 'Dager du må være hjemme fra jobb for å gi pleie' });
        await page
            .getByRole('group', { name: 'Hvilke dager skal du være hjemme fra jobb for å gi pleie?' })
            .getByRole('button', { name: '33' })
            .click();
    });
});
