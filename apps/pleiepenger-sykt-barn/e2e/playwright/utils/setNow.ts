import MockDate from 'mockdate';

import { Page } from '@playwright/test';

const testDate = new Date('2023-01-01');

export const setNow = async (page: Page, date: Date = testDate) => {
    await page.addInitScript(() => {
        MockDate.set(date || testDate);
    });
};
