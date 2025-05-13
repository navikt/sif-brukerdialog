import { BrowserContext, Page } from '@playwright/test';

export const setupNavnoConsentCookieForPlaywrightTests = async (context: BrowserContext) => {
    return await context.addCookies([
        {
            name: 'navno-consent',
            // eslint-disable-next-line max-len
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

export const setupMockRoutes = async (page: Page, context: BrowserContext) => {
    await setupNavnoConsentCookieForPlaywrightTests(context);

    await page.route('**hotjar**', async (route) => {
        await route.fulfill({ status: 200 });
    });
    await page.route('https://login.nav.no/**', async (route) => {
        await route.fulfill({ status: 200 });
    });
    await page.route('https://www.nav.no/person/nav-dekoratoren-api/auth', async (route) => {
        await route.fulfill({ status: 200 });
    });
};
