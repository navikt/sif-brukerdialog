"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dateUtils_1 = require("../dateUtils");
const types_1 = require("../types");
const weekdayUtils_1 = require("../weekdayUtils");
describe('weekdayUtils', () => {
    describe('getWeekdayDOW', () => {
        it('returns correkt DOW', () => {
            expect((0, weekdayUtils_1.getWeekdayDOW)(types_1.Weekday.monday)).toEqual(1);
            expect((0, weekdayUtils_1.getWeekdayDOW)(types_1.Weekday.tuesday)).toEqual(2);
            expect((0, weekdayUtils_1.getWeekdayDOW)(types_1.Weekday.wednesday)).toEqual(3);
            expect((0, weekdayUtils_1.getWeekdayDOW)(types_1.Weekday.thursday)).toEqual(4);
            expect((0, weekdayUtils_1.getWeekdayDOW)(types_1.Weekday.friday)).toEqual(5);
        });
    });
    describe('getWeekdayFromDate', () => {
        it('returns correct weekday for monday to friday', () => {
            expect((0, weekdayUtils_1.getWeekdayFromDate)((0, dateUtils_1.ISODateToDate)('2022-01-03'))).toEqual(types_1.Weekday.monday);
            expect((0, weekdayUtils_1.getWeekdayFromDate)((0, dateUtils_1.ISODateToDate)('2022-01-04'))).toEqual(types_1.Weekday.tuesday);
            expect((0, weekdayUtils_1.getWeekdayFromDate)((0, dateUtils_1.ISODateToDate)('2022-01-05'))).toEqual(types_1.Weekday.wednesday);
            expect((0, weekdayUtils_1.getWeekdayFromDate)((0, dateUtils_1.ISODateToDate)('2022-01-06'))).toEqual(types_1.Weekday.thursday);
            expect((0, weekdayUtils_1.getWeekdayFromDate)((0, dateUtils_1.ISODateToDate)('2022-01-07'))).toEqual(types_1.Weekday.friday);
        });
        it('returns undefined for saturday and sunday', () => {
            expect((0, weekdayUtils_1.getWeekdayFromDate)((0, dateUtils_1.ISODateToDate)('2022-01-08'))).toBeUndefined();
            expect((0, weekdayUtils_1.getWeekdayFromDate)((0, dateUtils_1.ISODateToDate)('2022-01-09'))).toBeUndefined();
        });
    });
    describe('isDateInWeekdays', () => {
        const weedays = [types_1.Weekday.monday, types_1.Weekday.wednesday];
        it('returns true if date is in weedays', () => {
            expect((0, weekdayUtils_1.isDateInWeekdays)((0, dateUtils_1.ISODateToDate)('2022-01-03'), weedays)).toBeTruthy();
            expect((0, weekdayUtils_1.isDateInWeekdays)((0, dateUtils_1.ISODateToDate)('2022-01-05'), weedays)).toBeTruthy();
        });
        it('returns false if date is NOT in weedays', () => {
            expect((0, weekdayUtils_1.isDateInWeekdays)((0, dateUtils_1.ISODateToDate)('2022-01-04'), weedays)).toBeFalsy();
        });
        it('returns false if weekdays is empty', () => {
            expect((0, weekdayUtils_1.isDateInWeekdays)((0, dateUtils_1.ISODateToDate)('2022-01-04'), [])).toBeFalsy();
        });
        it('returns false if weekdays is undefined', () => {
            expect((0, weekdayUtils_1.isDateInWeekdays)((0, dateUtils_1.ISODateToDate)('2022-01-04'), undefined)).toBeFalsy();
        });
    });
});
