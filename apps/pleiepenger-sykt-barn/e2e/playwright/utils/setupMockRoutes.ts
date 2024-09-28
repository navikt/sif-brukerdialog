import { Page } from '@playwright/test';
import { e2eMockData } from '../../mock-data/';
import { StepID } from '../../../src/app/types/StepID';

export const setupMockRoutes = async (page: Page, props?: { mellomlagring: any; lastStep?: StepID }) => {
    await page.route('**hotjar**', async (route) => {
        await route.fulfill({ status: 200 });
    });
    await page.route('https://login.nav.no/**', async (route) => {
        await route.fulfill({ status: 200 });
    });
    await page.route('https://amplitude.nav.no/collect-auto', async (route) => {
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
    await page.route('**/mellomlagring/PLEIEPENGER_SYKT_BARN**', async (route, request) => {
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
        await route.fulfill({ status: 200, body: JSON.stringify(e2eMockData.søker) });
    });
    await page.route('**/oppslag/barn', async (route) => {
        await route.fulfill({ status: 200, body: JSON.stringify(e2eMockData.barn) });
    });
    await page.route('**/oppslag/arbeidsgiver*', async (route) => {
        await route.fulfill({ status: 200, body: JSON.stringify(e2eMockData.arbeidsgiver) });
    });
    await page.route('**/vedlegg', async (route) => {
        await route.fulfill({
            status: 200,
            headers: { Location: '/vedlegg/123', 'access-control-expose-headers': 'Location' },
        });
    });

    await page.route('**/pleiepenger-sykt-barn/innsending', async (route, request) => {
        if (request.method() === 'POST') {
            await route.fulfill({ status: 200 });
            return;
        }
        await route.fulfill({ status: 200, body: '{}' });
    });
};
