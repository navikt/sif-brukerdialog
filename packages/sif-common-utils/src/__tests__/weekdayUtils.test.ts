import { ISODateToDate } from '../dateUtils';
import { Weekday } from '../types';
import { getWeekdayDOW, getWeekdayFromDate, isDateInWeekdays } from '../weekdayUtils';

describe('weekdayUtils', () => {
    describe('getWeekdayDOW', () => {
        it('returns correkt DOW', () => {
            expect(getWeekdayDOW(Weekday.monday)).toEqual(1);
            expect(getWeekdayDOW(Weekday.tuesday)).toEqual(2);
            expect(getWeekdayDOW(Weekday.wednesday)).toEqual(3);
            expect(getWeekdayDOW(Weekday.thursday)).toEqual(4);
            expect(getWeekdayDOW(Weekday.friday)).toEqual(5);
        });
    });
    describe('getWeekdayFromDate', () => {
        it('returns correct weekday for monday to friday', () => {
            expect(getWeekdayFromDate(ISODateToDate('2022-01-03'))).toEqual(Weekday.monday);
            expect(getWeekdayFromDate(ISODateToDate('2022-01-04'))).toEqual(Weekday.tuesday);
            expect(getWeekdayFromDate(ISODateToDate('2022-01-05'))).toEqual(Weekday.wednesday);
            expect(getWeekdayFromDate(ISODateToDate('2022-01-06'))).toEqual(Weekday.thursday);
            expect(getWeekdayFromDate(ISODateToDate('2022-01-07'))).toEqual(Weekday.friday);
        });
        it('returns undefined for saturday and sunday', () => {
            expect(getWeekdayFromDate(ISODateToDate('2022-01-08'))).toBeUndefined();
            expect(getWeekdayFromDate(ISODateToDate('2022-01-09'))).toBeUndefined();
        });
    });

    describe('isDateInWeekdays', () => {
        const weedays: Weekday[] = [Weekday.monday, Weekday.wednesday];
        it('returns true if date is in weedays', () => {
            expect(isDateInWeekdays(ISODateToDate('2022-01-03'), weedays)).toBeTruthy();
            expect(isDateInWeekdays(ISODateToDate('2022-01-05'), weedays)).toBeTruthy();
        });
        it('returns false if date is NOT in weedays', () => {
            expect(isDateInWeekdays(ISODateToDate('2022-01-04'), weedays)).toBeFalsy();
        });
        it('returns false if weekdays is empty', () => {
            expect(isDateInWeekdays(ISODateToDate('2022-01-04'), [])).toBeFalsy();
        });
        it('returns false if weekdays is undefined', () => {
            expect(isDateInWeekdays(ISODateToDate('2022-01-04'), undefined)).toBeFalsy();
        });
    });
});
