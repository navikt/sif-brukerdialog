import { Page } from '@playwright/test';
import { mockData } from '../mock-data';
import { StepID } from '../../src/app/types/StepID';

export const setupMockRoutes = async (page: Page, props?: { mellomlagring: any; lastStep?: StepID }) => {
    await page.route('**/oppslag/soker', async (route) => {
        await route.fulfill({ status: 200, body: JSON.stringify(mockData.søker) });
    });
    await page.route('**/oppslag/barn', async (route) => {
        await route.fulfill({ status: 200, body: JSON.stringify(mockData.barn) });
    });
    await page.route('**/oppslag/arbeidsgiver*', async (route) => {
        await route.fulfill({ status: 200, body: JSON.stringify(mockData.arbeidsgiver) });
    });
    await page.route('**/vedlegg', async (route) => {
        await route.fulfill({
            status: 200,
            headers: { Location: '/vedlegg/123', 'access-control-expose-headers': 'Location' },
        });
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
    await page.route('**/pleiepenger-sykt-barn/innsending', async (route, request) => {
        if (request.method() === 'POST') {
            await route.fulfill({ status: 200 });
            return;
        }
        await route.fulfill({ status: 200, body: '{}' });
    });
    await page.route('*', async (route) => {
        console.log(route);
        await route.fulfill({ status: 200 });
    });
};
