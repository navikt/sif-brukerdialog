import { Page } from '@playwright/test';

export const selectRadioByNameAndValue = async (page: Page, name: string, value: string | number) => {
    await page.locator(`input[name="${name}"][value="${value}"]`).check();
};
