import { startOfISOWeek, addWeeks, subWeeks, format } from 'date-fns';
import AxeBuilder from '@axe-core/playwright'; // 1
import { Page, expect } from '@playwright/test';

const INPUT_DATE_FORMAT = 'dd.MM.yyyy';
export const formatInputDate = (date: Date): string => format(date, INPUT_DATE_FORMAT);

export const getSøknadsdato = () => new Date('2023-10-04');

export const getSøknadsperiode = () => ({
    from: subWeeks(startOfISOWeek(getSøknadsdato()), 3),
    to: addWeeks(startOfISOWeek(getSøknadsdato()), 1),
});

export const checkA11y = async (page: Page) => {
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    await expect(accessibilityScanResults.violations).toEqual([]);
};
