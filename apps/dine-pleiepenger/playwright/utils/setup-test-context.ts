import { Page } from '@playwright/test';

/**
 * Setter consent-cookie for å unngå at samtykke-banner vises
 */
export const setConsentCookie = async (page: Page) => {
    await page.context().addCookies([
        {
            name: 'navno-consent',
            value: '{%22consent%22:{%22analytics%22:true%2C%22surveys%22:true}%2C%22userActionTaken%22:true%2C%22meta%22:{%22createdAt%22:%222026-06-29T13:09:24.316Z%22%2C%22updatedAt%22:%222026-06-29T13:09:24.316Z%22%2C%22version%22:5%2C%22analyticsId%22:%22bf67e4ae-fd22-4f33-9b08-35c83e9e174d%22}}',
            domain: 'localhost', // eller ditt domene
            path: '/',
        },
    ]);
};
