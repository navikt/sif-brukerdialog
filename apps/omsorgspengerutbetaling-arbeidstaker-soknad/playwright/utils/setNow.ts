import { Page } from '@playwright/test';

// Eksplisitt UTC for å unngå tvetydig tolkning på tvers av tidssoner.
export const testDate = new Date('2024-08-01T12:00:00Z');

export const setNow = async (page: Page, date: Date = testDate) => {
    await page.clock.setFixedTime(date);
    const browserTz = await page.evaluate(() => Intl.DateTimeFormat().resolvedOptions().timeZone);
    console.log(`[setNow] Nettlesertidssone: ${browserTz}`);
};
