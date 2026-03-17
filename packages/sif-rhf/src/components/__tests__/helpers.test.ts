import { FieldErrors } from 'react-hook-form';
import { describe, expect, it } from 'vitest';

import { toArray } from '../SifCheckboxGroup';
import { maxDate,minDate } from '../SifDateRangePicker';
import { flattenErrors } from '../SifValidationSummary';

describe('toArray', () => {
    it('returns empty array for undefined/null', () => {
        expect(toArray(undefined)).toEqual([]);
        expect(toArray(null)).toEqual([]);
    });
    it('wraps string in array', () => {
        expect(toArray('a')).toEqual(['a']);
    });
    it('returns array as-is', () => {
        expect(toArray(['a', 'b'])).toEqual(['a', 'b']);
    });
    it('returns empty array for other types', () => {
        expect(toArray(123)).toEqual([]);
    });
});

describe('minDate', () => {
    const jan = new Date('2024-01-01');
    const feb = new Date('2024-02-01');

    it('returns the earlier date', () => {
        expect(minDate(jan, feb)).toBe(jan);
        expect(minDate(feb, jan)).toBe(jan);
    });
    it('returns the other when one is undefined', () => {
        expect(minDate(undefined, feb)).toBe(feb);
        expect(minDate(jan, undefined)).toBe(jan);
    });
    it('returns undefined when both undefined', () => {
        expect(minDate(undefined, undefined)).toBeUndefined();
    });
});

describe('maxDate', () => {
    const jan = new Date('2024-01-01');
    const feb = new Date('2024-02-01');

    it('returns the later date', () => {
        expect(maxDate(jan, feb)).toBe(feb);
        expect(maxDate(feb, jan)).toBe(feb);
    });
    it('returns the other when one is undefined', () => {
        expect(maxDate(undefined, jan)).toBe(jan);
        expect(maxDate(feb, undefined)).toBe(feb);
    });
});

describe('flattenErrors', () => {
    it('flattens simple errors', () => {
        const errors: FieldErrors = {
            name: { type: 'required', message: 'Name is required' },
        };
        expect(flattenErrors(errors)).toEqual([{ fieldName: 'name', message: 'Name is required' }]);
    });

    it('flattens nested errors', () => {
        const errors: FieldErrors = {
            address: {
                street: { type: 'required', message: 'Street required' },
            } as any,
        };
        expect(flattenErrors(errors)).toEqual([{ fieldName: 'address.street', message: 'Street required' }]);
    });

    it('returns empty array for no errors', () => {
        expect(flattenErrors({})).toEqual([]);
    });
});
