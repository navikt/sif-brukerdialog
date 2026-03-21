import { describe, expect, it } from 'vitest';

import {
    dateToISODateString,
    getDisabledDates,
    InputDateStringToISODateString,
    INVALID_DATE,
    isISODateString,
    ISODateStringToUTCDate,
} from '../dateUtils';

describe('isISODateString', () => {
    it('accepts valid ISO date', () => {
        expect(isISODateString('2024-01-15')).toBe(true);
    });
    it('rejects non-string', () => {
        expect(isISODateString(123)).toBe(false);
        expect(isISODateString(undefined)).toBe(false);
    });
    it('rejects wrong format', () => {
        expect(isISODateString('15.01.2024')).toBe(false);
        expect(isISODateString('2024-1-5')).toBe(false);
    });
});

describe('dateToISODateString', () => {
    it('converts UTC date', () => {
        expect(dateToISODateString(new Date('2024-03-15T00:00:00Z'))).toBe('2024-03-15');
    });
    it('returns Invalid date for invalid input', () => {
        expect(dateToISODateString(new Date('not-a-date'))).toBe(INVALID_DATE);
    });
});

describe('ISODateStringToUTCDate', () => {
    it('converts valid ISO string to Date', () => {
        const date = ISODateStringToUTCDate('2024-03-15');
        expect(date).toBeInstanceOf(Date);
        expect(date!.toISOString()).toBe('2024-03-15T00:00:00.000Z');
    });
    it('returns undefined for missing/short input', () => {
        expect(ISODateStringToUTCDate(undefined)).toBeUndefined();
        expect(ISODateStringToUTCDate('2024-03')).toBeUndefined();
    });
    it('returns undefined for invalid date', () => {
        expect(ISODateStringToUTCDate('not-a-date')).toBeUndefined();
    });
});

describe('InputDateStringToISODateString', () => {
    it.each([
        ['15.03.2024', '2024-03-15'],
        ['15032024', '2024-03-15'],
        ['15/03/2024', '2024-03-15'],
        ['15-03-2024', '2024-03-15'],
        ['5.3.2024', '2024-03-05'],
        ['15.03.24', '2024-03-15'],
    ])('parses "%s" to "%s"', (input, expected) => {
        expect(InputDateStringToISODateString(input)).toBe(expected);
    });

    it('returns Invalid date for garbage', () => {
        expect(InputDateStringToISODateString('abc')).toBe(INVALID_DATE);
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

    it('adds date range matchers', () => {
        const range = { from: new Date('2024-06-01'), to: new Date('2024-06-15') };
        const result = getDisabledDates({ disabledDateRanges: [range] });
        expect(result).toEqual([range]);
    });
});
