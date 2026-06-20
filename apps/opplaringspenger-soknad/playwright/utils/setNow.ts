import { Page } from '@playwright/test';

const testDate = new Date('2024-12-04T12:00:00');

export const setNow = async (page: Page, date: Date = testDate) => {
    await page.clock.setFixedTime(date);
};
