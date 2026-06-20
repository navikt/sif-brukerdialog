import { Page } from '@playwright/test';

import { getMockToday } from '../../mock/utils/mockDate';

const testDate = new Date(getMockToday());

export const setNow = async (page: Page, date: Date = testDate) => {
    await page.clock.setFixedTime(date);
};
