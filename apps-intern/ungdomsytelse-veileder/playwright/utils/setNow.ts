import { Page } from '@playwright/test';

// Eksplisitt UTC for å unngå tvetydig tolkning på tvers av tidssoner.
// Ankerdato for alle mock-scenarioer — må matche demoMockDate i mock/mockConstants.ts
const DEMO_MOCK_DATE = new Date('2025-12-10T12:00:00Z');

export const setNow = async (page: Page, date: Date = DEMO_MOCK_DATE) => {
    await page.clock.setFixedTime(date);
    const browserTz = await page.evaluate(() => Intl.DateTimeFormat().resolvedOptions().timeZone);
    console.log(`[setNow] Nettlesertidssone: ${browserTz}`);
};
