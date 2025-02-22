import { test } from '@playwright/test';
import { playwrightApiMockData } from '../mock-data/playwrightApiMockData';
import { setNow } from '../utils/setNow';
import { utfyllingUtils } from '../utils/utfyllingUtils';
import { setupNavnoConsentCookieForPlaywrightTests } from '../../../../../packages/sif-common-core-ds/src/utils/navnoConsentCookieUtils';

test.beforeEach(async ({ page, context }) => {
    await setNow(page);
    await setupNavnoConsentCookieForPlaywrightTests(context);
});

test.describe('Fyller ut søknad', () => {
    test.beforeEach(async ({ page }) => {
        await page.route('https://**.nav.no/**', async (route) => {
            await route.fulfill({ status: 200 });
        });
        await page.route('**/mellomlagring/OMSORGSPENGER_UTBETALING_ARBEIDSTAKER', async (route) => {
            await route.fulfill({ status: 200, body: '{}' });
        });
        await page.route('**/oppslag/soker', async (route) => {
            await route.fulfill({ status: 200, body: JSON.stringify(playwrightApiMockData.søkerMock) });
        });

        await page.route('**/oppslag/barn', async (route) => {
            await route.fulfill({ status: 200, body: JSON.stringify(playwrightApiMockData.barnMock) });
        });

        await page.route('**/oppslag/arbeidsgiver**', async (route) => {
            await route.fulfill({ status: 200, body: JSON.stringify(playwrightApiMockData.arbeidsgiver) });
        });

        await page.route('**/vedlegg', async (route) => {
            await route.fulfill({
                status: 200,
                headers: { Location: '/vedlegg/123', 'access-control-expose-headers': 'Location' },
            });
        });
        await page.route('**/innsending', async (route) => {
            await route.fulfill({ status: 200 });
        });
    });

    test('Fyller ut søknad enkelt', async ({ page }) => {
        await utfyllingUtils.startSøknad(page);
        await utfyllingUtils.fyllUtDineBarnSteg(page);
        await utfyllingUtils.fyllUtDinArbeidssituasjonSteg(page);
        await utfyllingUtils.fyllUtFraværSteg(page);
        await utfyllingUtils.lastOppLegeerklæring(page);
        await utfyllingUtils.fyllUtMedlemsskap(page);
        await utfyllingUtils.sendInnSøknad(page);
        await utfyllingUtils.kontrollerKvittering(page);
    });
});
