import MockDate from 'mockdate';

import { Page } from '@playwright/test';

export const testDate = new Date('2024-08-01');

export const setNow = async (page: Page, date: Date = testDate) => {
    await page.addInitScript(() => {
        MockDate.set(date || testDate);
    });
};
