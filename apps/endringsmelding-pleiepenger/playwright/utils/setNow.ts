import { Page } from '@playwright/test';
import MockDate from 'mockdate';

const testDate = new Date('2023-02-15');

export const setNow = async (page: Page, date: Date = testDate) => {
    await page.addInitScript(() => {
        MockDate.set(date || testDate);
    });
};
