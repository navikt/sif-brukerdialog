import {
    durationAsNumberDuration,
    decimalDurationToDuration,
    decimalDurationToNumberDuration,
    numberDurationAsDuration,
    durationIsZero,
    durationsAreEqual,
    durationToDecimalDuration,
    durationToISODuration,
    ensureDuration,
    ensureNumberDuration,
    getPositiveNumberValue,
    ISODurationToMaybeDuration,
    ISODurationToNumberDuration,
    isValidDuration,
} from '../';
import { dateToISODate, ISODateToDate } from '../dateUtils';
import {
    durationIsGreatherThanZero,
    ensureValidHoursAndMinutes,
    getDateDurationDiff,
    getDateRangeFromDateDurationMap,
    getDatesWithDurationLongerThanZero,
    getDurationsDiff,
    getDurationsInDateRange,
    getNumberDurationOrUndefined,
    getPercentageOfDecimalDuration,
    getPercentageOfISODuration,
    getValidDurations,
    ISODurationToDecimalDuration,
    ISODurationToDuration,
    removeDatesFromDateDurationMap,
    summarizeDateDurationMap,
    summarizeDurations,
} from '../durationUtils';
import { DateDurationMap, NumberDuration } from '../types';

describe('durationUtils', () => {
    describe('getPositiveNumberValue', () => {
        it('returns number when value is a number', () => {
            expect(getPositiveNumberValue(0)).toEqual(0);
            expect(getPositiveNumberValue(20)).toEqual(20);
        });
        it('returns number when value is a valid number string', () => {
            expect(getPositiveNumberValue('0')).toEqual(0);
            expect(getPositiveNumberValue('20')).toEqual(20);
        });
        it('returns undefined when value is undefined', () => {
            expect(getPositiveNumberValue(undefined)).toBeUndefined();
        });
        it('returns undefined when value is empty string', () => {
            expect(getPositiveNumberValue('')).toBeUndefined();
        });
        it('returns invalidNumberValue when value is an invalid number string', () => {
            expect(getPositiveNumberValue('a')).toEqual('invalidNumberValue');
        });
        it('returns invalidNumberValue when value is a negative number', () => {
            expect(getPositiveNumberValue(-1)).toEqual('invalidNumberValue');
        });
        it('returns invalidNumberValue when value is another type than number, string or undefined', () => {
            expect(getPositiveNumberValue([])).toEqual('invalidNumberValue');
            expect(getPositiveNumberValue({})).toEqual('invalidNumberValue');
        });
    });
    describe('durationAsDateDuration', () => {
        it('converts correctly', () => {
            const result = numberDurationAsDuration({ hours: 1, minutes: 2 });
            expect(result.hours).toEqual('1');
            expect(result.minutes).toEqual('2');
        });
    });

    describe('DateDurationAsDuration', () => {
        it('returns duration correctly when Duration is valid', () => {
            const result = durationAsNumberDuration({ hours: '6', minutes: '30' });
            expect(result?.hours).toEqual(6);
            expect(result?.minutes).toEqual(30);
        });
    });

    describe('durationToISODuration', () => {
        it('converts {h: 0, m: 0} to ISODuration', () => {
            expect(durationToISODuration({ hours: 0, minutes: 0 })).toEqual('PT0H0M');
        });
        it('converts {h: undefined, m: 0} to ISODuration', () => {
            expect(durationToISODuration({ minutes: '0' })).toEqual('PT0H0M');
        });
        it('converts {h: 1, m: undefined} to ISODuration', () => {
            expect(durationToISODuration({ hours: '1' })).toEqual('PT1H0M');
        });
    });
    describe('ISODurationToNumberDuration', () => {
        it('converts PT0H0M correctly', () => {
            const result = ISODurationToNumberDuration('PT0H0M');
            expect(result?.hours).toEqual(0);
            expect(result?.minutes).toEqual(0);
        });
        it('converts PT10H50M correctly', () => {
            const result = ISODurationToNumberDuration('PT10H50M');
            expect(result?.hours).toEqual(10);
            expect(result?.minutes).toEqual(50);
        });
        it('maintains overflow of minutes (more than 59 minutes)', () => {
            const result = ISODurationToNumberDuration('PT10H65M');
            expect(result?.hours).toEqual(10);
            expect(result?.minutes).toEqual(65);
        });
        it('returns undefined when isoduration is invalid', () => {
            const result = ISODurationToNumberDuration('XYZ');
            expect(result).toBeUndefined();
        });
    });
    describe('durationToDecimalDuration', () => {
        describe('duration with numbers', () => {
            it('converts 1 hour correctly', () => {
                expect(durationToDecimalDuration({ hours: 1, minutes: 0 })).toEqual(1);
            });
            it('converts 1 hour 20correctly', () => {
                expect(durationToDecimalDuration({ hours: 1, minutes: 0 })).toEqual(1);
            });
            it('converts 1 hour and 30 minutes correctly', () => {
                expect(durationToDecimalDuration({ hours: 1, minutes: 30 })).toEqual(1.5);
            });
            it('converts 1 hour and 59 minutes correctly', () => {
                expect(durationToDecimalDuration({ hours: 1, minutes: 59 })).toEqual(1.9833);
            });
            it('handles overflow of minutes correctly', () => {
                expect(durationToDecimalDuration({ hours: 1, minutes: 120 })).toEqual(3);
            });
        });
        describe('Duration with strings', () => {
            it('converts 1 hour correctly', () => {
                expect(durationToDecimalDuration({ hours: '1', minutes: '0' })).toEqual(1);
            });
            it('converts 1 hour and 30 minutes correctly', () => {
                expect(durationToDecimalDuration({ hours: '1', minutes: '30' })).toEqual(1.5);
            });
            it('converts 1 hour and 59 minutes correctly', () => {
                expect(durationToDecimalDuration({ hours: '1', minutes: '59' })).toEqual(1.9833);
            });
        });
    });
    describe('decimalDurationToDuration', () => {
        it('converts 1 hour correctly', () => {
            const result = decimalDurationToNumberDuration(1);
            expect(result.hours).toEqual(1);
            expect(result.minutes).toEqual(0);
        });
        it('converts 1,5 hours correctly', () => {
            const result = decimalDurationToNumberDuration(1.5);
            expect(result.hours).toEqual(1);
            expect(result.minutes).toEqual(30);
        });
        it('converts 3,999 hours correctly', () => {
            const result = decimalDurationToNumberDuration(3.9999);
            expect(result.hours).toEqual(4);
            expect(result.minutes).toEqual(0);
        });
        it('converts 1,98 hours correctly', () => {
            const result = decimalDurationToNumberDuration(1.98);
            expect(result.hours).toEqual(1);
            expect(result.minutes).toEqual(59);
        });
    });
    describe('decimalDurationToDateDuration', () => {
        it('converts 1 hour correctly', () => {
            const result = decimalDurationToDuration(1);
            expect(result.hours).toEqual('1');
            expect(result.minutes).toEqual('0');
        });
        it('converts 1,5 hours correctly', () => {
            const result = decimalDurationToDuration(1.5);
            expect(result.hours).toEqual('1');
            expect(result.minutes).toEqual('30');
        });
        it('converts 1,98 hours correctly', () => {
            const result = decimalDurationToDuration(1.98);
            expect(result.hours).toEqual('1');
            expect(result.minutes).toEqual('59');
        });
    });
    describe('ISODurationToMaybeDuration', () => {
        it('returns undefined if duration is invalid', () => {
            expect(ISODurationToMaybeDuration('TABC')).toBeFalsy();
        });
        it('returns correct input duration when duration is valid', () => {
            expect(ISODurationToMaybeDuration('PT1H')?.hours).toEqual('1');
            expect(ISODurationToMaybeDuration('PT1M')?.minutes).toEqual('1');
        });
        it('returns undefined when hours and minutes not set', () => {
            expect(ISODurationToMaybeDuration('PT')).toBeUndefined();
        });
    });
    describe('isValidDuration', () => {
        it('returns false if duration is undefined', () => {
            expect(isValidDuration(undefined)).toBeFalsy();
        });
        it('returns false if duration is Duration with empty strings', () => {
            expect(isValidDuration({ hours: '', minutes: '' })).toBeFalsy();
        });
        it('returns false if duration is Duration with invalid values in hours and or minutes', () => {
            expect(isValidDuration({ hours: 'a', minutes: '' })).toBeFalsy();
            expect(isValidDuration({ hours: 'a', minutes: '0' })).toBeFalsy();
            expect(isValidDuration({ hours: '0', minutes: '-' })).toBeFalsy();
            expect(isValidDuration({ hours: '', minutes: '' })).toBeFalsy();
        });
        it('returns true if duration is Duration with value for minutes and/or hours', () => {
            expect(isValidDuration({ hours: '1', minutes: '' })).toBeTruthy();
            expect(isValidDuration({ hours: '', minutes: '1' })).toBeTruthy();
            expect(isValidDuration({ hours: '1', minutes: '1' })).toBeTruthy();
            expect(isValidDuration({ hours: '0', minutes: '0' })).toBeTruthy();
        });
        it('returns true on valid duration', () => {
            expect(isValidDuration({ hours: 0, minutes: 0 })).toBeTruthy();
        });
        it('returns true on valid duration - with hours and minutes', () => {
            expect(isValidDuration({ hours: 15, minutes: 59 })).toBeTruthy();
        });
        it('returns false if duration has minutes above 59', () => {
            expect(isValidDuration({ hours: 15, minutes: 60 })).toBeFalsy();
        });
    });

    describe('durationIsZero', () => {
        it('verifies no duration', () => {
            expect(durationIsZero({})).toBeTruthy();
        });
        it('fails if hours is more than zero', () => {
            expect(durationIsZero({ hours: '1' })).toBeFalsy();
        });
        it('fails if minutes is more than 0', () => {
            expect(durationIsZero({ minutes: '1' })).toBeFalsy();
        });
    });

    describe('ensureNumberDuration', () => {
        it('returns valid duration if hours or minutes are missing', () => {
            const duration = ensureNumberDuration({});
            expect(duration.hours).toEqual(0);
            expect(duration.minutes).toEqual(0);
        });
        it('returns 0 hours and 0 minutes if hours or minutes are invalid', () => {
            const duration = ensureNumberDuration({ hours: 'a', minutes: 'b' });
            expect(duration.hours).toEqual(0);
            expect(duration.minutes).toEqual(0);
        });
        it('keeps hours if hours are defined and minutes are undefined', () => {
            const duration = ensureNumberDuration({ hours: 1 });
            expect(duration.hours).toEqual(1);
            expect(duration.minutes).toEqual(0);
        });
        it('keeps minutes if hours are defined and minutes are undefined', () => {
            const duration = ensureNumberDuration({ minutes: 1 });
            expect(duration.hours).toEqual(0);
            expect(duration.minutes).toEqual(1);
        });
        it('keeps hours and minutes if both are defined', () => {
            const duration = ensureNumberDuration({ hours: 1, minutes: 2 });
            expect(duration.hours).toEqual(1);
            expect(duration.minutes).toEqual(2);
        });
        it('handles hours and minutes when they are strings', () => {
            const duration = ensureNumberDuration({ hours: '1', minutes: '2' });
            expect(duration.hours).toEqual(1);
            expect(duration.minutes).toEqual(2);
        });
    });
    describe('ensureDuration', () => {
        it('returns valid duration if hours or minutes are missing', () => {
            const duration = ensureDuration({});
            expect(duration.hours).toEqual('0');
            expect(duration.minutes).toEqual('0');
        });
        it('keeps hours if hours are defined and minutes are undefined', () => {
            const duration = ensureDuration({ hours: '1' });
            expect(duration.hours).toEqual('1');
            expect(duration.minutes).toEqual('0');
        });
        it('keeps minutes if hours are defined and minutes are undefined', () => {
            const duration = ensureDuration({ minutes: '1' });
            expect(duration.hours).toEqual('0');
            expect(duration.minutes).toEqual('1');
        });
        it('keeps hours and minutes if both are defined', () => {
            const duration = ensureDuration({ hours: 1, minutes: 2 });
            expect(duration.hours).toEqual('1');
            expect(duration.minutes).toEqual('2');
        });
    });
    describe('summarizeDurations', () => {
        const dur1 = ISODurationToNumberDuration('PT2H0M');
        const dur2 = ISODurationToNumberDuration('PT2H0M');
        const dur3 = ISODurationToNumberDuration('PT3H1M');
        it('sums durations in array correctly when all durations are valid', () => {
            const result = summarizeDurations([dur1, dur2, dur3]);
            expect(result.hours).toBe(7);
            expect(result.minutes).toBe(1);
        });
        it('sums durations in array correctly when it contains invalid durations', () => {
            const result = summarizeDurations([dur1, dur2, dur3, { hours: -1, minutes: -1 }]);
            expect(result.hours).toBe(7);
            expect(result.minutes).toBe(1);
        });
        it('sums durations in array correctly when it contains undefined durations', () => {
            const result = summarizeDurations([dur1, dur2, dur3, undefined, { hours: -1, minutes: -1 }]);
            expect(result.hours).toBe(7);
            expect(result.minutes).toBe(1);
        });
        it('sums durations in array correctly when minutes sums to 60', () => {
            const result = summarizeDurations([
                { hours: '1', minutes: '30' },
                { hours: '1', minutes: '30' },
            ]);
            expect(result.hours).toBe(3);
            expect(result.minutes).toBe(0);
        });
        it('sums durations in array correctly when minutes sums to 65', () => {
            const result = summarizeDurations([
                { hours: '1', minutes: '30' },
                { hours: '1', minutes: '35' },
            ]);
            expect(result.hours).toBe(3);
            expect(result.minutes).toBe(5);
        });
        it('sums durations in array correctly when minutes sums to 125', () => {
            const result = summarizeDurations([
                { hours: '0', minutes: '50' },
                { hours: '0', minutes: '50' },
                { hours: '0', minutes: '25' },
            ]);
            expect(result.hours).toBe(2);
            expect(result.minutes).toBe(5);
        });
    });
    describe('durationsAreEqual', () => {
        const dur1 = ISODurationToNumberDuration('PT2H0M');
        const dur2 = ISODurationToNumberDuration('PT2H0M');
        const dur3 = ISODurationToNumberDuration('PT3H0M');

        it('returns true if both are undefined', () => {
            expect(durationsAreEqual(undefined, undefined)).toBeTruthy();
        });

        it('returns true when equal durations', () => {
            expect(durationsAreEqual(dur1, dur2)).toBeTruthy();
        });

        it('returns false if only one of them are undefined', () => {
            expect(durationsAreEqual(dur1, undefined)).toBeFalsy();
            expect(durationsAreEqual(undefined, dur1)).toBeFalsy();
        });
        it('returns false when not equal durations', () => {
            expect(durationsAreEqual(dur1, dur3)).toBeFalsy();
        });
    });
    describe('getDurationsDiff', () => {
        it('removes equal values', () => {
            const result = getDurationsDiff(
                { '2021-01-01': { hours: '1', minutes: '2' } },
                { '2021-01-01': { hours: '1', minutes: '2' } },
            );
            expect(Object.keys(result).length).toBe(0);
        });
        it('returns changed values', () => {
            const result = getDurationsDiff(
                { '2021-01-01': { hours: '1', minutes: '2' } },
                { '2021-01-01': { hours: '2', minutes: '2' } },
            );
            expect(Object.keys(result).length).toBe(1);
        });
        it('returns new values', () => {
            const result = getDurationsDiff({ '2021-01-01': { hours: '1', minutes: '2' } }, {});
            expect(Object.keys(result).length).toBe(1);
        });
    });

    describe('removeInvalidDurations', () => {
        it('removes duration which has duration with undefined hours and minutes', () => {
            const result = getValidDurations({
                '2021-02-05': { hours: undefined, minutes: undefined },
            });
            expect(Object.keys(result).length).toBe(0);
        });
        it('removes duration which has duration with invalid values in hours or minutes', () => {
            const result = getValidDurations({
                '2021-02-05': { hours: 'a', minutes: '0' },
            });
            expect(Object.keys(result).length).toBe(0);
        });
        it('does not remove duration which is valid', () => {
            expect(
                Object.keys(
                    getValidDurations({
                        '2021-02-05': { hours: '0', minutes: '0' },
                    }),
                ).length,
            ).toBe(1);
            expect(
                Object.keys(
                    getValidDurations({
                        '2021-02-05': { hours: '', minutes: '0' },
                    }),
                ).length,
            ).toBe(1);
            expect(
                Object.keys(
                    getValidDurations({
                        '2021-02-05': { hours: '1', minutes: undefined },
                    }),
                ).length,
            ).toBe(1);
        });
    });

    describe('summarizeDateDurationMap', () => {
        it('sums correctly', () => {
            const result = summarizeDateDurationMap({
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
            expect(
                getDatesWithDurationLongerThanZero({ '2021-01-01': { minutes: '2', hours: undefined } }).length,
            ).toBe(1);
        });
        it('includes date with hours', () => {
            expect(
                getDatesWithDurationLongerThanZero({ '2021-01-01': { hours: '1', minutes: undefined } }).length,
            ).toBe(1);
        });
        it('excludes date with 0 minutes and 0 hours', () => {
            expect(getDatesWithDurationLongerThanZero({ '2021-01-01': { hours: '0', minutes: '0' } }).length).toBe(0);
        });
        it('excludes date with invalid duration', () => {
            expect(getDatesWithDurationLongerThanZero({ '2021-01-01': { hours: 'a', minutes: '0' } }).length).toBe(0);
            expect(getDatesWithDurationLongerThanZero({ '2021-01-01': { hours: '0', minutes: 'a' } }).length).toBe(0);
            expect(
                getDatesWithDurationLongerThanZero({
                    '2021-01-01': { hours: undefined, minutes: undefined },
                }).length,
            ).toBe(0);
        });
    });
    describe('getDateDurationDiff', () => {
        it('removes equal values', () => {
            const result = getDateDurationDiff(
                { '2021-01-01': { hours: '1', minutes: '2' } },
                { '2021-01-01': { hours: '1', minutes: '2' } },
            );
            expect(Object.keys(result).length).toBe(0);
        });
        it('returns changed values', () => {
            const result = getDateDurationDiff(
                { '2021-01-01': { hours: '1', minutes: '2' } },
                { '2021-01-01': { hours: '2', minutes: '2' } },
            );
            expect(Object.keys(result).length).toBe(1);
        });
        it('returns new values', () => {
            const result = getDateDurationDiff({ '2021-01-01': { hours: '1', minutes: '2' } }, {});
            expect(Object.keys(result).length).toBe(1);
        });
    });

    describe('getDurationsInDateRange', () => {
        const data: DateDurationMap = {
            '2021-01-01': { hours: '1', minutes: '2' },
            '2021-01-02': { hours: '1', minutes: '2' },
            '2021-01-03': { hours: '1', minutes: '2' },
            '2021-01-04': { hours: '1', minutes: '2' },
            '2021-01-05': { hours: '1', minutes: '2' },
        };

        it('returns only dates within the date range', () => {
            const result = getDurationsInDateRange(data, {
                from: ISODateToDate('2021-01-02'),
                to: ISODateToDate('2021-01-03'),
            });
            expect(Object.keys(result).length).toBe(2);
            expect(result['2021-01-02']).toBeDefined();
            expect(result['2021-01-03']).toBeDefined();
        });
        it('returns only dates within the date range, and keeps invalid dates if removeInvalidDates === false', () => {
            const result = getDurationsInDateRange(data, {
                from: ISODateToDate('2021-01-02'),
                to: ISODateToDate('2021-01-03'),
            });
            expect(Object.keys(result).length).toBe(2);
            expect(result['2021-01-02']).toBeDefined();
            expect(result['2021-01-03']).toBeDefined();
        });
    });
    describe('ISODurationToDecimalDuration', () => {
        it('converts ISODuration to decimal duration', () => {
            expect(ISODurationToDecimalDuration('PT1H30M')).toEqual(1.5);
        });
        it('returns undefined if ISODuration is not valid', () => {
            expect(ISODurationToDecimalDuration('ABC')).toBeUndefined();
        });
    });
    describe('getPercentageOfISODuration', () => {
        it('keeps 100% of 1 hour 30 minutes the same', () => {
            expect(getPercentageOfISODuration('PT1H30M', 100)).toEqual('PT1H30M');
        });
        it('returns half 45 minutes when calculating 50% of 1 hour 30 minutes', () => {
            expect(getPercentageOfISODuration('PT1H30M', 50)).toEqual('PT0H45M');
        });
        it('returns undefined if ISODuration is not valid ISODuration', () => {
            expect(getPercentageOfISODuration('P1XH30M', 50)).toBeUndefined();
        });
    });

    describe('getPercentageOfDecimalDuration', () => {
        it('keeps 100% of 1 hour 30 minutes the same', () => {
            expect(getPercentageOfDecimalDuration(1.5, 100)).toEqual(1.5);
        });
        it('returns 0.75 hours when calculating 50% of 1 hour 30 minutes', () => {
            expect(getPercentageOfDecimalDuration(1.5, 50)).toEqual(0.75);
        });
    });
    describe('durationIsGreatherThanZero', () => {
        it('returnerer true når duration er over 0 minutter', () => {
            expect(durationIsGreatherThanZero({ hours: '0', minutes: '1' })).toBeTruthy();
        });
        it('returnerer false når duration er undefined', () => {
            expect(durationIsGreatherThanZero(undefined)).toBeFalsy();
        });
        it('returnerer false når duration er 0 minutter', () => {
            expect(durationIsGreatherThanZero({ hours: '0', minutes: '0' })).toBeFalsy();
        });
    });
    describe('removeDatesFromDateDurationMap', () => {
        const keyDateBefore = '2020-01-02';
        const keyDate1 = '2020-01-03';
        const keyDate2 = '2020-01-04';
        const keyDate3 = '2020-01-05';
        const keyDateAfter = '2020-01-06';
        const dateMap: DateDurationMap = {
            [keyDate1]: { hours: '1', minutes: '0' },
            [keyDate2]: { hours: '1', minutes: '0' },
            [keyDate3]: { hours: '1', minutes: '0' },
        };
        it('keeps all dates if array of dates to be removed is empty', () => {
            const result = removeDatesFromDateDurationMap(dateMap, []);
            expect(Object.keys(result).length).toBe(3);
            expect(result[keyDate1]).toBeDefined();
            expect(result[keyDate2]).toBeDefined();
            expect(result[keyDate3]).toBeDefined();
        });
        it('keeps dates which are in array of dates to be removed', () => {
            const result = removeDatesFromDateDurationMap(dateMap, [ISODateToDate(keyDate1)]);
            expect(Object.keys(result).length).toBe(2);
            expect(result[keyDate1]).toBeUndefined();
            expect(result[keyDate2]).toBeDefined();
            expect(result[keyDate3]).toBeDefined();
        });
        it('keeps all dates id removeDates is only other dates', () => {
            const result = removeDatesFromDateDurationMap(dateMap, [
                ISODateToDate(keyDateBefore),
                ISODateToDate(keyDateAfter),
            ]);
            expect(Object.keys(result).length).toBe(3);
            expect(result[keyDate1]).toBeDefined();
            expect(result[keyDate2]).toBeDefined();
            expect(result[keyDate3]).toBeDefined();
        });
    });
    describe('getNumberDurationOrUndefined', () => {
        it('returns undefined if duration is not valid', () => {
            expect(getNumberDurationOrUndefined()).toBeUndefined();
            expect(getNumberDurationOrUndefined({ hours: 'a', minutes: 'b' })).toBeUndefined();
        });
        it('returns duration if duration is valid', () => {
            expect(getNumberDurationOrUndefined({ hours: '1', minutes: '0' })).toBeDefined();
        });
    });

    describe('getDateRangeFromDateDurationMap', () => {
        it('gets correct date range from map with one date', () => {
            const result = getDateRangeFromDateDurationMap({ '2022-01-03': { hours: '1', minutes: '0' } });
            expect(dateToISODate(result.from)).toEqual('2022-01-03');
            expect(dateToISODate(result.to)).toEqual('2022-01-03');
        });
        it('gets correct date range from map with two dates', () => {
            const result = getDateRangeFromDateDurationMap({
                '2022-01-03': { hours: '1', minutes: '0' },
                '2022-01-04': { hours: '1', minutes: '0' },
            });
            expect(dateToISODate(result.from)).toEqual('2022-01-03');
            expect(dateToISODate(result.to)).toEqual('2022-01-04');
        });
        it('gets correct date range from map with multiple dates in wrong order', () => {
            const result = getDateRangeFromDateDurationMap({
                '2022-01-04': { hours: '1', minutes: '0' },
                '2022-01-05': { hours: '1', minutes: '0' },
                '2022-01-03': { hours: '1', minutes: '0' },
            });
            expect(dateToISODate(result.from)).toEqual('2022-01-03');
            expect(dateToISODate(result.to)).toEqual('2022-01-05');
        });
    });
    describe('ISODurationToDuration', () => {
        it('Fjerner sekunder fra duration', () => {
            const result = ISODurationToDuration('PT5H20M10S');
            expect(result.hours).toEqual('5');
            expect(result.minutes).toEqual('20');
        });
    });
    describe('ensureValidHoursAndMinutes', () => {
        it('corrects hours and minutes when minutes are 60', () => {
            const duration: NumberDuration = { hours: 2, minutes: 60 };
            const { hours, minutes } = ensureValidHoursAndMinutes(duration);
            expect(hours).toEqual(duration.hours + 1);
            expect(minutes).toEqual(0);
        });
        it('does not correct hours and minutes when minutes are less than 60', () => {
            const duration: NumberDuration = { hours: 2, minutes: 59 };
            const { hours, minutes } = ensureValidHoursAndMinutes(duration);
            expect(hours).toEqual(duration.hours);
            expect(minutes).toEqual(duration.minutes);
        });
    });
});
