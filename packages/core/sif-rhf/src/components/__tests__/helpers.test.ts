import { FieldErrors } from 'react-hook-form';
import { describe, expect, it } from 'vitest';

import { toArray } from '../SifCheckboxGroup';
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
