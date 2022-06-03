"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dayjs_1 = __importDefault(require("dayjs"));
const __1 = require("..");
const dateUtils_1 = require("../dateUtils");
describe('dateUtils', () => {
    describe('ISODateToDate', () => {
        it('converts an iso-date formatted date to Date object', () => {
            const result = (0, __1.ISODateToDate)('2021-01-01');
            expect(result.getFullYear()).toEqual(2021);
            expect(result.getMonth()).toEqual(0);
            expect(result.getDate()).toEqual(1);
        });
        it('ISODateToDate returns non utc format', () => {
            const result = (0, __1.ISODateToDate)('2021-01-01');
            expect((0, dayjs_1.default)(result).isUTC()).toBeFalsy();
        });
    });
    describe('dateToISODate', () => {
        it('converts a date to iso formatted date', () => {
            const date = new Date(2021, 0, 1);
            const result = (0, __1.dateToISODate)(date);
            expect(result).toEqual('2021-01-01');
        });
    });
    describe('getISOWeekdayFromISODate', () => {
        it('returns monday as day 1, sunday as day 7', () => {
            expect((0, __1.getISOWeekdayFromISODate)('2021-02-1')).toEqual(1);
            expect((0, __1.getISOWeekdayFromISODate)('2021-02-7')).toEqual(7);
        });
    });
    describe('getDatesInMonth', () => {
        it('returns all days of january 2021 correctly', () => {
            const dates = (0, __1.getDatesInMonth)((0, __1.ISODateToDate)('2021-01-01'));
            expect(dates.length).toBe(31);
            expect((0, __1.dateToISODate)(dates[0])).toEqual('2021-01-01');
            expect((0, __1.dateToISODate)(dates[30])).toEqual('2021-01-31');
        });
        it('returns all days of february 2021 correctly', () => {
            const dates = (0, __1.getDatesInMonth)((0, __1.ISODateToDate)('2021-02-01'));
            expect(dates.length).toBe(28);
            expect((0, __1.dateToISODate)(dates[0])).toEqual('2021-02-01');
            expect((0, __1.dateToISODate)(dates[27])).toEqual('2021-02-28');
        });
        it('returns all days of february 2021 correctly, weekdaysOnly === true', () => {
            const dates = (0, __1.getDatesInMonth)((0, __1.ISODateToDate)('2021-02-01'), true);
            expect(dates.length).toBe(20);
            expect((0, __1.dateToISODate)(dates[0])).toEqual('2021-02-01');
            expect((0, __1.dateToISODate)(dates[19])).toEqual('2021-02-26');
        });
    });
    describe('getFirstWeekDayInMonth', () => {
        it('returns correct weekday if first day of month is a monday - 1. january 2020', () => {
            const result = (0, __1.getFirstWeekDayInMonth)((0, __1.ISODateToDate)('2020-01-01'));
            expect((0, __1.dateToISODate)(result)).toEqual('2020-01-01');
        });
        it('returns correct weekday if first day of month is a friday - 1. may 2020', () => {
            const result = (0, __1.getFirstWeekDayInMonth)((0, __1.ISODateToDate)('2020-05-01'));
            expect((0, __1.dateToISODate)(result)).toEqual('2020-05-01');
        });
        it('returns correct weekday if first day of month is a saturday - 1. february 2020', () => {
            const result = (0, __1.getFirstWeekDayInMonth)((0, __1.ISODateToDate)('2020-02-01'));
            expect((0, __1.dateToISODate)(result)).toEqual('2020-02-03');
        });
        it('returns correct weekday if first day of month is a sunday - 1. march 2020', () => {
            const result = (0, __1.getFirstWeekDayInMonth)((0, __1.ISODateToDate)('2020-03-01'));
            expect((0, __1.dateToISODate)(result)).toEqual('2020-03-02');
        });
    });
    describe('getLastWeekDayInMonth', () => {
        it('returns correct weekday if first day of month is a monday - 31. august 2020', () => {
            const result = (0, __1.getLastWeekDayInMonth)((0, __1.ISODateToDate)('2020-08-01'));
            expect((0, __1.dateToISODate)(result)).toEqual('2020-08-31');
        });
        it('returns correct weekday if last day of month is a friday - 31. january 2020', () => {
            const result = (0, __1.getLastWeekDayInMonth)((0, __1.ISODateToDate)('2020-01-01'));
            expect((0, __1.dateToISODate)(result)).toEqual('2020-01-31');
        });
        it('returns correct weekday if last day of month is a saturday - 1. february 2020', () => {
            const result = (0, __1.getLastWeekDayInMonth)((0, __1.ISODateToDate)('2020-02-01'));
            expect((0, __1.dateToISODate)(result)).toEqual('2020-02-28');
        });
        it('returns correct weekday if last day of month is a sunday - 31. may 2020', () => {
            const result = (0, __1.getLastWeekDayInMonth)((0, __1.ISODateToDate)('2020-05-01'));
            expect((0, __1.dateToISODate)(result)).toEqual('2020-05-29');
        });
    });
    describe('dateIsWeekDay', () => {
        it('mon-fri is weekday, sat-sun is not', () => {
            expect((0, __1.isDateWeekDay)((0, __1.ISODateToDate)('2020-01-06'))).toBeTruthy();
            expect((0, __1.isDateWeekDay)((0, __1.ISODateToDate)('2020-01-07'))).toBeTruthy();
            expect((0, __1.isDateWeekDay)((0, __1.ISODateToDate)('2020-01-08'))).toBeTruthy();
            expect((0, __1.isDateWeekDay)((0, __1.ISODateToDate)('2020-01-09'))).toBeTruthy();
            expect((0, __1.isDateWeekDay)((0, __1.ISODateToDate)('2020-01-10'))).toBeTruthy();
            expect((0, __1.isDateWeekDay)((0, __1.ISODateToDate)('2020-01-11'))).toBeFalsy();
            expect((0, __1.isDateWeekDay)((0, __1.ISODateToDate)('2020-01-12'))).toBeFalsy();
        });
    });
    describe('isDateInDates', () => {
        const dateInDates = (0, __1.ISODateToDate)('2020-01-01');
        const dateNotInDates = (0, __1.ISODateToDate)('2020-12-12');
        const dates = [dateInDates, (0, __1.ISODateToDate)('2020-01-02')];
        it('returns true if date exists in dates[]', () => {
            expect((0, __1.isDateInDates)(dateInDates, dates)).toBeTruthy();
        });
        it('returns false if date does not exist in dates[]', () => {
            expect((0, __1.isDateInDates)(dateNotInDates, dates)).toBeFalsy();
        });
        it('returns false if dates is undefined', () => {
            expect((0, __1.isDateInDates)(dateNotInDates, undefined)).toBeFalsy();
        });
    });
    describe('getYearMonthKey', () => {
        it('returns correct yearMonthKey', () => {
            expect((0, __1.getYearMonthKey)((0, __1.ISODateToDate)('2021-01-01'))).toEqual('2021-01');
        });
    });
    describe('getFirstOfTwoDates', () => {
        const d1 = (0, __1.ISODateToDate)('2021-01-05');
        const d2 = (0, __1.ISODateToDate)('2021-01-06');
        it('returns date1 if date1 is before date2', () => {
            expect((0, __1.dateToISODate)((0, __1.getFirstOfTwoDates)(d1, d2))).toEqual('2021-01-05');
        });
        it('returns date2 if date1 is after date2', () => {
            expect((0, __1.dateToISODate)((0, __1.getFirstOfTwoDates)(d2, d1))).toEqual('2021-01-05');
        });
    });
    describe('getLastOfTwoDates', () => {
        const d1 = (0, __1.ISODateToDate)('2021-01-05');
        const d2 = (0, __1.ISODateToDate)('2021-01-06');
        it('returns date2 if date1 is before date2', () => {
            expect((0, __1.dateToISODate)((0, __1.getLastOfTwoDates)(d1, d2))).toEqual('2021-01-06');
        });
        it('returns date1 if date1 is after date2', () => {
            expect((0, __1.dateToISODate)((0, __1.getLastOfTwoDates)(d2, d1))).toEqual('2021-01-06');
        });
    });
    describe('getWeekFromDate', () => {
        it('returns correct whole week', () => {
            const result = (0, __1.getWeekFromDate)((0, __1.ISODateToDate)('2021-05-01'));
            expect((0, __1.dateToISODate)(result.from)).toEqual('2021-04-26');
            expect((0, __1.dateToISODate)(result.to)).toEqual('2021-05-02');
        });
        it('returns correct week within same month when week starts in previous month', () => {
            const result = (0, __1.getWeekFromDate)((0, __1.ISODateToDate)('2021-05-01'), true);
            expect((0, __1.dateToISODate)(result.from)).toEqual('2021-05-01');
            expect((0, __1.dateToISODate)(result.to)).toEqual('2021-05-02');
        });
        it('returns correct week within same month when week ends in next month', () => {
            const result = (0, __1.getWeekFromDate)((0, __1.ISODateToDate)('2021-05-31'), true);
            expect((0, __1.dateToISODate)(result.from)).toEqual('2021-05-31');
            expect((0, __1.dateToISODate)(result.to)).toEqual('2021-05-31');
        });
    });
    describe('getWeeksInMonth', () => {
        const month = (0, __1.ISODateToDate)('2021-05-01');
        it('returns the correct weeks within a month', () => {
            const weeks = (0, __1.getWeeksInMonth)(month);
            expect(weeks.length).toBe(6);
            expect((0, __1.dateToISODate)(weeks[0].from)).toEqual('2021-05-01');
            expect((0, __1.dateToISODate)(weeks[0].to)).toEqual('2021-05-02');
            expect((0, __1.dateToISODate)(weeks[5].from)).toEqual('2021-05-31');
            expect((0, __1.dateToISODate)(weeks[5].to)).toEqual('2021-05-31');
        });
        it('returns the correct whole weeks in a month, including dates outside month', () => {
            const weeks = (0, __1.getWeeksInMonth)(month, true);
            expect(weeks.length).toBe(6);
            expect((0, __1.dateToISODate)(weeks[0].from)).toEqual('2021-04-26');
            expect((0, __1.dateToISODate)(weeks[0].to)).toEqual('2021-05-02');
            expect((0, __1.dateToISODate)(weeks[5].from)).toEqual('2021-05-31');
            expect((0, __1.dateToISODate)(weeks[5].to)).toEqual('2021-06-06');
        });
    });
    describe('getLastWeekdayOnOrBeforeDate', () => {
        const monday = (0, __1.ISODateToDate)('2022-08-01');
        const friday = (0, __1.ISODateToDate)('2022-08-05');
        const saturday = (0, __1.ISODateToDate)('2022-08-06');
        const sunday = (0, __1.ISODateToDate)('2022-08-07');
        it('returns correct same date if date is a weekday', () => {
            expect((0, __1.dateToISODate)((0, __1.getLastWeekdayOnOrBeforeDate)(monday))).toEqual('2022-08-01');
            expect((0, __1.dateToISODate)((0, __1.getLastWeekdayOnOrBeforeDate)(friday))).toEqual('2022-08-05');
        });
        it('returns friday before date if date is a saturday', () => {
            expect((0, __1.dateToISODate)((0, __1.getLastWeekdayOnOrBeforeDate)(saturday))).toEqual('2022-08-05');
        });
        it('returns friday before date if date is a sunday', () => {
            expect((0, __1.dateToISODate)((0, __1.getLastWeekdayOnOrBeforeDate)(sunday))).toEqual('2022-08-05');
        });
    });
    describe('getFirstWeekdayOnOrAfterDate', () => {
        const monday = (0, __1.ISODateToDate)('2022-08-01');
        const friday = (0, __1.ISODateToDate)('2022-08-05');
        const saturday = (0, __1.ISODateToDate)('2022-08-06');
        const sunday = (0, __1.ISODateToDate)('2022-08-07');
        it('returns correct same date if date is a weekday', () => {
            expect((0, __1.dateToISODate)((0, __1.getFirstWeekdayOnOrAfterDate)(monday))).toEqual('2022-08-01');
            expect((0, __1.dateToISODate)((0, __1.getFirstWeekdayOnOrAfterDate)(friday))).toEqual('2022-08-05');
        });
        it('returns friday before date if date is a saturday', () => {
            expect((0, __1.dateToISODate)((0, __1.getFirstWeekdayOnOrAfterDate)(saturday))).toEqual('2022-08-08');
        });
        it('returns friday before date if date is a sunday', () => {
            expect((0, __1.dateToISODate)((0, __1.getFirstWeekdayOnOrAfterDate)(sunday))).toEqual('2022-08-08');
        });
    });
    describe('sortDateArray', () => {
        const d1s = '2022-01-03';
        const d2s = '2022-01-04';
        const d3s = '2022-01-05';
        const d1 = (0, __1.ISODateToDate)(d1s);
        const d2 = (0, __1.ISODateToDate)(d2s);
        const d3 = (0, __1.ISODateToDate)(d3s);
        it('sorts correctly 1', () => {
            const dates = [d2, d1, d3];
            const result = (0, dateUtils_1.sortDateArray)(dates);
            expect((0, __1.dateToISODate)(result[0])).toEqual(d1s);
            expect((0, __1.dateToISODate)(result[1])).toEqual(d2s);
            expect((0, __1.dateToISODate)(result[2])).toEqual(d3s);
        });
        it('sorts correctly 2', () => {
            const dates = [d3, d2, d1];
            const result = (0, dateUtils_1.sortDateArray)(dates);
            expect((0, __1.dateToISODate)(result[0])).toEqual(d1s);
            expect((0, __1.dateToISODate)(result[1])).toEqual(d2s);
            expect((0, __1.dateToISODate)(result[2])).toEqual(d3s);
        });
    });
});
