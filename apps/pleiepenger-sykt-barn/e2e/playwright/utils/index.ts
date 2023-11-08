import { startOfISOWeek, addWeeks, subWeeks } from 'date-fns';
import AxeBuilder from '@axe-core/playwright'; // 1
import { Page, expect } from '@playwright/test';

export const getSøknadsdato = () => new Date();

export const getSøknadsperiode = () => ({
    from: subWeeks(startOfISOWeek(getSøknadsdato()), 3),
    to: addWeeks(startOfISOWeek(getSøknadsdato()), 1),
});

export const checkA11y = async (page: Page) => {
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    await expect(accessibilityScanResults.violations).toEqual([]);
};
