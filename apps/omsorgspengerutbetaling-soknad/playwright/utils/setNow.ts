import { Page } from '@playwright/test';
import MockDate from 'mockdate';

export const testDate = new Date('2024-08-01');

export const setNow = async (page: Page, date: Date = testDate) => {
    await page.addInitScript(() => {
        MockDate.set(date || testDate);
    });
};
