import { Page } from '@playwright/test';

const testDate = new Date('2024-12-04');

const getSetDateScript = (timestamp: number) => `
{
    // Extend Date constructor to default to fakeNow
    Date = class extends Date {
      constructor(...args) {
        if (args.length === 0) {
          super(${timestamp});
        } else {
          super(...args);
        }
      }
    }
    // Override Date.now() to start from fakeNow
    const __DateNowOffset = ${timestamp} - Date.now();
    const __DateNow = Date.now;
    Date.now = () => __DateNow() + __DateNowOffset;
  }
`;

export const setNow = async (page: Page, date: Date = testDate) => {
    await page.addInitScript(getSetDateScript(date.valueOf()));
};
