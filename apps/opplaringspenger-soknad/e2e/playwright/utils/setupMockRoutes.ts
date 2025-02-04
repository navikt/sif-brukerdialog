import { BrowserContext, Page } from '@playwright/test';
import { StepId } from '../../../src/app/types/StepId';
import { barnMock } from '../mock-data/barnMock';
import { playwrightApiMockData } from '../mock-data/playwrightApiMockData';
import { setupNavnoConsentCookieForPlaywrightTests } from '../../../../../packages/sif-common-core-ds/src/utils/navnoConsentCookieUtils';

export const setupMockRoutes = async (
    page: Page,
    context: BrowserContext,
    props?: { mellomlagring: any; lastStep?: StepId },
) => {
    await setupNavnoConsentCookieForPlaywrightTests(context);
    await page.route('**hotjar**', async (route) => {
        await route.fulfill({ status: 200 });
    });
    await page.route('https://login.nav.no/**', async (route) => {
        await route.fulfill({ status: 200 });
    });
    await page.route('https://login.ekstern.dev.nav.no/**', async (route) => {
        await route.fulfill({ status: 200 });
    });
    await page.route('**/oppslag/barn**', async (route) => {
        await route.fulfill({ status: 200, body: JSON.stringify(barnMock) });
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
};
