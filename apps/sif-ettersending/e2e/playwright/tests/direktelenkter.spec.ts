import { expect, test } from '@playwright/test';
import { Søknadstype } from '../../../src/types/Søknadstype';
import { playwrightApiMockData } from '../mock-data/playwrightApiMockData';
import { startUrl } from '../utils/utfyllingUtils';

export const getSøknadstypeUrl = (søknadstype: string) => {
    return `${startUrl}/${søknadstype}`;
};

test.describe('Direktelenker', () => {
    test.beforeEach(async ({ page }) => {
        await page.route('https://login.nav.no/**', async (route) => {
            await route.fulfill({ status: 200 });
        });
        await page.route('https://www.nav.no/person/nav-dekoratoren-api/auth', async (route) => {
            await route.fulfill({ status: 200 });
        });
        await page.route('**/mellomlagring/ETTERSENDING_PLEIEPENGER_SYKT_BARN', async (route) => {
            await route.fulfill({ status: 200, body: '{}' });
        });
        await page.route('**/oppslag/soker', async (route) => {
            await route.fulfill({ status: 200, body: JSON.stringify(playwrightApiMockData.søkerMock) });
        });
        await page.route('**/oppslag/barn', async (route) => {
            await route.fulfill({ status: 200, body: JSON.stringify(playwrightApiMockData.barnMock) });
        });
    });

    test('Kommer til valg av ytelse når url ikke inneholder søknadstype', async ({ page }) => {
        await page.goto(startUrl);
        await expect(page.locator('text=Velg hva denne ettersendelsen gjelder')).toBeVisible();
    });

    test('Direkte til ettersendelse PSB', async ({ page }) => {
        await page.goto(getSøknadstypeUrl(Søknadstype.pleiepengerSyktBarn));
        await expect(
            page.getByText('Ettersendelse av dokumentasjon til søknad om pleiepenger for sykt barn'),
        ).toBeVisible();
    });

    test('Pils', async ({ page }) => {
        await page.goto(getSøknadstypeUrl(Søknadstype.pleiepengerLivetsSluttfase));
        await expect(
            page.getByText('Ettersendelse av dokumentasjon til søknad om pleiepenger i livets sluttfase'),
        ).toBeVisible();
    });

    test('Omsorgspenger - generell', async ({ page }) => {
        await page.goto(getSøknadstypeUrl(Søknadstype.omsorgspenger));
        await expect(page.getByText('Ettersendelse av dokumentasjon for omsorgspenger')).toBeVisible();
    });

    test('Omsorgspenger - kronisk syk', async ({ page }) => {
        await page.goto(getSøknadstypeUrl(Søknadstype.ekstraomsorgsdager));
        await expect(
            page.getByText(
                'Søknad om ekstra omsorgsdager for barn som har kronisk/langvarig sykdom eller funksjonshemning',
            ),
        ).toBeVisible();
    });

    test('Omsorgspenger - SN/Fri', async ({ page }) => {
        await page.goto(getSøknadstypeUrl(Søknadstype.utbetaling));
        await expect(
            page.getByText('Søknad om utbetaling av omsorgspenger for selvstendig næringsdrivende og frilansere'),
        ).toBeVisible();
    });

    test('Omsorgspenger - arbeidstaker', async ({ page }) => {
        await page.goto(getSøknadstypeUrl(Søknadstype.utbetalingarbeidstaker));
        await expect(
            page.getByText('Søknad om utbetaling av omsorgspenger når arbeidsgiver ikke utbetaler'),
        ).toBeVisible();
    });

    test('Omsorgspenger - regnet som alene', async ({ page }) => {
        await page.goto(getSøknadstypeUrl(Søknadstype.regnetsomalene));
        await expect(
            page.getByText('Søknad om ekstra omsorgsdager når den andre forelderen ikke kan ha tilsyn med barn'),
        ).toBeVisible();
    });
});
