import { Page } from '@playwright/test';
import MockDate from 'mockdate';

import { MOCK_DATE } from '../../mock/utils/mockDate';

const testDate = new Date(MOCK_DATE);

export const setNow = async (page: Page, date: Date = testDate) => {
    await page.addInitScript((dateString: string) => {
        MockDate.set(new Date(dateString));
    }, date.toISOString());
};
