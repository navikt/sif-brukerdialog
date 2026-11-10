import { ScenarioType } from '@app/dev/scenarioer';
import { Page } from '@playwright/test';
import dayjs from 'dayjs';

import { getScenarioMockData, getTilgangMockData } from '../../mock/data/scenario';
import { getPlaywrightAppSettings } from '../playwrightAppSettings';

/** Samme regel som getTillattEndringsperiode i appen. Den kan ikke importeres her, se getTilgangMockData. */
const getTillattEndringsperiode = () => {
    const now = dayjs(getPlaywrightAppSettings().NOW);
    return {
        fom: now.startOf('month').subtract(3, 'months').format('YYYY-MM-DD'),
        tom: now.add(12, 'months').endOf('month').format('YYYY-MM-DD'),
    };
};

export const setupScenarioMockRoutes = async (page: Page, scenario: ScenarioType) => {
    const mockData = getScenarioMockData(scenario);
    await page.route('**/oppslag/soker', async (route) => {
        await route.fulfill({ status: 200, body: JSON.stringify(mockData.søker) });
    });
    await page.route('**/oppslag/arbeidsgiver**', async (route) => {
        await route.fulfill({ status: 200, body: JSON.stringify(mockData.arbeidsgiver) });
    });
    await page.route('**/innsyn/sak', async (route) => {
        await route.fulfill({ status: 200, body: JSON.stringify(mockData.sak) });
    });
    await page.route('**/psb/endringsmelding/tilgang', async (route) => {
        await route.fulfill({
            status: 200,
            body: JSON.stringify(getTilgangMockData(scenario, getTillattEndringsperiode())),
        });
    });
};

export const setupMockRoutes = async (page: Page, scenario: ScenarioType, props?: { mellomlagring: any }) => {
    await page.route('**hotjar**', async (route) => {
        await route.fulfill({ status: 200 });
    });
    await page.route('https://login.nav.no/**', async (route) => {
        await route.fulfill({ status: 200 });
    });
    await page.route('https://telemetry.nav.no/collect', async (route) => {
        await route.fulfill({ status: 200 });
    });
    await page.route('**collect**', async (route) => {
        await route.fulfill({ status: 200 });
    });
    await page.route('https://www.nav.no/person/nav-dekoratoren-api/auth', async (route) => {
        await route.fulfill({ status: 200 });
    });
    await page.route('https://www.nav.no/person/nav-dekoratoren-api/auth', async (route) => {
        await route.fulfill({ status: 200 });
    });
    await page.route('**/mellomlagring/ENDRINGSMELDING_PLEIEPENGER_SYKT_BARN', async (route, request) => {
        if (request.method() === 'GET') {
            await route.fulfill({ status: 200, body: JSON.stringify(props?.mellomlagring || {}) });
            return;
        }
        await route.fulfill({ status: 200, body: '{}' });
    });
    await page.route('**/endringsmelding/innsending', async (route, request) => {
        if (request.method() === 'POST') {
            await route.fulfill({ status: 200 });
            return;
        }
        await route.fulfill({ status: 200, body: '{}' });
    });
    await setupScenarioMockRoutes(page, scenario);
};
