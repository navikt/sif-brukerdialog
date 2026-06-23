import { Page } from '@playwright/test';

// Eksplisitt UTC for å unngå tvetydig tolkning på tvers av tidssoner.
// 12:00 UTC = 13:00 Oslo / 04:00 San Francisco — fortsatt 15. feb begge steder.
const testDate = new Date('2023-02-15T12:00:00Z');

export const setNow = async (page: Page, date: Date = testDate) => {
    await page.clock.setFixedTime(date);

    const browserTz = await page.evaluate(() => Intl.DateTimeFormat().resolvedOptions().timeZone);
    // eslint-disable-next-line no-console
    console.log(`[setNow] Nettlesertidssone: ${browserTz}`);
    // eslint-disable-next-line no-console
    console.log(`[setNow] Dato satt til: ${date.toISOString()}`);
};
