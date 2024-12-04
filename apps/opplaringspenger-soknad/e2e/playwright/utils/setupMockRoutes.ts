import { Page } from '@playwright/test';
import { StepId } from '../../../src/app/types/StepId';
import { playwrightApiMockData } from '../mock-data/playwrightApiMockData';

export const setupMockRoutes = async (page: Page, props?: { mellomlagring: any; lastStep?: StepId }) => {
    await page.route('**hotjar**', async (route) => {
        await route.fulfill({ status: 200 });
    });
    await page.route('https://login.nav.no/**', async (route) => {
        await route.fulfill({ status: 200 });
    });
    await page.route('https://login.ekstern.dev.nav.no/**', async (route) => {
        await route.fulfill({ status: 200 });
    });
    await page.route('https://www.nav.no/person/nav-dekoratoren-api/auth', async (route) => {
        await route.fulfill({ status: 200 });
    });
    await page.route('**/mellomlagring/OPPLARINGSPENGER', async (route, request) => {
        let body: any = {};

        if (request.method() === 'GET') {
            body = props?.mellomlagring || {};
            if (props?.lastStep) {
                body.metadata = {
                    ...body.metadata,
                    lastStepID: props.lastStep,
                };
            }
            await route.fulfill({ status: 200, body: JSON.stringify(body) });
            return;
        }

        await route.fulfill({ status: 200 });
    });
    await page.route('**/oppslag/soker', async (route) => {
        await route.fulfill({ status: 200, body: JSON.stringify(playwrightApiMockData.søkerMock) });
    });
    await page.route('**/oppslag/arbeidsgiver**', async (route) => {
        await route.fulfill({ status: 200, body: JSON.stringify(playwrightApiMockData.arbeidsgiverMock) });
    });
    await page.route('**/vedlegg/*', async (route) => {
        await route.fulfill({
            status: 200,
            headers: { Location: '/vedlegg', 'access-control-expose-headers': 'Location' },
        });
    });
    await page.route('**/innsending', async (route) => {
        await route.fulfill({ status: 200 });
    });
};
