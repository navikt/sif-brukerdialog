import { Page } from '@playwright/test';

// import { søknaderMockData } from '../mockdata/søknader.mock';
import { setConsentCookie } from './setup-test-context';

export const setupMockRoutes = async (page: Page) => {
    // Sett consent-cookie for å unngå samtykke-banner
    await setConsentCookie(page);

    await page.route('*', async (route: any) => {
        await route.fulfill({ status: 200 });
    });
};
