import { test } from '@playwright/test';
import { playwrightApiMockData } from '../mock-data/playwrightApiMockData';
import { utfyllingUtils } from '../utils/utfyllingUtils';
import { setNow } from '../utils/setNow';

test.beforeEach(async ({ page }) => {
    await setNow(page);
});

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
        await utfyllingUtils.fyllUtOmBarnfyllUtOmBarnToUnder13år(page);
        await utfyllingUtils.fyllUtFraværSteg(page);
        await utfyllingUtils.lastOppLegeerklæring(page);
        await utfyllingUtils.fyllerUtArbeidssituasjonSteg(page);
        await utfyllingUtils.fyllerUtFraværFraSteg(page);
        await utfyllingUtils.fyllUtMedlemsskap(page);
        await utfyllingUtils.sendInnSøknad(page);
        await utfyllingUtils.kontrollerKvittering(page);
    });
});
