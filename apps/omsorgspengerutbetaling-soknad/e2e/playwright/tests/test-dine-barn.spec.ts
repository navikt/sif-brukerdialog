import { Page, expect, test } from '@playwright/test';
import { playwrightApiMockData } from '../mock-data/playwrightApiMockData';
import { utfyllingUtils } from '../utils/utfyllingUtils';

const fyllUtOmBarnfyllUtOmBarnToUnder13år = async (page: Page) => {
    await page.getByRole('heading', { name: 'Om barn' });
    await page.getByRole('group', { name: 'Har du søkt om eller fått ekstra' }).getByLabel('Ja').click();
    await page.getByRole('group', { name: 'Har du dekket de 10 første omsorgsdagene i år?' }).getByLabel('Ja').click();
    await page.getByTestId('typedFormikForm-submitButton').click();
};
const fyllUtOmBarnfyllUtOmBarnTreUnder13år = async (page: Page) => {
    await page.getByRole('heading', { name: 'Om barn' });
    await page.getByRole('group', { name: 'Har du dekket de 10 første omsorgsdagene i år?' }).getByLabel('Ja').click();
    await page.getByTestId('typedFormikForm-submitButton').click();
};

test.describe('Tester varianter av Dine barn steg', () => {
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
            await route.fulfill({ status: 200, body: JSON.stringify(playwrightApiMockData.barnMock.toBarnUnder13) });
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
    });

    test('Fyller ut søknad med to barn under 13 år', async ({ page }) => {
        await utfyllingUtils.startSøknad(page);
        await fyllUtOmBarnfyllUtOmBarnToUnder13år(page);
        await expect(page.getByRole('heading', { level: 1, name: 'Dager du søker om utbetaling for' })).toBeVisible();
    });

    test('Fyller ut søknad med tre barn under 13 år', async ({ page }) => {
        await page.route('**/oppslag/barn', async (route) => {
            await route.fulfill({ status: 200, body: JSON.stringify(playwrightApiMockData.barnMock.treBarnUnder13) });
        });
        await utfyllingUtils.startSøknad(page);
        await fyllUtOmBarnfyllUtOmBarnTreUnder13år(page);
        await expect(page.getByRole('heading', { level: 1, name: 'Dager du søker om utbetaling for' })).toBeVisible();
    });
});
