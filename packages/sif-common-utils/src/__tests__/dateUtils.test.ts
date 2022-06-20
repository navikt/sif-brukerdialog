import dayjs from 'dayjs';
import {
    isDateWeekDay,
    dateToISODate,
    getDatesInMonth,
    getFirstWeekDayInMonth,
    getISOWeekdayFromISODate,
    getLastWeekDayInMonth,
    isDateInDates,
    ISODateToDate,
    getYearMonthKey,
    getFirstOfTwoDates,
    getWeekFromDate,
    getLastOfTwoDates,
    getWeeksInMonth,
    getLastWeekdayOnOrBeforeDate,
    getFirstWeekdayOnOrAfterDate,
} from '..';
import { sortDateArray } from '../dateUtils';

describe('dateUtils', () => {
    describe('ISODateToDate', () => {
        it('converts an iso-date formatted date to Date object', () => {
            const result = ISODateToDate('2021-01-01');
            expect(result.getFullYear()).toEqual(2021);
            expect(result.getMonth()).toEqual(0);
            expect(result.getDate()).toEqual(1);
        });
        it('ISODateToDate returns non utc format', () => {
            const result = ISODateToDate('2021-01-01');
            expect(dayjs(result).isUTC()).toBeFalsy();
        });
    });
    describe('dateToISODate', () => {
        it('converts a date to iso formatted date', () => {
            const date: Date = new Date(2021, 0, 1);
            const result = dateToISODate(date);
            expect(result).toEqual('2021-01-01');
        });
    });
    describe('getISOWeekdayFromISODate', () => {
        it('returns monday as day 1, sunday as day 7', () => {
            expect(getISOWeekdayFromISODate('2021-02-1')).toEqual(1);
            expect(getISOWeekdayFromISODate('2021-02-7')).toEqual(7);
        });
    });
    describe('getDatesInMonth', () => {
        it('returns all days of january 2021 correctly', () => {
            const dates = getDatesInMonth(ISODateToDate('2021-01-01'));
            expect(dates.length).toBe(31);
            expect(dateToISODate(dates[0])).toEqual('2021-01-01');
            expect(dateToISODate(dates[30])).toEqual('2021-01-31');
        });
        it('returns all days of february 2021 correctly', () => {
            const dates = getDatesInMonth(ISODateToDate('2021-02-01'));
            expect(dates.length).toBe(28);
            expect(dateToISODate(dates[0])).toEqual('2021-02-01');
            expect(dateToISODate(dates[27])).toEqual('2021-02-28');
        });
        it('returns all days of february 2021 correctly, weekdaysOnly === true', () => {
            const dates = getDatesInMonth(ISODateToDate('2021-02-01'), true);
            expect(dates.length).toBe(20);
            expect(dateToISODate(dates[0])).toEqual('2021-02-01');
            expect(dateToISODate(dates[19])).toEqual('2021-02-26');
        });
    });
    describe('getFirstWeekDayInMonth', () => {
        it('returns correct weekday if first day of month is a monday - 1. january 2020', () => {
            const result = getFirstWeekDayInMonth(ISODateToDate('2020-01-01'));
            expect(dateToISODate(result)).toEqual('2020-01-01');
        });
        it('returns correct weekday if first day of month is a friday - 1. may 2020', () => {
            const result = getFirstWeekDayInMonth(ISODateToDate('2020-05-01'));
            expect(dateToISODate(result)).toEqual('2020-05-01');
        });
        it('returns correct weekday if first day of month is a saturday - 1. february 2020', () => {
            const result = getFirstWeekDayInMonth(ISODateToDate('2020-02-01'));
            expect(dateToISODate(result)).toEqual('2020-02-03');
        });
        it('returns correct weekday if first day of month is a sunday - 1. march 2020', () => {
            const result = getFirstWeekDayInMonth(ISODateToDate('2020-03-01'));
            expect(dateToISODate(result)).toEqual('2020-03-02');
        });
    });
    describe('getLastWeekDayInMonth', () => {
        it('returns correct weekday if first day of month is a monday - 31. august 2020', () => {
            const result = getLastWeekDayInMonth(ISODateToDate('2020-08-01'));
            expect(dateToISODate(result)).toEqual('2020-08-31');
        });
        it('returns correct weekday if last day of month is a friday - 31. january 2020', () => {
            const result = getLastWeekDayInMonth(ISODateToDate('2020-01-01'));
            expect(dateToISODate(result)).toEqual('2020-01-31');
        });
        it('returns correct weekday if last day of month is a saturday - 1. february 2020', () => {
            const result = getLastWeekDayInMonth(ISODateToDate('2020-02-01'));
            expect(dateToISODate(result)).toEqual('2020-02-28');
        });
        it('returns correct weekday if last day of month is a sunday - 31. may 2020', () => {
            const result = getLastWeekDayInMonth(ISODateToDate('2020-05-01'));
            expect(dateToISODate(result)).toEqual('2020-05-29');
        });
    });
    describe('dateIsWeekDay', () => {
        it('mon-fri is weekday, sat-sun is not', () => {
            expect(isDateWeekDay(ISODateToDate('2020-01-06'))).toBeTruthy();
            expect(isDateWeekDay(ISODateToDate('2020-01-07'))).toBeTruthy();
            expect(isDateWeekDay(ISODateToDate('2020-01-08'))).toBeTruthy();
            expect(isDateWeekDay(ISODateToDate('2020-01-09'))).toBeTruthy();
            expect(isDateWeekDay(ISODateToDate('2020-01-10'))).toBeTruthy();
            expect(isDateWeekDay(ISODateToDate('2020-01-11'))).toBeFalsy();
            expect(isDateWeekDay(ISODateToDate('2020-01-12'))).toBeFalsy();
        });
    });
    describe('isDateInDates', () => {
        const dateInDates = ISODateToDate('2020-01-01');
        const dateNotInDates = ISODateToDate('2020-12-12');
        const dates: Date[] = [dateInDates, ISODateToDate('2020-01-02')];
        it('returns true if date exists in dates[]', () => {
            expect(isDateInDates(dateInDates, dates)).toBeTruthy();
        });
        it('returns false if date does not exist in dates[]', () => {
            expect(isDateInDates(dateNotInDates, dates)).toBeFalsy();
        });
        it('returns false if dates is undefined', () => {
            expect(isDateInDates(dateNotInDates, undefined)).toBeFalsy();
        });
    });

    describe('getYearMonthKey', () => {
        it('returns correct yearMonthKey', () => {
            expect(getYearMonthKey(ISODateToDate('2021-01-01'))).toEqual('2021-01');
        });
    });

    describe('getFirstOfTwoDates', () => {
        const d1: Date = ISODateToDate('2021-01-05');
        const d2: Date = ISODateToDate('2021-01-06');

        it('returns date1 if date1 is before date2', () => {
            expect(dateToISODate(getFirstOfTwoDates(d1, d2))).toEqual('2021-01-05');
        });

        it('returns date2 if date1 is after date2', () => {
            expect(dateToISODate(getFirstOfTwoDates(d2, d1))).toEqual('2021-01-05');
        });
    });

    describe('getLastOfTwoDates', () => {
        const d1: Date = ISODateToDate('2021-01-05');
        const d2: Date = ISODateToDate('2021-01-06');

        it('returns date2 if date1 is before date2', () => {
            expect(dateToISODate(getLastOfTwoDates(d1, d2))).toEqual('2021-01-06');
        });

        it('returns date1 if date1 is after date2', () => {
            expect(dateToISODate(getLastOfTwoDates(d2, d1))).toEqual('2021-01-06');
        });
    });

    describe('getWeekFromDate', () => {
        it('returns correct whole week', () => {
            const result = getWeekFromDate(ISODateToDate('2021-05-01'));
            expect(dateToISODate(result.from)).toEqual('2021-04-26');
            expect(dateToISODate(result.to)).toEqual('2021-05-02');
        });
        it('returns correct week within same month when week starts in previous month', () => {
            const result = getWeekFromDate(ISODateToDate('2021-05-01'), true);
            expect(dateToISODate(result.from)).toEqual('2021-05-01');
            expect(dateToISODate(result.to)).toEqual('2021-05-02');
        });
        it('returns correct week within same month when week ends in next month', () => {
            const result = getWeekFromDate(ISODateToDate('2021-05-31'), true);
            expect(dateToISODate(result.from)).toEqual('2021-05-31');
            expect(dateToISODate(result.to)).toEqual('2021-05-31');
        });
    });

    describe('getWeeksInMonth', () => {
        const month: Date = ISODateToDate('2021-05-01');
        it('returns the correct weeks within a month', () => {
            const weeks = getWeeksInMonth(month);
            expect(weeks.length).toBe(6);
            expect(dateToISODate(weeks[0].from)).toEqual('2021-05-01');
            expect(dateToISODate(weeks[0].to)).toEqual('2021-05-02');
            expect(dateToISODate(weeks[5].from)).toEqual('2021-05-31');
            expect(dateToISODate(weeks[5].to)).toEqual('2021-05-31');
        });
        it('returns the correct whole weeks in a month, including dates outside month', () => {
            const weeks = getWeeksInMonth(month, true);
            expect(weeks.length).toBe(6);
            expect(dateToISODate(weeks[0].from)).toEqual('2021-04-26');
            expect(dateToISODate(weeks[0].to)).toEqual('2021-05-02');
            expect(dateToISODate(weeks[5].from)).toEqual('2021-05-31');
            expect(dateToISODate(weeks[5].to)).toEqual('2021-06-06');
        });
    });

    describe('getLastWeekdayOnOrBeforeDate', () => {
        const monday = ISODateToDate('2022-08-01');
        const friday = ISODateToDate('2022-08-05');
        const saturday = ISODateToDate('2022-08-06');
        const sunday = ISODateToDate('2022-08-07');
        it('returns correct same date if date is a weekday', () => {
            expect(dateToISODate(getLastWeekdayOnOrBeforeDate(monday))).toEqual('2022-08-01');
            expect(dateToISODate(getLastWeekdayOnOrBeforeDate(friday))).toEqual('2022-08-05');
        });
        it('returns friday before date if date is a saturday', () => {
            expect(dateToISODate(getLastWeekdayOnOrBeforeDate(saturday))).toEqual('2022-08-05');
        });
        it('returns friday before date if date is a sunday', () => {
            expect(dateToISODate(getLastWeekdayOnOrBeforeDate(sunday))).toEqual('2022-08-05');
        });
    });
    describe('getFirstWeekdayOnOrAfterDate', () => {
        const monday = ISODateToDate('2022-08-01');
        const friday = ISODateToDate('2022-08-05');
        const saturday = ISODateToDate('2022-08-06');
        const sunday = ISODateToDate('2022-08-07');
        it('returns correct same date if date is a weekday', () => {
            expect(dateToISODate(getFirstWeekdayOnOrAfterDate(monday))).toEqual('2022-08-01');
            expect(dateToISODate(getFirstWeekdayOnOrAfterDate(friday))).toEqual('2022-08-05');
        });
        it('returns friday before date if date is a saturday', () => {
            expect(dateToISODate(getFirstWeekdayOnOrAfterDate(saturday))).toEqual('2022-08-08');
        });
        it('returns friday before date if date is a sunday', () => {
            expect(dateToISODate(getFirstWeekdayOnOrAfterDate(sunday))).toEqual('2022-08-08');
        });
    });

    describe('sortDateArray', () => {
        const d1s = '2022-01-03';
        const d2s = '2022-01-04';
        const d3s = '2022-01-05';
        const d1 = ISODateToDate(d1s);
        const d2 = ISODateToDate(d2s);
        const d3 = ISODateToDate(d3s);

        it('sorts correctly 1', () => {
            const dates = [d2, d1, d3];
            const result = sortDateArray(dates);
            expect(dateToISODate(result[0])).toEqual(d1s);
            expect(dateToISODate(result[1])).toEqual(d2s);
            expect(dateToISODate(result[2])).toEqual(d3s);
        });
        it('sorts correctly 2', () => {
            const dates = [d3, d2, d1];
            const result = sortDateArray(dates);
            expect(dateToISODate(result[0])).toEqual(d1s);
            expect(dateToISODate(result[1])).toEqual(d2s);
            expect(dateToISODate(result[2])).toEqual(d3s);
        });
    });
});
