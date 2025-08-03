import { BrowserContext, Page } from '@playwright/test';
import { StepId } from '../../src/app/types/StepId';
import { mockData } from '../../mock/data';

export const setupMockRoutes = async (
    page: Page,
    context: BrowserContext,
    props?: { mellomlagring: any; lastStep?: StepId },
) => {
    await page.route('**/oppslag/barn**', async (route) => {
        await route.fulfill({ status: 200, body: JSON.stringify(mockData.barn) });
    });

    await page.route('**/oppslag/soker', async (route) => {
        await route.fulfill({ status: 200, body: JSON.stringify(mockData.søker) });
    });
    await page.route('**/oppslag/arbeidsgiver**', async (route) => {
        await route.fulfill({ status: 200, body: JSON.stringify(mockData.arbeidsgiver) });
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
    await page.route('**/k9sak/opplaringsinstitusjoner', async (route) => {
        await route.fulfill({ status: 200, body: JSON.stringify(mockData.institusjoner) });
    });
    await page.route('**/innsending', async (route) => {
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
    await page.route('*', async (route) => {
        console.log(route);
        await route.fulfill({ status: 200 });
    });
};
