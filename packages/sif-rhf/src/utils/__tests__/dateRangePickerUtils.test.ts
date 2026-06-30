import { describe, expect, it } from 'vitest';
import { getDateRangeMaxDate, getDateRangeMinDate } from '../dateRangePickerUtils';
import { ISODate } from '@sif/utils';

describe('getDateRangeMaxDate', () => {
    it('returns undefined when both arguments are undefined', () => {
        expect(getDateRangeMaxDate(undefined, undefined)).toBeUndefined();
    });

    it('returns toDate as ISODate when no fromInputPropsMaxDate is given', () => {
        expect(getDateRangeMaxDate(undefined, '2024-06-15' as ISODate)).toBe('2024-06-15');
    });

    it('returns fromInputPropsMaxDate when no toDate is given', () => {
        expect(getDateRangeMaxDate('2024-12-31' as ISODate, undefined)).toBe('2024-12-31');
    });

    it('returns toDate when it is earlier than fromInputPropsMaxDate', () => {
        // toDate (2024-06-01) < maxDate (2024-12-31) → toDate wins
        expect(getDateRangeMaxDate('2024-12-31' as ISODate, '2024-06-01' as ISODate)).toBe('2024-06-01');
    });

    it('returns fromInputPropsMaxDate when it is earlier than toDate', () => {
        // maxDate (2024-03-01) < toDate (2024-06-01) → maxDate wins
        expect(getDateRangeMaxDate('2024-03-01' as ISODate, '2024-06-01' as ISODate)).toBe('2024-03-01');
    });

    it('returns the same value when both are equal', () => {
        expect(getDateRangeMaxDate('2024-06-15' as ISODate, '2024-06-15' as ISODate)).toBe('2024-06-15');
    });
});

describe('getDateRangeMinDate', () => {
    it('returns undefined when both arguments are undefined', () => {
        expect(getDateRangeMinDate(undefined, undefined)).toBeUndefined();
    });

    it('returns fromDate as ISODate when no toInputPropsMinDate is given', () => {
        expect(getDateRangeMinDate(undefined, '2024-03-01' as ISODate)).toBe('2024-03-01');
    });

    it('returns toInputPropsMinDate when no fromDate is given', () => {
        expect(getDateRangeMinDate('2024-01-01' as ISODate, undefined)).toBe('2024-01-01');
    });

    it('returns fromDate when it is later than toInputPropsMinDate', () => {
        // fromDate (2024-06-01) > minDate (2024-01-01) → fromDate wins
        expect(getDateRangeMinDate('2024-01-01' as ISODate, '2024-06-01' as ISODate)).toBe('2024-06-01');
    });

    it('returns toInputPropsMinDate when it is later than fromDate', () => {
        // minDate (2024-09-01) > fromDate (2024-06-01) → minDate wins
        expect(getDateRangeMinDate('2024-09-01' as ISODate, '2024-06-01' as ISODate)).toBe('2024-09-01');
    });

    it('returns the same value when both are equal', () => {
        expect(getDateRangeMinDate('2024-06-15' as ISODate, '2024-06-15' as ISODate)).toBe('2024-06-15');
    });
});
