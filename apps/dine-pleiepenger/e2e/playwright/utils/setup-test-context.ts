import { Page } from '@playwright/test';

/**
 * Setter consent-cookie for å unngå at samtykke-banner vises
 */
export const setConsentCookie = async (page: Page) => {
    await page.context().addCookies([
        {
            name: 'navno-consent',
            value: '%7B%22consent%22%3A%7B%22analytics%22%3Atrue%2C%22surveys%22%3Atrue%7D%2C%22userActionTaken%22%3Atrue%2C%22meta%22%3A%7B%22createdAt%22%3A%222025-11-03T06%3A20%3A01.929Z%22%2C%22updatedAt%22%3A%222025-11-03T06%3A20%3A01.929Z%22%2C%22version%22%3A3%7D%7D',
            domain: 'localhost',
            path: '/',
        },
    ]);
};
