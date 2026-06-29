import { ISODate, Weekday } from '../types';
import { getWeekdayFromDate, isDateInWeekdays } from '../weekdayUtils';

describe('weekdayUtils', () => {
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
        const weekdays: Weekday[] = [Weekday.monday, Weekday.wednesday];
        it('returns true if date is in weekdays', () => {
            expect(isDateInWeekdays('2022-01-03' as ISODate, weekdays)).toBeTruthy();
            expect(isDateInWeekdays('2022-01-05' as ISODate, weekdays)).toBeTruthy();
        });
        it('returns false if date is NOT in weekdays', () => {
            expect(isDateInWeekdays('2022-01-04' as ISODate, weekdays)).toBeFalsy();
        });
        it('returns false if weekdays is empty', () => {
            expect(isDateInWeekdays('2022-01-04' as ISODate, [])).toBeFalsy();
        });
        it('returns false if weekdays is undefined', () => {
            expect(isDateInWeekdays('2022-01-04' as ISODate, undefined)).toBeFalsy();
        });
    });
});
