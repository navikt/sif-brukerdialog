import getDateRangeValidator, { ValidateDateRangeError } from '../getDateRangeValidator';
import { ValidateDateError } from '../getDateValidator';

describe('dateRangeValidation', () => {
    describe('validateFromDate', () => {
        it('returns undefined if date is undefined', () => {
            expect(getDateRangeValidator({}).validateFromDate(undefined)).toBeUndefined();
        });
        it('returns undefined if toDate is undefined', () => {
            expect(getDateRangeValidator({}).validateFromDate('2020-10-10')).toBeUndefined();
        });
        it(`returns ${ValidateDateRangeError.fromDateIsAfterToDate} if toDate is undefined`, () => {
            expect(getDateRangeValidator({ toDate: new Date('2020-10-09') }).validateFromDate('2020-10-10')).toBe(
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
        it(`returns ${ValidateDateRangeError.fromDateIsAfterToDate} if toDate is undefined`, () => {
            expect(getDateRangeValidator({ fromDate: new Date('2020-10-11') }).validateToDate('2020-10-10')).toBe(
                ValidateDateRangeError.toDateIsBeforeFromDate,
            );
        });
        it(`returns ${ValidateDateError.dateHasNoValue} if required and date is is undefined`, () => {
            expect(getDateRangeValidator({ required: true }).validateToDate('')).toBe(ValidateDateError.dateHasNoValue);
        });
    });
});
