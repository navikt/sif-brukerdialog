import { getDateRangeValidator, ValidateDateRangeError } from '../getDateRangeValidator';
import { ValidateDateError } from '../getDateValidator';

describe('dateRangeValidation', () => {
    describe('validateFromDate', () => {
        it('returns undefined if date is undefined', () => {
            expect(getDateRangeValidator({}).validateFromDate(undefined)).toBeUndefined();
        });
        it('returns undefined if toDate is undefined', () => {
            expect(getDateRangeValidator({}).validateFromDate('2020-10-10')).toBeUndefined();
        });
        it(`returns ${ValidateDateRangeError.fromDateIsAfterToDate} if fromDate is after toDate`, () => {
            expect(getDateRangeValidator({ toDate: new Date(2020, 9, 9) }).validateFromDate('2020-10-10')).toBe(
                ValidateDateRangeError.fromDateIsAfterToDate,
            );
        });
        it(`returns ${ValidateDateError.dateHasNoValue} if required and date is is undefined`, () => {
            expect(getDateRangeValidator({ required: true }).validateFromDate('')).toBe(
                ValidateDateError.dateHasNoValue,
            );
        });
    });
    describe('validateToDate', () => {
        it('returns undefined if date is undefined', () => {
            expect(getDateRangeValidator({}).validateToDate(undefined)).toBeUndefined();
        });
        it('returns undefined if toDate is undefined', () => {
            expect(getDateRangeValidator({}).validateToDate('2020-10-10')).toBeUndefined();
        });
        it(`returns ${ValidateDateRangeError.toDateIsBeforeFromDate} if toDate is before fromDate`, () => {
            expect(getDateRangeValidator({ fromDate: new Date(2020, 9, 11) }).validateToDate('2020-10-10')).toBe(
                ValidateDateRangeError.toDateIsBeforeFromDate,
            );
        });
        it(`returns ${ValidateDateError.dateHasNoValue} if required and date is is undefined`, () => {
            expect(getDateRangeValidator({ required: true }).validateToDate('')).toBe(ValidateDateError.dateHasNoValue);
        });
    });
});
