import { ISODate, Weekday } from '../types';
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
            expect(getWeekdayFromDate('2022-01-03' as ISODate)).toEqual(Weekday.monday);
            expect(getWeekdayFromDate('2022-01-04' as ISODate)).toEqual(Weekday.tuesday);
            expect(getWeekdayFromDate('2022-01-05' as ISODate)).toEqual(Weekday.wednesday);
            expect(getWeekdayFromDate('2022-01-06' as ISODate)).toEqual(Weekday.thursday);
            expect(getWeekdayFromDate('2022-01-07' as ISODate)).toEqual(Weekday.friday);
        });
        it('returns undefined for saturday and sunday', () => {
            expect(getWeekdayFromDate('2022-01-08' as ISODate)).toBeUndefined();
            expect(getWeekdayFromDate('2022-01-09' as ISODate)).toBeUndefined();
        });
    });

    describe('isDateInWeekdays', () => {
        const weedays: Weekday[] = [Weekday.monday, Weekday.wednesday];
        it('returns true if date is in weedays', () => {
            expect(isDateInWeekdays('2022-01-03' as ISODate, weedays)).toBeTruthy();
            expect(isDateInWeekdays('2022-01-05' as ISODate, weedays)).toBeTruthy();
        });
        it('returns false if date is NOT in weedays', () => {
            expect(isDateInWeekdays('2022-01-04' as ISODate, weedays)).toBeFalsy();
        });
        it('returns false if weekdays is empty', () => {
            expect(isDateInWeekdays('2022-01-04' as ISODate, [])).toBeFalsy();
        });
        it('returns false if weekdays is undefined', () => {
            expect(isDateInWeekdays('2022-01-04' as ISODate, undefined)).toBeFalsy();
        });
    });
});
