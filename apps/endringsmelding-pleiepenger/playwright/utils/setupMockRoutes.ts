import { scenarioer, ScenarioType } from '@app/dev/scenarioer';
import { Page } from '@playwright/test';

import { getScenarioMockData, getTilgangMockData } from '../../mock/data/scenario';
import { getPlaywrightAppSettings } from '../playwrightAppSettings';

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
        const brukDagensDato = scenarioer.find((s) => s.value === scenario)?.brukDagensDato;
        const now = brukDagensDato ? new Date() : new Date(getPlaywrightAppSettings().NOW);
        await route.fulfill({ status: 200, body: JSON.stringify(getTilgangMockData(scenario, now)) });
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
