import AxeBuilder from '@axe-core/playwright';
import { expect, Page } from '@playwright/test';

export const testAccessibility = async (page: Page) => {
    const accessibilityScanResults = await new AxeBuilder({ page })
        .include('#__next')
        .disableRules('color-contrast')
        .analyze();
    await expect(accessibilityScanResults.violations).toEqual([]);
};
