import AxeBuilder from '@axe-core/playwright';

export const testAccessibility = async (page) => {
    const accessibilityScanResults = await new AxeBuilder({ page }).disableRules('color-contrast').analyze();
    await expect(accessibilityScanResults.violations).toEqual([]);
};
