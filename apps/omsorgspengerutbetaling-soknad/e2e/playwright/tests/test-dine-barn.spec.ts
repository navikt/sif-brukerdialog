import { test, expect, Page } from '@playwright/test';
import { playwrightApiMockData } from '../mock-data/playwrightApiMockData';
import { utfyllingUtils } from '../utils/utfyllingUtils';

const startScenario = async (page: Page, barnMockData: any) => {
    await page.route('https://**.nav.no/**', async (route) => {
        await route.fulfill({ status: 200 });
    });
    await page.route('**/mellomlagring/OMSORGSPENGER_UTBETALING_SNF', async (route) => {
        await route.fulfill({ status: 200, body: '{}' });
    });
    await page.route('**/oppslag/soker', async (route) => {
        await route.fulfill({ status: 200, body: JSON.stringify(playwrightApiMockData.søkerMock) });
    });
    await page.route('**/vedlegg', async (route) => {
        await route.fulfill({
            status: 200,
            headers: { Location: '/vedlegg', 'access-control-expose-headers': 'Location' },
        });
    });
    await page.route('**/innsending', async (route) => {
        await route.fulfill({ status: 200 });
    });
    await page.route('**/oppslag/barn', async (route) => {
        await route.fulfill({ status: 200, body: JSON.stringify(barnMockData) });
    });
};

const svarUtils = (page: Page) => ({
    harSøktOmEkstraDager: async (harSøkt: boolean) => {
        await page
            .getByRole('group', { name: 'Har du fått ekstra omsorgsdager for et barn' })
            .getByLabel(harSøkt ? 'Ja' : 'Nei')
            .click();
    },
    harAleneomsorg: async (harSøkt: boolean) => {
        await page
            .getByRole('group', { name: 'alene om omsorgen' })
            .getByLabel(harSøkt ? 'Ja' : 'Nei')
            .click();
    },
    harDekketDeTiFørsteDagene: async (harDekket: boolean) => {
        await page
            .getByRole('group', { name: 'Har du dekket de 10 første omsorgsdagene i år?' })
            .getByLabel(harDekket ? 'Ja' : 'Nei')
            .click();
    },
});

test.describe('Tester varianter av Dine barn steg', () => {
    test('To barn under 13 år', async ({ page }) => {
        await startScenario(page, playwrightApiMockData.barnMock.toBarnUnder13);
        await utfyllingUtils.startSøknad(page);

        await svarUtils(page).harSøktOmEkstraDager(true);
    });
    test('Tre barn under 13 år', async ({ page }) => {
        await startScenario(page, playwrightApiMockData.barnMock.treBarnUnder13);
        await utfyllingUtils.startSøknad(page);
    });
    test('Tre barn under 13 år, ett over', async ({ page }) => {
        await startScenario(page, playwrightApiMockData.barnMock.treBarnUnder13);
        await utfyllingUtils.startSøknad(page);
    });
    test('Ett barn over og ett under 13 år - ikke søkt men har aleneomsorg', async ({ page }) => {
        await startScenario(page, playwrightApiMockData.barnMock.ettOverOgEttUnder13);
        await utfyllingUtils.startSøknad(page);

        await svarUtils(page).harSøktOmEkstraDager(false);
        await svarUtils(page).harAleneomsorg(true);
    });
    test('Kun barn over 13 år', async ({ page }) => {
        await startScenario(page, playwrightApiMockData.barnMock.ettBarnOver13);
        await utfyllingUtils.startSøknad(page);

        /** Har søkt utvidet */
        await svarUtils(page).harSøktOmEkstraDager(true);
        await expect(page.getByRole('button', { name: 'Neste' })).toBeEnabled();

        /** Har ikke søkt utvidet */
        await svarUtils(page).harSøktOmEkstraDager(false);
        await expect(page.getByText('For å ha rett til omsorgspenger fra det året barnet fyller 13 år')).toBeVisible();
        await expect(page.getByRole('button', { name: 'Neste' })).toBeDisabled();
    });
    test('Ingen barn', async ({ page }) => {
        await startScenario(page, playwrightApiMockData.barnMock.ingenBarn);
        await utfyllingUtils.startSøknad(page);

        await page.getByRole('button', { name: 'Neste' }).click();
        await expect(page.getByRole('link', { name: 'Du må legge til minst ett' })).toBeVisible();
    });
});
