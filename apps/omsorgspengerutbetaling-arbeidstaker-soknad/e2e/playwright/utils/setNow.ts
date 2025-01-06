import MockDate from 'mockdate';

import { Page } from '@playwright/test';

export const testDate = new Date('2024-08-01');

export const setNow = async (page: Page, date: Date = testDate) => {
    console.log('---------', MockDate);
    await page.addInitScript(() => {
        MockDate.set(date || testDate);
        console.log(`Setting now to: ${testDate}. new Date: ${new Date()}`);
    });
};
