import { BrowserContext, Page } from '@playwright/test';

import { memoryStore } from '../../mock/state/memoryStore';

const setupNavnoConsentCookieForPlaywrightTests = async (context: BrowserContext) => {
    return await context.addCookies([
        {
            name: 'navno-consent',

            value: '{%22consent%22:{%22analytics%22:false%2C%22surveys%22:false}%2C%22userActionTaken%22:true%2C%22meta%22:{%22createdAt%22:%222025-01-28T15:46:10.985Z%22%2C%22updatedAt%22:%222025-01-29T07:07:24.760Z%22%2C%22version%22:1}}',
            domain: 'localhost',
            path: '/',
            expires: -1, // Session cookie
            httpOnly: false,
            secure: false,
            sameSite: 'Lax',
        },
    ]);
};

export async function registerMockRoutes(page: Page, context: BrowserContext) {
    await setupNavnoConsentCookieForPlaywrightTests(context);

    await page.route('**/deltaker/hent-kontonummer', async (route) => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({ harKontonummer: true, kontonummer: '12345678901' }),
        });
    });

    await page.route('**/oppslag/soker', async (route) => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(memoryStore.get().søker),
        });
    });

    await page.route('**/oppslag/barn', async (route) => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(memoryStore.get().barn),
        });
    });

    await page.route('**/oppslag/arbeidsgiver', async (route) => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(memoryStore.get().arbeidsgiver),
        });
    });

    await page.route('**/aktivitetspenger/soknad/innsending', async (route) => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({}),
        });
    });
}
