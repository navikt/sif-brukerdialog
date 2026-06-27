import { describe, expect, it } from 'vitest';

import { datePickerUtils } from '../datePickerUtils';
import { dateToISODate, ISODate, ISODateToDate } from '@sif/utils';

const { parseDatePickerValue, getDisabledDates } = datePickerUtils;

describe('dateUtils.dateToISODate', () => {
    it('converts UTC date', () => {
        expect(dateToISODate(new Date('2024-03-15T00:00:00Z'))).toBe('2024-03-15');
    });
});

describe('parseDatePickerValue', () => {
    it('converts valid ISO string to Date', () => {
        const date = parseDatePickerValue('2024-03-15');
        expect(date).toBeInstanceOf(Date);
        expect(date).toBeInstanceOf(Date);
        expect(date!.getFullYear()).toBe(2024);
        expect(date!.getMonth()).toBe(2);
        expect(date!.getDate()).toBe(15);
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
        expect(dateToISODate(parseDatePickerValue(input)!)).toBe(expected);
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
        const min = '2024-01-01' as ISODate;
        const max = '2024-12-31' as ISODate;
        const result = getDisabledDates({ minDate: min, maxDate: max });
        expect(result).toEqual([{ before: ISODateToDate(min) }, { after: ISODateToDate(max) }]);
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
        const range = { from: '2024-06-01' as ISODate, to: '2024-06-15' as ISODate };
        const result = getDisabledDates({ disabledDateRanges: [range] });
        expect(result).toEqual([{ from: ISODateToDate(range.from), to: ISODateToDate(range.to) }]);
    });
});
