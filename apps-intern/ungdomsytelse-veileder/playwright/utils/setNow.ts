import { Page } from '@playwright/test';

// Ankerdato for alle mock-scenarioer — må matche demoMockDate i mock/mockConstants.ts
const DEMO_MOCK_DATE = new Date('2025-12-10T12:00:00');

export const setNow = async (page: Page, date: Date = DEMO_MOCK_DATE) => {
    await page.clock.setFixedTime(date);
};
