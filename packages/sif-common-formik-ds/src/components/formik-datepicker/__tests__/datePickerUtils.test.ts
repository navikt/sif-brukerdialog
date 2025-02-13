import { describe } from 'vitest';
import { datepickerUtils } from '../datepickerUtils';

describe('datePickerUtils', () => {
    describe('getDateFromDateString', () => {
        it('returns undefined when dateString has invalid format', () => {
            expect(datepickerUtils.getDateFromDateString('2020-xx-23')).toBeUndefined();
            expect(datepickerUtils.getDateFromDateString('2020-22-23')).toBeUndefined();
        });
    });
});
