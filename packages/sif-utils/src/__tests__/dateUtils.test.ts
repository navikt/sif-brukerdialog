import dayjs from 'dayjs';

import {
    dateToISODate,
    getDatesInMonth,
    getFirstOfTwoDates,
    getFirstWeekdayInMonth,
    getFirstWeekdayOnOrAfterDate,
    getISOWeekdayFromISODate,
    getLastOfTwoDates,
    getLastWeekdayInMonth,
    getLastWeekdayOnOrBeforeDate,
    getWeekFromDate,
    getWeeksInMonth,
    getYearFromISODate,
    getYearMonthKey,
    ISODate,
    isDateInDates,
    isDateWeekDay,
    isISODateString,
    ISODateToDate,
    maxISODate,
    minISODate,
} from '..';
import { sortDateArray } from '../dateUtils';

describe('dateUtils', () => {
    describe('ISODateToDate', () => {
        it('converts an iso-date formatted date to Date object', () => {
            const result = ISODateToDate('2021-01-01' as ISODate);
            expect(result.getFullYear()).toEqual(2021);
            expect(result.getMonth()).toEqual(0);
            expect(result.getDate()).toEqual(1);
        });
        it('ISODateToDate returns non utc format', () => {
            const result = ISODateToDate('2021-01-01' as ISODate);
            expect(dayjs(result).isUTC()).toBeFalsy();
        });
        it('round-trip ISODateToDate → dateToISODate er stabil (tidssone-uavhengig)', () => {
            for (const iso of [
                '2021-01-01' as ISODate,
                '2024-06-15' as ISODate,
                '2024-12-31' as ISODate,
                '2000-02-29' as ISODate,
            ]) {
                expect(dateToISODate(ISODateToDate(iso))).toBe(iso);
            }
        });
        it('returnerer ugyldig Date for datoer som ikke finnes i kalenderen', () => {
            expect(isNaN(ISODateToDate('2024-02-31' as ISODate).getTime())).toBe(true);
            expect(isNaN(ISODateToDate('2023-02-29' as ISODate).getTime())).toBe(true);
            expect(isNaN(ISODateToDate('2024-04-31' as ISODate).getTime())).toBe(true);
            expect(isNaN(ISODateToDate('2024-13-01' as ISODate).getTime())).toBe(true);
        });
    });
    describe('dateToISODate', () => {
        it('converts a date to iso formatted date', () => {
            const date: Date = new Date(2021, 0, 1);
            const result = dateToISODate(date);
            expect(result).toEqual('2021-01-01' as ISODate);
        });
    });
    describe('getISOWeekdayFromISODate', () => {
        it('returns monday as day 1, sunday as day 7', () => {
            expect(getISOWeekdayFromISODate('2021-02-01' as ISODate)).toEqual(1);
            expect(getISOWeekdayFromISODate('2021-02-07' as ISODate)).toEqual(7);
        });
    });
    describe('getDatesInMonth', () => {
        it('returns all days of january 2021 correctly', () => {
            const dates = getDatesInMonth('2021-01-01' as ISODate);
            expect(dates.length).toBe(31);
            expect(dates[0]).toEqual('2021-01-01' as ISODate);
            expect(dates[30]).toEqual('2021-01-31' as ISODate);
        });
        it('returns all days of february 2021 correctly', () => {
            const dates = getDatesInMonth('2021-02-01' as ISODate);
            expect(dates.length).toBe(28);
            expect(dates[0]).toEqual('2021-02-01' as ISODate);
            expect(dates[27]).toEqual('2021-02-28' as ISODate);
        });
        it('returns all days of february 2021 correctly, weekdaysOnly === true', () => {
            const dates = getDatesInMonth('2021-02-01' as ISODate, true);
            expect(dates.length).toBe(20);
            expect(dates[0]).toEqual('2021-02-01' as ISODate);
            expect(dates[19]).toEqual('2021-02-26' as ISODate);
        });
    });
    describe('getFirstWeekdayInMonth', () => {
        it('returns correct weekday if first day of month is a monday - 1. january 2020', () => {
            expect(getFirstWeekdayInMonth('2020-01-01' as ISODate)).toEqual('2020-01-01' as ISODate);
        });
        it('returns correct weekday if first day of month is a friday - 1. may 2020', () => {
            expect(getFirstWeekdayInMonth('2020-05-01' as ISODate)).toEqual('2020-05-01' as ISODate);
        });
        it('returns correct weekday if first day of month is a saturday - 1. february 2020', () => {
            expect(getFirstWeekdayInMonth('2020-02-01' as ISODate)).toEqual('2020-02-03' as ISODate);
        });
        it('returns correct weekday if first day of month is a sunday - 1. march 2020', () => {
            expect(getFirstWeekdayInMonth('2020-03-01' as ISODate)).toEqual('2020-03-02' as ISODate);
        });
    });
    describe('getLastWeekdayInMonth', () => {
        it('returns correct weekday if first day of month is a monday - 31. august 2020', () => {
            expect(getLastWeekdayInMonth('2020-08-01' as ISODate)).toEqual('2020-08-31' as ISODate);
        });
        it('returns correct weekday if last day of month is a friday - 31. january 2020', () => {
            expect(getLastWeekdayInMonth('2020-01-01' as ISODate)).toEqual('2020-01-31' as ISODate);
        });
        it('returns correct weekday if last day of month is a saturday - 1. february 2020', () => {
            expect(getLastWeekdayInMonth('2020-02-01' as ISODate)).toEqual('2020-02-28' as ISODate);
        });
        it('returns correct weekday if last day of month is a sunday - 31. may 2020', () => {
            expect(getLastWeekdayInMonth('2020-05-01' as ISODate)).toEqual('2020-05-29' as ISODate);
        });
    });
    describe('dateIsWeekDay', () => {
        it('mon-fri is weekday, sat-sun is not', () => {
            expect(isDateWeekDay('2020-01-06' as ISODate)).toBeTruthy();
            expect(isDateWeekDay('2020-01-07' as ISODate)).toBeTruthy();
            expect(isDateWeekDay('2020-01-08' as ISODate)).toBeTruthy();
            expect(isDateWeekDay('2020-01-09' as ISODate)).toBeTruthy();
            expect(isDateWeekDay('2020-01-10' as ISODate)).toBeTruthy();
            expect(isDateWeekDay('2020-01-11' as ISODate)).toBeFalsy();
            expect(isDateWeekDay('2020-01-12' as ISODate)).toBeFalsy();
        });
    });
    describe('isDateInDates', () => {
        const dateInDates = '2020-01-01' as ISODate;
        const dateNotInDates = '2020-12-12' as ISODate;
        const dates: ISODate[] = [dateInDates, '2020-01-02' as ISODate];
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
            expect(getYearMonthKey('2021-01-01' as ISODate)).toEqual('2021-01');
        });
    });

    describe('getFirstOfTwoDates', () => {
        const d1 = '2021-01-05' as ISODate;
        const d2 = '2021-01-06' as ISODate;

        it('returns the earlier date when date1 is first', () => {
            expect(getFirstOfTwoDates(d1, d2)).toEqual(d1);
        });
        it('returns the earlier date when date2 is first', () => {
            expect(getFirstOfTwoDates(d2, d1)).toEqual(d1);
        });
    });

    describe('getLastOfTwoDates', () => {
        const d1 = '2021-01-05' as ISODate;
        const d2 = '2021-01-06' as ISODate;

        it('returns the later date when date1 is first', () => {
            expect(getLastOfTwoDates(d1, d2)).toEqual(d2);
        });
        it('returns the later date when date2 is first', () => {
            expect(getLastOfTwoDates(d2, d1)).toEqual(d2);
        });
    });

    describe('getWeekFromDate', () => {
        it('returns correct whole week', () => {
            const result = getWeekFromDate('2021-05-01' as ISODate);
            expect(result.from).toEqual('2021-04-26' as ISODate);
            expect(result.to).toEqual('2021-05-02' as ISODate);
        });
        it('returns correct week within same month when week starts in previous month', () => {
            const result = getWeekFromDate('2021-05-01' as ISODate, true);
            expect(result.from).toEqual('2021-05-01' as ISODate);
            expect(result.to).toEqual('2021-05-02' as ISODate);
        });
        it('returns correct week within same month when week ends in next month', () => {
            const result = getWeekFromDate('2021-05-31' as ISODate, true);
            expect(result.from).toEqual('2021-05-31' as ISODate);
            expect(result.to).toEqual('2021-05-31' as ISODate);
        });
    });

    describe('getWeeksInMonth', () => {
        const month = '2021-05-01' as ISODate;
        it('returns the correct weeks within a month', () => {
            const weeks = getWeeksInMonth(month);
            expect(weeks.length).toBe(6);
            expect(weeks[0].from).toEqual('2021-05-01' as ISODate);
            expect(weeks[0].to).toEqual('2021-05-02' as ISODate);
            expect(weeks[5].from).toEqual('2021-05-31' as ISODate);
            expect(weeks[5].to).toEqual('2021-05-31' as ISODate);
        });
        it('returns the correct whole weeks in a month, including dates outside month', () => {
            const weeks = getWeeksInMonth(month, true);
            expect(weeks.length).toBe(6);
            expect(weeks[0].from).toEqual('2021-04-26' as ISODate);
            expect(weeks[0].to).toEqual('2021-05-02' as ISODate);
            expect(weeks[5].from).toEqual('2021-05-31' as ISODate);
            expect(weeks[5].to).toEqual('2021-06-06' as ISODate);
        });
    });

    describe('getLastWeekdayOnOrBeforeDate', () => {
        const monday = '2022-08-01' as ISODate;
        const friday = '2022-08-05' as ISODate;
        const saturday = '2022-08-06' as ISODate;
        const sunday = '2022-08-07' as ISODate;
        it('returns correct same date if date is a weekday', () => {
            expect(getLastWeekdayOnOrBeforeDate(monday)).toEqual('2022-08-01' as ISODate);
            expect(getLastWeekdayOnOrBeforeDate(friday)).toEqual('2022-08-05' as ISODate);
        });
        it('returns friday before date if date is a saturday', () => {
            expect(getLastWeekdayOnOrBeforeDate(saturday)).toEqual('2022-08-05' as ISODate);
        });
        it('returns friday before date if date is a sunday', () => {
            expect(getLastWeekdayOnOrBeforeDate(sunday)).toEqual('2022-08-05' as ISODate);
        });
    });
    describe('getFirstWeekdayOnOrAfterDate', () => {
        const monday = '2022-08-01' as ISODate;
        const friday = '2022-08-05' as ISODate;
        const saturday = '2022-08-06' as ISODate;
        const sunday = '2022-08-07' as ISODate;
        it('returns correct same date if date is a weekday', () => {
            expect(getFirstWeekdayOnOrAfterDate(monday)).toEqual('2022-08-01' as ISODate);
            expect(getFirstWeekdayOnOrAfterDate(friday)).toEqual('2022-08-05' as ISODate);
        });
        it('returns monday after date if date is a saturday', () => {
            expect(getFirstWeekdayOnOrAfterDate(saturday)).toEqual('2022-08-08' as ISODate);
        });
        it('returns monday after date if date is a sunday', () => {
            expect(getFirstWeekdayOnOrAfterDate(sunday)).toEqual('2022-08-08' as ISODate);
        });
    });

    describe('isISODateString', () => {
        it('godkjenner gyldige ISO-datostrenger', () => {
            expect(isISODateString('2021-01-01')).toBe(true);
            expect(isISODateString('0001-01-01')).toBe(true);
        });
        it('avviser ugyldige verdier', () => {
            expect(isISODateString('01.01.2021')).toBe(false);
            expect(isISODateString('2021-1-1')).toBe(false);
            expect(isISODateString('')).toBe(false);
            expect(isISODateString(null)).toBe(false);
            expect(isISODateString(undefined)).toBe(false);
            expect(isISODateString(42)).toBe(false);
        });
    });

    describe('ISODateToDate - edge cases', () => {
        it('håndterer ledende null-år (0001-01-01)', () => {
            const result = ISODateToDate('0001-01-01' as ISODate);
            expect(result.getFullYear()).toBe(1);
        });
    });

    describe('getYearFromISODate', () => {
        it('returns correct year', () => {
            expect(getYearFromISODate('2021-06-15' as ISODate)).toBe(2021);
            expect(getYearFromISODate('0001-01-01' as ISODate)).toBe(1);
        });
    });

    describe('maxISODate', () => {
        it('returns the latest date', () => {
            expect(maxISODate(['2021-01-01', '2021-06-15', '2020-12-31'] as ISODate[])).toBe('2021-06-15');
        });
        it('returns undefined for empty array', () => {
            expect(maxISODate([])).toBeUndefined();
        });
    });

    describe('minISODate', () => {
        it('returns the earliest date', () => {
            expect(minISODate(['2021-01-01', '2021-06-15', '2020-12-31'] as ISODate[])).toBe('2020-12-31');
        });
        it('returns undefined for empty array', () => {
            expect(minISODate([])).toBeUndefined();
        });
    });

    describe('sortDateArray', () => {
        const d1 = '2021-01-01' as ISODate;
        const d2 = '2021-01-02' as ISODate;
        const d3 = '2021-01-03' as ISODate;

        it('sorts correctly 1', () => {
            const result = sortDateArray([d2, d1, d3]);
            expect(result[0]).toEqual(d1);
            expect(result[1]).toEqual(d2);
            expect(result[2]).toEqual(d3);
        });
        it('sorts correctly 2', () => {
            const result = sortDateArray([d3, d2, d1]);
            expect(result[0]).toEqual(d1);
            expect(result[1]).toEqual(d2);
            expect(result[2]).toEqual(d3);
        });
        it('does not mutate the original array', () => {
            const original = [d3, d1, d2] as ISODate[];
            sortDateArray(original);
            expect(original[0]).toEqual(d3);
        });
    });
});
