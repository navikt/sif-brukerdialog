import { Page } from '@playwright/test';

// Eksplisitt UTC for å unngå tvetydig tolkning på tvers av tidssoner.
const testDate = new Date('2024-12-04T12:00:00Z');

export const setNow = async (page: Page, date: Date = testDate) => {
    await page.clock.setFixedTime(date);
};
