import { dateUtils } from '@navikt/sif-common-utils';
import { describe, expect, it } from 'vitest';

import { datePickerUtils } from '../datePickerUtils';

const { parseDatePickerValue, getDisabledDates } = datePickerUtils;

describe('dateUtils.isISODateString', () => {
    it('accepts valid ISO date', () => {
        expect(dateUtils.isISODateString('2024-01-15')).toBe(true);
    });
    it('rejects non-string', () => {
        expect(dateUtils.isISODateString(123)).toBe(false);
        expect(dateUtils.isISODateString(undefined)).toBe(false);
    });
    it('rejects wrong format', () => {
        expect(dateUtils.isISODateString('15.01.2024')).toBe(false);
        expect(dateUtils.isISODateString('2024-1-5')).toBe(false);
    });
});

describe('dateUtils.dateToISODate', () => {
    it('converts UTC date', () => {
        expect(dateUtils.dateToISODate(new Date('2024-03-15T00:00:00Z'))).toBe('2024-03-15');
    });
});

describe('parseDatePickerValue', () => {
    it('converts valid ISO string to Date', () => {
        const date = parseDatePickerValue('2024-03-15');
        expect(date).toBeInstanceOf(Date);
        expect(date!.toISOString()).toBe('2024-03-15T00:00:00.000Z');
    });
    it('returns undefined for missing/short input', () => {
        expect(parseDatePickerValue(undefined)).toBeUndefined();
        expect(parseDatePickerValue('2024-03')).toBeUndefined();
    });
    it('returns undefined for invalid date', () => {
        expect(parseDatePickerValue('not-a-date')).toBeUndefined();
    });

    it.each([
        ['15.03.2024', '2024-03-15'],
        ['15032024', '2024-03-15'],
        ['15/03/2024', '2024-03-15'],
        ['15-03-2024', '2024-03-15'],
        ['5.3.2024', '2024-03-05'],
        ['15.03.24', '2024-03-15'],
    ])('parses "%s" to "%s"', (input, expected) => {
        expect(dateUtils.dateToISODate(parseDatePickerValue(input)!)).toBe(expected);
    });

    it('returns undefined for garbage', () => {
        expect(parseDatePickerValue('abc')).toBeUndefined();
    });
});

describe('getDisabledDates', () => {
    it('returns empty array when no constraints', () => {
        expect(getDisabledDates({})).toEqual([]);
    });

    it('adds before/after matchers for min/max', () => {
        const min = new Date('2024-01-01');
        const max = new Date('2024-12-31');
        const result = getDisabledDates({ minDate: min, maxDate: max });
        expect(result).toEqual([{ before: min }, { after: max }]);
    });

    it('adds weekend matcher', () => {
        const result = getDisabledDates({ disableWeekends: true });
        expect(result).toEqual([{ dayOfWeek: [0, 6] }]);
    });

    it('adds explicit disabled weekdays from legacy object shape', () => {
        const result = getDisabledDates({ disabledDaysOfWeek: { dayOfWeek: [1, 3] } });
        expect(result).toEqual([{ dayOfWeek: [1, 3] }]);
    });

    it('adds date range matchers', () => {
        const range = { from: new Date('2024-06-01'), to: new Date('2024-06-15') };
        const result = getDisabledDates({ disabledDateRanges: [range] });
        expect(result).toEqual([range]);
    });
});
