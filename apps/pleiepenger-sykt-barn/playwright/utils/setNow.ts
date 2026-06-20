import { Page } from '@playwright/test';

const testDate = new Date('2023-01-01T12:00:00');

const getSetDateScript = (timestamp: number) => `
{
    Date = class extends Date {
      constructor(...args) {
        if (args.length === 0) {
          super(${timestamp});
        } else {
          super(...args);
        }
      }
    }
    const __DateNowOffset = ${timestamp} - Date.now();
    const __DateNow = Date.now;
    Date.now = () => __DateNow() + __DateNowOffset;
  }
`;

export const setNow = async (page: Page, date: Date = testDate) => {
    await page.addInitScript(getSetDateScript(date.valueOf()));
};
