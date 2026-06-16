import { Page } from '@playwright/test';

// Ankerdato for alle mock-scenarioer — må matche demoMockDate i mock/mockConstants.ts
// Bruk native Date her for å unngå import-kjede via sif-common-utils/dayjs som feiler i Node
const DEMO_MOCK_DATE = new Date('2025-12-10');

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

export const setNow = async (page: Page, date: Date = DEMO_MOCK_DATE) => {
    await page.addInitScript(getSetDateScript(date.valueOf()));
};
