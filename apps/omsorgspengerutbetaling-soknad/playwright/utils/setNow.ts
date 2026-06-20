import { Page } from '@playwright/test';
import MockDate from 'mockdate';

export const testDate = new Date('2024-08-01T12:00:00');

export const setNow = async (page: Page, date: Date = testDate) => {
    await page.addInitScript((timestamp: number) => {
        MockDate.set(new Date(timestamp));
    }, date.valueOf());
};
