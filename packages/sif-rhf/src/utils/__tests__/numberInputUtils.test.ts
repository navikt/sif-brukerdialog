import { describe, expect, it } from 'vitest';

import { getNumberFromNumberInputValue, getNumberInputFormatter } from '../numberInputUtils';

describe('getNumberFromNumberInputValue', () => {
    it('returns undefined for empty/undefined', () => {
        expect(getNumberFromNumberInputValue(undefined)).toBeUndefined();
        expect(getNumberFromNumberInputValue('')).toBeUndefined();
    });

    it('parses simple integers', () => {
        expect(getNumberFromNumberInputValue('42')).toBe(42);
        expect(getNumberFromNumberInputValue(' 7 ')).toBe(7);
    });

    it('parses comma-separated decimals', () => {
        expect(getNumberFromNumberInputValue('3,14')).toBe(3.14);
    });

    it('parses dot-separated decimals', () => {
        expect(getNumberFromNumberInputValue('3.14')).toBe(3.14);
    });

    it('rejects mixed separators', () => {
        expect(getNumberFromNumberInputValue('1.234,56')).toBeUndefined();
    });

    it('rejects scientific notation', () => {
        expect(getNumberFromNumberInputValue('1e5')).toBeUndefined();
    });

    it('rejects decimals when integerValue is true', () => {
        expect(getNumberFromNumberInputValue('3,14', true)).toBeUndefined();
        expect(getNumberFromNumberInputValue('3.14', true)).toBeUndefined();
    });

    it('handles thousand-separated values', () => {
        expect(getNumberFromNumberInputValue('1 234')).toBe(1234);
    });

    it('rejects invalid thousand separators', () => {
        expect(getNumberFromNumberInputValue('1234 56')).toBeUndefined();
        expect(getNumberFromNumberInputValue('12 34')).toBeUndefined();
    });

    it('returns undefined for non-numeric', () => {
        expect(getNumberFromNumberInputValue('abc')).toBeUndefined();
    });
});

describe('getNumberInputFormatter', () => {
    const formatter = getNumberInputFormatter(false);

    it('formats number with comma on apply', () => {
        expect(formatter.applyFormatting('3.14')).toBe('3,14');
    });

    it('clears formatting to comma string', () => {
        expect(formatter.clearFormatting('3,14')).toBe('3,14');
    });

    it('returns original value for non-numeric', () => {
        expect(formatter.applyFormatting('abc')).toBe('abc');
        expect(formatter.clearFormatting('abc')).toBe('abc');
    });

    it('integer formatter rejects decimals on apply', () => {
        const intFormatter = getNumberInputFormatter(true);
        expect(intFormatter.applyFormatting('3,5')).toBe('3,5');
    });
});
