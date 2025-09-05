import { test } from '@playwright/test';
import { playwrightApiMockData } from '../mock-data/playwrightApiMockData';
import { utfyllingUtils } from '../utils/utfyllingUtils';
import { DokumentType } from '../../src/app/types/DokumentType';
import { YtelseKey } from '../../src/app/types/Ytelser';

test.describe('Start og innsending av ettersending - Pleiepenger sykt barn', () => {
    test.beforeEach(async ({ page }) => {
        await page.route('https://login.nav.no/**', async (route) => {
            await route.fulfill({ status: 200 });
        });
        await page.route('https://login.ekstern.dev.nav.no/**', async (route) => {
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
        await page.route('**/vedlegg', async (route) => {
            await route.fulfill({
                status: 200,
                headers: {
                    Location: '/vedlegg/123',
                    'access-control-expose-headers': 'Location',
                },
            });
        });
        await page.route('**/innsending', async (route) => {
            await route.fulfill({ status: 200 });
        });
    });

    test('Fyller ut og sender inn ett vedlegg', async ({ page }) => {
        await utfyllingUtils.velgYtelsePleiepenger(page);
        await utfyllingUtils.startSøknad(page);
        await utfyllingUtils.fyllUtdokumentTypeSteg(page, DokumentType.annet);
        await utfyllingUtils.fyllUtBarnSteg(page);
        await utfyllingUtils.fyllUtDokumenterSteg(page);
        await utfyllingUtils.kontrollerOppsummeringBarn(page, DokumentType.annet, YtelseKey.pleiepengerSyktBarn);
        await utfyllingUtils.sendInnDokumenter(page);
        await utfyllingUtils.kontrollerKvittering(page);
    });

    test('Fyller ut og sender inn legeerklæring med barn fra liste', async ({ page }) => {
        await utfyllingUtils.velgYtelsePleiepenger(page);
        await utfyllingUtils.startSøknad(page);
        await utfyllingUtils.fyllUtdokumentTypeSteg(page, DokumentType.legeerklæring);
        await utfyllingUtils.fyllUtBarnSteg(page);
        await utfyllingUtils.fyllUtDokumenterSteg(page);
        await utfyllingUtils.kontrollerOppsummeringBarn(
            page,
            DokumentType.legeerklæring,
            YtelseKey.pleiepengerSyktBarn,
        );
        await utfyllingUtils.sendInnDokumenter(page);
        await utfyllingUtils.kontrollerKvitteringLegeerklæring(page);
    });

    test('Fyller ut og sender inn annet med annet barn', async ({ page }) => {
        await utfyllingUtils.velgYtelsePleiepenger(page);
        await utfyllingUtils.startSøknad(page);
        await utfyllingUtils.fyllUtdokumentTypeSteg(page, DokumentType.annet);
        await utfyllingUtils.fyllUtBarnSteg(page, '02869599258');
        await utfyllingUtils.fyllUtDokumenterSteg(page);
        await utfyllingUtils.kontrollerOppsummeringBarn(
            page,
            DokumentType.annet,
            YtelseKey.pleiepengerSyktBarn,
            '02869599258',
        );
        await utfyllingUtils.sendInnDokumenter(page);
        await utfyllingUtils.kontrollerKvittering(page);
    });
});
