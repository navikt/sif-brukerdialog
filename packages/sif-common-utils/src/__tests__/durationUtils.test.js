"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../");
const dateUtils_1 = require("../dateUtils");
const durationUtils_1 = require("../durationUtils");
describe('durationUtils', () => {
    describe('getPositiveNumberValue', () => {
        it('returns number when value is a number', () => {
            expect((0, __1.getPositiveNumberValue)(0)).toEqual(0);
            expect((0, __1.getPositiveNumberValue)(20)).toEqual(20);
        });
        it('returns number when value is a valid number string', () => {
            expect((0, __1.getPositiveNumberValue)('0')).toEqual(0);
            expect((0, __1.getPositiveNumberValue)('20')).toEqual(20);
        });
        it('returns undefined when value is undefined', () => {
            expect((0, __1.getPositiveNumberValue)(undefined)).toBeUndefined();
        });
        it('returns undefined when value is empty string', () => {
            expect((0, __1.getPositiveNumberValue)('')).toBeUndefined();
        });
        it('returns invalidNumberValue when value is an invalid number string', () => {
            expect((0, __1.getPositiveNumberValue)('a')).toEqual('invalidNumberValue');
        });
        it('returns invalidNumberValue when value is a negative number', () => {
            expect((0, __1.getPositiveNumberValue)(-1)).toEqual('invalidNumberValue');
        });
        it('returns invalidNumberValue when value is another type than number, string or undefined', () => {
            expect((0, __1.getPositiveNumberValue)([])).toEqual('invalidNumberValue');
            expect((0, __1.getPositiveNumberValue)({})).toEqual('invalidNumberValue');
        });
    });
    describe('durationAsDateDuration', () => {
        it('converts correctly', () => {
            const result = (0, __1.numberDurationAsDuration)({ hours: 1, minutes: 2 });
            expect(result.hours).toEqual('1');
            expect(result.minutes).toEqual('2');
        });
    });
    describe('DateDurationAsDuration', () => {
        it('returns duration correctly when Duration is valid', () => {
            const result = (0, __1.durationAsNumberDuration)({ hours: '6', minutes: '30' });
            expect(result === null || result === void 0 ? void 0 : result.hours).toEqual(6);
            expect(result === null || result === void 0 ? void 0 : result.minutes).toEqual(30);
        });
    });
    describe('durationToISODuration', () => {
        it('converts {h: 0, m: 0} to ISODuration', () => {
            expect((0, __1.durationToISODuration)({ hours: 0, minutes: 0 })).toEqual('PT0H0M');
        });
        it('converts {h: undefined, m: 0} to ISODuration', () => {
            expect((0, __1.durationToISODuration)({ minutes: '0' })).toEqual('PT0H0M');
        });
        it('converts {h: 1, m: undefined} to ISODuration', () => {
            expect((0, __1.durationToISODuration)({ hours: '1' })).toEqual('PT1H0M');
        });
    });
    describe('ISODurationToNumberDuration', () => {
        it('converts PT0H0M correctly', () => {
            const result = (0, __1.ISODurationToNumberDuration)('PT0H0M');
            expect(result === null || result === void 0 ? void 0 : result.hours).toEqual(0);
            expect(result === null || result === void 0 ? void 0 : result.minutes).toEqual(0);
        });
        it('converts PT10H50M correctly', () => {
            const result = (0, __1.ISODurationToNumberDuration)('PT10H50M');
            expect(result === null || result === void 0 ? void 0 : result.hours).toEqual(10);
            expect(result === null || result === void 0 ? void 0 : result.minutes).toEqual(50);
        });
        it('maintains overflow of minutes (more than 59 minutes)', () => {
            const result = (0, __1.ISODurationToNumberDuration)('PT10H65M');
            expect(result === null || result === void 0 ? void 0 : result.hours).toEqual(10);
            expect(result === null || result === void 0 ? void 0 : result.minutes).toEqual(65);
        });
        it('returns undefined when isoduration is invalid', () => {
            const result = (0, __1.ISODurationToNumberDuration)('XYZ');
            expect(result).toBeUndefined();
        });
    });
    describe('durationToDecimalDuration', () => {
        describe('duration with numbers', () => {
            it('converts 1 hour correctly', () => {
                expect((0, __1.durationToDecimalDuration)({ hours: 1, minutes: 0 })).toEqual(1);
            });
            it('converts 1 hour and 30 minutes correctly', () => {
                expect((0, __1.durationToDecimalDuration)({ hours: 1, minutes: 30 })).toEqual(1.5);
            });
            it('converts 1 hour and 59 minutes correctly', () => {
                expect((0, __1.durationToDecimalDuration)({ hours: 1, minutes: 59 })).toEqual(1.98);
            });
            it('handles overflow of minutes correctly', () => {
                expect((0, __1.durationToDecimalDuration)({ hours: 1, minutes: 120 })).toEqual(3);
            });
        });
        describe('Duration with strings', () => {
            it('converts 1 hour correctly', () => {
                expect((0, __1.durationToDecimalDuration)({ hours: '1', minutes: '0' })).toEqual(1);
            });
            it('converts 1 hour and 30 minutes correctly', () => {
                expect((0, __1.durationToDecimalDuration)({ hours: '1', minutes: '30' })).toEqual(1.5);
            });
            it('converts 1 hour and 59 minutes correctly', () => {
                expect((0, __1.durationToDecimalDuration)({ hours: '1', minutes: '59' })).toEqual(1.98);
            });
        });
    });
    describe('decimalDurationToDuration', () => {
        it('converts 1 hour correctly', () => {
            const result = (0, __1.decimalDurationToNumberDuration)(1);
            expect(result.hours).toEqual(1);
            expect(result.minutes).toEqual(0);
        });
        it('converts 1,5 hours correctly', () => {
            const result = (0, __1.decimalDurationToNumberDuration)(1.5);
            expect(result.hours).toEqual(1);
            expect(result.minutes).toEqual(30);
        });
        it('converts 1,98 hours correctly', () => {
            const result = (0, __1.decimalDurationToNumberDuration)(1.98);
            expect(result.hours).toEqual(1);
            expect(result.minutes).toEqual(59);
        });
    });
    describe('decimalDurationToDateDuration', () => {
        it('converts 1 hour correctly', () => {
            const result = (0, __1.decimalDurationToDuration)(1);
            expect(result.hours).toEqual('1');
            expect(result.minutes).toEqual('0');
        });
        it('converts 1,5 hours correctly', () => {
            const result = (0, __1.decimalDurationToDuration)(1.5);
            expect(result.hours).toEqual('1');
            expect(result.minutes).toEqual('30');
        });
        it('converts 1,98 hours correctly', () => {
            const result = (0, __1.decimalDurationToDuration)(1.98);
            expect(result.hours).toEqual('1');
            expect(result.minutes).toEqual('59');
        });
    });
    describe('ISODurationToDateDuration', () => {
        it('returns undefined if duration is invalid', () => {
            expect((0, __1.ISODurationToMaybeDuration)('TABC')).toBeFalsy();
        });
        it('returns correct input duration when duration is valid', () => {
            var _a, _b;
            expect((_a = (0, __1.ISODurationToMaybeDuration)('PT1H')) === null || _a === void 0 ? void 0 : _a.hours).toEqual('1');
            expect((_b = (0, __1.ISODurationToMaybeDuration)('PT1M')) === null || _b === void 0 ? void 0 : _b.minutes).toEqual('1');
        });
        it('returns 0 hours and 0 minutes when duration is valid, but hours and minutes not set', () => {
            var _a, _b;
            expect((_a = (0, __1.ISODurationToMaybeDuration)('PT')) === null || _a === void 0 ? void 0 : _a.hours).toEqual('0');
            expect((_b = (0, __1.ISODurationToMaybeDuration)('PT')) === null || _b === void 0 ? void 0 : _b.minutes).toEqual('0');
        });
    });
    describe('isValidDuration', () => {
        it('returns false if duration is undefined', () => {
            expect((0, __1.isValidDuration)(undefined)).toBeFalsy();
        });
        it('returns false if duration is Duration with empty strings', () => {
            expect((0, __1.isValidDuration)({ hours: '', minutes: '' })).toBeFalsy();
        });
        it('returns false if duration is Duration with invalid values in hours and or minutes', () => {
            expect((0, __1.isValidDuration)({ hours: 'a', minutes: '' })).toBeFalsy();
            expect((0, __1.isValidDuration)({ hours: 'a', minutes: '0' })).toBeFalsy();
            expect((0, __1.isValidDuration)({ hours: '0', minutes: '-' })).toBeFalsy();
            expect((0, __1.isValidDuration)({ hours: '', minutes: '' })).toBeFalsy();
        });
        it('returns true if duration is Duration with value for minutes and/or hours', () => {
            expect((0, __1.isValidDuration)({ hours: '1', minutes: '' })).toBeTruthy();
            expect((0, __1.isValidDuration)({ hours: '', minutes: '1' })).toBeTruthy();
            expect((0, __1.isValidDuration)({ hours: '1', minutes: '1' })).toBeTruthy();
            expect((0, __1.isValidDuration)({ hours: '0', minutes: '0' })).toBeTruthy();
        });
        it('returns true on valid duration', () => {
            expect((0, __1.isValidDuration)({ hours: 0, minutes: 0 })).toBeTruthy();
        });
        it('returns true on valid duration - with hours and minutes', () => {
            expect((0, __1.isValidDuration)({ hours: 15, minutes: 59 })).toBeTruthy();
        });
        it('returns false if duration has minutes above 59', () => {
            expect((0, __1.isValidDuration)({ hours: 15, minutes: 60 })).toBeFalsy();
        });
    });
    describe('durationIsZero', () => {
        it('verifies no duration', () => {
            expect((0, __1.durationIsZero)({})).toBeTruthy();
        });
        it('fails if hours is more than zero', () => {
            expect((0, __1.durationIsZero)({ hours: '1' })).toBeFalsy();
        });
        it('fails if minutes is more than 0', () => {
            expect((0, __1.durationIsZero)({ minutes: '1' })).toBeFalsy();
        });
    });
    describe('ensureNumberDuration', () => {
        it('returns valid duration if hours or minutes are missing', () => {
            const duration = (0, __1.ensureNumberDuration)({});
            expect(duration.hours).toEqual(0);
            expect(duration.minutes).toEqual(0);
        });
        it('returns 0 hours and 0 minutes if hours or minutes are invalid', () => {
            const duration = (0, __1.ensureNumberDuration)({ hours: 'a', minutes: 'b' });
            expect(duration.hours).toEqual(0);
            expect(duration.minutes).toEqual(0);
        });
        it('keeps hours if hours are defined and minutes are undefined', () => {
            const duration = (0, __1.ensureNumberDuration)({ hours: 1 });
            expect(duration.hours).toEqual(1);
            expect(duration.minutes).toEqual(0);
        });
        it('keeps minutes if hours are defined and minutes are undefined', () => {
            const duration = (0, __1.ensureNumberDuration)({ minutes: 1 });
            expect(duration.hours).toEqual(0);
            expect(duration.minutes).toEqual(1);
        });
        it('keeps hours and minutes if both are defined', () => {
            const duration = (0, __1.ensureNumberDuration)({ hours: 1, minutes: 2 });
            expect(duration.hours).toEqual(1);
            expect(duration.minutes).toEqual(2);
        });
        it('handles hours and minutes when they are strings', () => {
            const duration = (0, __1.ensureNumberDuration)({ hours: '1', minutes: '2' });
            expect(duration.hours).toEqual(1);
            expect(duration.minutes).toEqual(2);
        });
    });
    describe('ensureDuration', () => {
        it('returns valid duration if hours or minutes are missing', () => {
            const duration = (0, __1.ensureDuration)({});
            expect(duration.hours).toEqual('0');
            expect(duration.minutes).toEqual('0');
        });
        it('keeps hours if hours are defined and minutes are undefined', () => {
            const duration = (0, __1.ensureDuration)({ hours: '1' });
            expect(duration.hours).toEqual('1');
            expect(duration.minutes).toEqual('0');
        });
        it('keeps minutes if hours are defined and minutes are undefined', () => {
            const duration = (0, __1.ensureDuration)({ minutes: '1' });
            expect(duration.hours).toEqual('0');
            expect(duration.minutes).toEqual('1');
        });
        it('keeps hours and minutes if both are defined', () => {
            const duration = (0, __1.ensureDuration)({ hours: 1, minutes: 2 });
            expect(duration.hours).toEqual('1');
            expect(duration.minutes).toEqual('2');
        });
    });
    describe('summarizeDurations', () => {
        const dur1 = (0, __1.ISODurationToNumberDuration)('PT2H0M');
        const dur2 = (0, __1.ISODurationToNumberDuration)('PT2H0M');
        const dur3 = (0, __1.ISODurationToNumberDuration)('PT3H1M');
        it('sums durations in array correctly when all durations are valid', () => {
            const result = (0, durationUtils_1.summarizeDurations)([dur1, dur2, dur3]);
            expect(result.hours).toBe(7);
            expect(result.minutes).toBe(1);
        });
        it('sums durations in array correctly when it contains invalid durations', () => {
            const result = (0, durationUtils_1.summarizeDurations)([dur1, dur2, dur3, { hours: -1, minutes: -1 }]);
            expect(result.hours).toBe(7);
            expect(result.minutes).toBe(1);
        });
        it('sums durations in array correctly when it contains undefined durations', () => {
            const result = (0, durationUtils_1.summarizeDurations)([dur1, dur2, dur3, undefined, { hours: -1, minutes: -1 }]);
            expect(result.hours).toBe(7);
            expect(result.minutes).toBe(1);
        });
        it('sums durations in array correctly when minutes sums to 60', () => {
            const result = (0, durationUtils_1.summarizeDurations)([
                { hours: '1', minutes: '30' },
                { hours: '1', minutes: '30' },
            ]);
            expect(result.hours).toBe(3);
            expect(result.minutes).toBe(0);
        });
        it('sums durations in array correctly when minutes sums to 65', () => {
            const result = (0, durationUtils_1.summarizeDurations)([
                { hours: '1', minutes: '30' },
                { hours: '1', minutes: '35' },
            ]);
            expect(result.hours).toBe(3);
            expect(result.minutes).toBe(5);
        });
        it('sums durations in array correctly when minutes sums to 125', () => {
            const result = (0, durationUtils_1.summarizeDurations)([
                { hours: '0', minutes: '50' },
                { hours: '0', minutes: '50' },
                { hours: '0', minutes: '25' },
            ]);
            expect(result.hours).toBe(2);
            expect(result.minutes).toBe(5);
        });
    });
    describe('durationsAreEqual', () => {
        const dur1 = (0, __1.ISODurationToNumberDuration)('PT2H0M');
        const dur2 = (0, __1.ISODurationToNumberDuration)('PT2H0M');
        const dur3 = (0, __1.ISODurationToNumberDuration)('PT3H0M');
        it('returns true if both are undefined', () => {
            expect((0, __1.durationsAreEqual)(undefined, undefined)).toBeTruthy();
        });
        it('returns true when equal durations', () => {
            expect((0, __1.durationsAreEqual)(dur1, dur2)).toBeTruthy();
        });
        it('returns false if only one of them are undefined', () => {
            expect((0, __1.durationsAreEqual)(dur1, undefined)).toBeFalsy();
            expect((0, __1.durationsAreEqual)(undefined, dur1)).toBeFalsy();
        });
        it('returns false when not equal durations', () => {
            expect((0, __1.durationsAreEqual)(dur1, dur3)).toBeFalsy();
        });
    });
    describe('getDurationsDiff', () => {
        it('removes equal values', () => {
            const result = (0, durationUtils_1.getDurationsDiff)({ '2021-01-01': { hours: '1', minutes: '2' } }, { '2021-01-01': { hours: '1', minutes: '2' } });
            expect(Object.keys(result).length).toBe(0);
        });
        it('returns changed values', () => {
            const result = (0, durationUtils_1.getDurationsDiff)({ '2021-01-01': { hours: '1', minutes: '2' } }, { '2021-01-01': { hours: '2', minutes: '2' } });
            expect(Object.keys(result).length).toBe(1);
        });
        it('returns new values', () => {
            const result = (0, durationUtils_1.getDurationsDiff)({ '2021-01-01': { hours: '1', minutes: '2' } }, {});
            expect(Object.keys(result).length).toBe(1);
        });
    });
    describe('removeInvalidDurations', () => {
        it('removes duration which has duration with undefined hours and minutes', () => {
            const result = (0, durationUtils_1.getValidDurations)({
                '2021-02-05': { hours: undefined, minutes: undefined },
            });
            expect(Object.keys(result).length).toBe(0);
        });
        it('removes duration which has duration with invalid values in hours or minutes', () => {
            const result = (0, durationUtils_1.getValidDurations)({
                '2021-02-05': { hours: 'a', minutes: '0' },
            });
            expect(Object.keys(result).length).toBe(0);
        });
        it('does not remove duration which is valid', () => {
            expect(Object.keys((0, durationUtils_1.getValidDurations)({
                '2021-02-05': { hours: '0', minutes: '0' },
            })).length).toBe(1);
            expect(Object.keys((0, durationUtils_1.getValidDurations)({
                '2021-02-05': { hours: '', minutes: '0' },
            })).length).toBe(1);
            expect(Object.keys((0, durationUtils_1.getValidDurations)({
                '2021-02-05': { hours: '1', minutes: undefined },
            })).length).toBe(1);
        });
    });
    describe('summarizeDateDurationMap', () => {
        it('sums correctly', () => {
            const result = (0, durationUtils_1.summarizeDateDurationMap)({
                '2021-01-01': { hours: '1', minutes: '2' },
                '2021-01-02': { hours: '1', minutes: '2' },
                '2021-01-03': { hours: '1', minutes: '2' },
                '2021-01-04': { hours: '1', minutes: '2' },
                '2021-01-05': { hours: '1', minutes: '2' },
            });
            expect(result.hours).toBe(5);
            expect(result.minutes).toBe(10);
        });
    });
    describe('getDatesWithDurationLongerThanZero', () => {
        it('includes date with minutes', () => {
            expect((0, durationUtils_1.getDatesWithDurationLongerThanZero)({ '2021-01-01': { minutes: '2', hours: undefined } }).length).toBe(1);
        });
        it('includes date with hours', () => {
            expect((0, durationUtils_1.getDatesWithDurationLongerThanZero)({ '2021-01-01': { hours: '1', minutes: undefined } }).length).toBe(1);
        });
        it('excludes date with 0 minutes and 0 hours', () => {
            expect((0, durationUtils_1.getDatesWithDurationLongerThanZero)({ '2021-01-01': { hours: '0', minutes: '0' } }).length).toBe(0);
        });
        it('excludes date with invalid duration', () => {
            expect((0, durationUtils_1.getDatesWithDurationLongerThanZero)({ '2021-01-01': { hours: 'a', minutes: '0' } }).length).toBe(0);
            expect((0, durationUtils_1.getDatesWithDurationLongerThanZero)({ '2021-01-01': { hours: '0', minutes: 'a' } }).length).toBe(0);
            expect((0, durationUtils_1.getDatesWithDurationLongerThanZero)({
                '2021-01-01': { hours: undefined, minutes: undefined },
            }).length).toBe(0);
        });
    });
    describe('getDateDurationDiff', () => {
        it('removes equal values', () => {
            const result = (0, durationUtils_1.getDateDurationDiff)({ '2021-01-01': { hours: '1', minutes: '2' } }, { '2021-01-01': { hours: '1', minutes: '2' } });
            expect(Object.keys(result).length).toBe(0);
        });
        it('returns changed values', () => {
            const result = (0, durationUtils_1.getDateDurationDiff)({ '2021-01-01': { hours: '1', minutes: '2' } }, { '2021-01-01': { hours: '2', minutes: '2' } });
            expect(Object.keys(result).length).toBe(1);
        });
        it('returns new values', () => {
            const result = (0, durationUtils_1.getDateDurationDiff)({ '2021-01-01': { hours: '1', minutes: '2' } }, {});
            expect(Object.keys(result).length).toBe(1);
        });
    });
    describe('getDurationsInDateRange', () => {
        const data = {
            '2021-01-01': { hours: '1', minutes: '2' },
            '2021-01-02': { hours: '1', minutes: '2' },
            '2021-01-03': { hours: '1', minutes: '2' },
            '2021-01-04': { hours: '1', minutes: '2' },
            '2021-01-05': { hours: '1', minutes: '2' },
        };
        it('returns only dates within the date range', () => {
            const result = (0, durationUtils_1.getDurationsInDateRange)(data, {
                from: (0, dateUtils_1.ISODateToDate)('2021-01-02'),
                to: (0, dateUtils_1.ISODateToDate)('2021-01-03'),
            });
            expect(Object.keys(result).length).toBe(2);
            expect(result['2021-01-02']).toBeDefined();
            expect(result['2021-01-03']).toBeDefined();
        });
        it('returns only dates within the date range, and keeps invalid dates if removeInvalidDates === false', () => {
            const result = (0, durationUtils_1.getDurationsInDateRange)(data, {
                from: (0, dateUtils_1.ISODateToDate)('2021-01-02'),
                to: (0, dateUtils_1.ISODateToDate)('2021-01-03'),
            });
            expect(Object.keys(result).length).toBe(2);
            expect(result['2021-01-02']).toBeDefined();
            expect(result['2021-01-03']).toBeDefined();
        });
    });
    describe('ISODurationToDecimalDuration', () => {
        it('converts ISODuration to decimal duration', () => {
            expect((0, durationUtils_1.ISODurationToDecimalDuration)('PT1H30M')).toEqual(1.5);
        });
        it('returns undefined if ISODuration is not valid', () => {
            expect((0, durationUtils_1.ISODurationToDecimalDuration)('ABC')).toBeUndefined();
        });
    });
    describe('getPercentageOfISODuration', () => {
        it('keeps 100% of 1 hour 30 minutes the same', () => {
            expect((0, durationUtils_1.getPercentageOfISODuration)('PT1H30M', 100)).toEqual('PT1H30M');
        });
        it('returns half 45 minutes when calculating 50% of 1 hour 30 minutes', () => {
            expect((0, durationUtils_1.getPercentageOfISODuration)('PT1H30M', 50)).toEqual('PT0H45M');
        });
        it('returns undefined if ISODuration is not valid ISODuration', () => {
            expect((0, durationUtils_1.getPercentageOfISODuration)('P1XH30M', 50)).toBeUndefined();
        });
    });
    describe('getPercentageOfISODuration', () => {
        it('keeps 100% of 1 hour 30 minutes the same', () => {
            const { hours, minutes } = (0, durationUtils_1.getPercentageOfDuration)({ hours: '1', minutes: '30' }, 100);
            expect(hours).toEqual('1');
            expect(minutes).toEqual('30');
        });
        it('returns half 45 minutes when calculating 50% of 1 hour 30 minutes', () => {
            const { hours, minutes } = (0, durationUtils_1.getPercentageOfDuration)({ hours: '1', minutes: '30' }, 50);
            expect(hours).toEqual('0');
            expect(minutes).toEqual('45');
        });
    });
    describe('getPercentageOfDecimalDuration', () => {
        it('keeps 100% of 1 hour 30 minutes the same', () => {
            expect((0, durationUtils_1.getPercentageOfDecimalDuration)(1.5, 100)).toEqual(1.5);
        });
        it('returns 0.75 hours when calculating 50% of 1 hour 30 minutes', () => {
            expect((0, durationUtils_1.getPercentageOfDecimalDuration)(1.5, 50)).toEqual(0.75);
        });
    });
    describe('durationIsGreatherThanZero', () => {
        it('returnerer true når duration er over 0 minutter', () => {
            expect((0, durationUtils_1.durationIsGreatherThanZero)({ hours: '0', minutes: '1' })).toBeTruthy();
        });
        it('returnerer false når duration er undefined', () => {
            expect((0, durationUtils_1.durationIsGreatherThanZero)(undefined)).toBeFalsy();
        });
        it('returnerer false når duration er 0 minutter', () => {
            expect((0, durationUtils_1.durationIsGreatherThanZero)({ hours: '0', minutes: '0' })).toBeFalsy();
        });
    });
    describe('removeDatesFromDateDurationMap', () => {
        const keyDateBefore = '2020-01-02';
        const keyDate1 = '2020-01-03';
        const keyDate2 = '2020-01-04';
        const keyDate3 = '2020-01-05';
        const keyDateAfter = '2020-01-06';
        const dateMap = {
            [keyDate1]: { hours: '1', minutes: '0' },
            [keyDate2]: { hours: '1', minutes: '0' },
            [keyDate3]: { hours: '1', minutes: '0' },
        };
        it('keeps all dates if array of dates to be removed is empty', () => {
            const result = (0, durationUtils_1.removeDatesFromDateDurationMap)(dateMap, []);
            expect(Object.keys(result).length).toBe(3);
            expect(result[keyDate1]).toBeDefined();
            expect(result[keyDate2]).toBeDefined();
            expect(result[keyDate3]).toBeDefined();
        });
        it('keeps dates which are in array of dates to be removed', () => {
            const result = (0, durationUtils_1.removeDatesFromDateDurationMap)(dateMap, [(0, dateUtils_1.ISODateToDate)(keyDate1)]);
            expect(Object.keys(result).length).toBe(2);
            expect(result[keyDate1]).toBeUndefined();
            expect(result[keyDate2]).toBeDefined();
            expect(result[keyDate3]).toBeDefined();
        });
        it('keeps all dates id removeDates is only other dates', () => {
            const result = (0, durationUtils_1.removeDatesFromDateDurationMap)(dateMap, [
                (0, dateUtils_1.ISODateToDate)(keyDateBefore),
                (0, dateUtils_1.ISODateToDate)(keyDateAfter),
            ]);
            expect(Object.keys(result).length).toBe(3);
            expect(result[keyDate1]).toBeDefined();
            expect(result[keyDate2]).toBeDefined();
            expect(result[keyDate3]).toBeDefined();
        });
    });
    describe('getNumberDurationOrUndefined', () => {
        it('returns undefined if duration is not valid', () => {
            expect((0, durationUtils_1.getNumberDurationOrUndefined)()).toBeUndefined();
            expect((0, durationUtils_1.getNumberDurationOrUndefined)({ hours: 'a', minutes: 'b' })).toBeUndefined();
        });
        it('returns duration if duration is valid', () => {
            expect((0, durationUtils_1.getNumberDurationOrUndefined)({ hours: '1', minutes: '0' })).toBeDefined();
        });
    });
    describe('getDateRangeFromDateDurationMap', () => {
        it('gets correct date range from map with one date', () => {
            const result = (0, durationUtils_1.getDateRangeFromDateDurationMap)({ '2022-01-03': { hours: '1', minutes: '0' } });
            expect((0, dateUtils_1.dateToISODate)(result.from)).toEqual('2022-01-03');
            expect((0, dateUtils_1.dateToISODate)(result.to)).toEqual('2022-01-03');
        });
        it('gets correct date range from map with two dates', () => {
            const result = (0, durationUtils_1.getDateRangeFromDateDurationMap)({
                '2022-01-03': { hours: '1', minutes: '0' },
                '2022-01-04': { hours: '1', minutes: '0' },
            });
            expect((0, dateUtils_1.dateToISODate)(result.from)).toEqual('2022-01-03');
            expect((0, dateUtils_1.dateToISODate)(result.to)).toEqual('2022-01-04');
        });
        it('gets correct date range from map with multiple dates in wrong order', () => {
            const result = (0, durationUtils_1.getDateRangeFromDateDurationMap)({
                '2022-01-04': { hours: '1', minutes: '0' },
                '2022-01-05': { hours: '1', minutes: '0' },
                '2022-01-03': { hours: '1', minutes: '0' },
            });
            expect((0, dateUtils_1.dateToISODate)(result.from)).toEqual('2022-01-03');
            expect((0, dateUtils_1.dateToISODate)(result.to)).toEqual('2022-01-05');
        });
    });
});
