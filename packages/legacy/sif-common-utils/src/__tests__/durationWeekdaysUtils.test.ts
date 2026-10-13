import { DurationWeekdays, getDurationForISOWeekdayNumber } from '..';
import { ISODateToDate } from '../dateUtils';
import { durationToISODuration, ISODurationToDuration } from '../durationUtils';
import {
    durationWeekdaysFromHoursPerWeek,
    durationWeekdaysToISODurationWeekdays,
    ensureCompleteDurationWeekdays,
    getAllWeekdaysWithoutDuration,
    getDateDurationMapFromDurationWeekdaysInDateRange,
    getDurationOrUndefinedIfZeroDuration,
    getISOWeekdaysFromDurationWeekdays,
    getNumberDurationForWeekday,
    getPercentageOfDurationWeekdays,
    getWeekdaysWithDuration,
    hasWeekdaysWithoutDuration,
    removeDurationWeekdaysNotInDurationWeekdays,
    removeDurationWeekdaysWithNoDuration,
    summarizeDurationInDurationWeekdays,
} from '../durationWeekdaysUtils';
import { DateRange, Duration, Weekday } from '../types';

const duration: Duration = {
    hours: '1',
    minutes: '0',
};

const fullWeek: DurationWeekdays = {
    monday: { ...duration },
    tuesday: { ...duration },
    wednesday: { ...duration },
    thursday: { ...duration },
    friday: { ...duration },
};

const fullWeek2: DurationWeekdays = {
    monday: { hours: '1', minutes: '0' },
    tuesday: { hours: '2', minutes: '0' },
    wednesday: { hours: '3', minutes: '0' },
    thursday: { hours: '4', minutes: '0' },
    friday: { hours: '5', minutes: '0' },
};

describe('workDurationUtils', () => {
    describe('getISOWeekdaysFromDurationWeekdays', () => {
        it('includes all weekdays', () => {
            const result = getISOWeekdaysFromDurationWeekdays({
                monday: { hours: '1', minutes: '0' },
                tuesday: { hours: '1', minutes: '0' },
                wednesday: { hours: '1', minutes: '0' },
                thursday: { hours: '1', minutes: '0' },
                friday: { hours: '1', minutes: '0' },
            });
            expect(result).toHaveLength(5);
            expect(result[0]).toEqual(1);
            expect(result[1]).toEqual(2);
            expect(result[2]).toEqual(3);
            expect(result[3]).toEqual(4);
            expect(result[4]).toEqual(5);
        });
        it('excludes days with undefined duration', () => {
            expect(
                getISOWeekdaysFromDurationWeekdays({
                    monday: undefined,
                }),
            ).toHaveLength(0);
        });
    });
    describe('summarizeDurationInDurationWeekdays', () => {
        it('sum hours correctly', () => {
            const sum = summarizeDurationInDurationWeekdays({
                monday: { hours: '1', minutes: '0' },
                tuesday: { hours: '1', minutes: '0' },
                wednesday: { hours: '1', minutes: '0' },
                thursday: { hours: '1', minutes: '0' },
                friday: { hours: '1', minutes: '0' },
            });
            expect(sum.hours).toBe(5);
            expect(sum.minutes).toBe(0);
        });
        it('sum hours and minutes correctly', () => {
            const sum = summarizeDurationInDurationWeekdays({
                monday: { hours: '1', minutes: '5' },
                tuesday: { hours: '1', minutes: '5' },
                wednesday: { hours: '1', minutes: '5' },
                thursday: { hours: '1', minutes: '5' },
                friday: { hours: '1', minutes: '10' },
            });
            expect(sum.hours).toBe(5);
            expect(sum.minutes).toBe(30);
        });
    });
    describe('getDurationForISOWeekdayNumber', () => {
        it('returns correctly for monday', () => {
            const result = getDurationForISOWeekdayNumber(fullWeek2, 1);
            expect(result).toBeDefined();
            expect(result?.hours).toEqual('1');
            expect(result?.minutes).toEqual('0');
        });
        it('returns correctly for tuesday', () => {
            const result = getDurationForISOWeekdayNumber(fullWeek2, 2);
            expect(result).toBeDefined();
            expect(result?.hours).toEqual('2');
            expect(result?.minutes).toEqual('0');
        });
        it('returns correctly for wednesday', () => {
            const result = getDurationForISOWeekdayNumber(fullWeek2, 3);
            expect(result).toBeDefined();
            expect(result?.hours).toEqual('3');
            expect(result?.minutes).toEqual('0');
        });
        it('returns correctly for thursday', () => {
            const result = getDurationForISOWeekdayNumber(fullWeek2, 4);
            expect(result).toBeDefined();
            expect(result?.hours).toEqual('4');
            expect(result?.minutes).toEqual('0');
        });
        it('returns correctly for friday', () => {
            const result = getDurationForISOWeekdayNumber(fullWeek2, 5);
            expect(result).toBeDefined();
            expect(result?.hours).toEqual('5');
            expect(result?.minutes).toEqual('0');
        });
        it('returns undefined if isoWeekday is not mon-fri', () => {
            const result = getDurationForISOWeekdayNumber(fullWeek2, 6);
            expect(result).toBeUndefined();
        });
    });

    describe('getWeekdaysWithDuration', () => {
        it('returnerer alle ukedager når alle ukedager har varighet', () => {
            const weekdays = getWeekdaysWithDuration(fullWeek);
            expect(weekdays.length).toEqual(5);
            expect(weekdays[0]).toEqual(Weekday.monday);
            expect(weekdays[1]).toEqual(Weekday.tuesday);
            expect(weekdays[2]).toEqual(Weekday.wednesday);
            expect(weekdays[3]).toEqual(Weekday.thursday);
            expect(weekdays[4]).toEqual(Weekday.friday);
        });
        it('returnerer ikke ukedag som har varighet === undefined', () => {
            const weekdays = getWeekdaysWithDuration({ thursday: { hours: '1', minutes: '0' }, friday: undefined });
            expect(weekdays.length).toEqual(1);
            expect(weekdays[0]).toEqual(Weekday.thursday);
        });
        it('returnerer ikke ukedag som har varighet === 0 timer 0 minutter', () => {
            const weekdays = getWeekdaysWithDuration({
                thursday: { hours: '1', minutes: '0' },
                friday: { hours: '0', minutes: '0' },
            });
            expect(weekdays.length).toEqual(1);
            expect(weekdays[0]).toEqual(Weekday.thursday);
        });
    });

    describe('getNumberDurationForWeekday', () => {
        it('returns duration for monday', () => {
            expect(getNumberDurationForWeekday(fullWeek2, Weekday.monday)).toEqual({ hours: 1, minutes: 0 });
            expect(getNumberDurationForWeekday(fullWeek2, Weekday.tuesday)).toEqual({ hours: 2, minutes: 0 });
            expect(getNumberDurationForWeekday(fullWeek2, Weekday.wednesday)).toEqual({ hours: 3, minutes: 0 });
            expect(getNumberDurationForWeekday(fullWeek2, Weekday.thursday)).toEqual({ hours: 4, minutes: 0 });
            expect(getNumberDurationForWeekday(fullWeek2, Weekday.friday)).toEqual({ hours: 5, minutes: 0 });
            expect(getNumberDurationForWeekday(fullWeek2, 6 as any)).toBeUndefined();
        });
    });

    describe('durationWeekdaysToISODurationWeekdays', () => {
        it('converts returns all defined durations', () => {
            const result = durationWeekdaysToISODurationWeekdays(fullWeek2);
            expect(result).toBeDefined();
            expect(result.monday).toEqual('PT1H0M');
            expect(result.tuesday).toEqual('PT2H0M');
            expect(result.wednesday).toEqual('PT3H0M');
            expect(result.thursday).toEqual('PT4H0M');
            expect(result.friday).toEqual('PT5H0M');
        });
        it('excludes days with no duration', () => {
            const result = durationWeekdaysToISODurationWeekdays({});
            expect(result).toBeDefined();
            expect(result.monday).toBeUndefined();
            expect(result.tuesday).toBeUndefined();
            expect(result.wednesday).toBeUndefined();
            expect(result.thursday).toBeUndefined();
            expect(result.friday).toBeUndefined();
        });
    });

    describe('getPercentageOfDurationWeekdays', () => {
        it('gets percentage for every weekday', () => {
            const result = getPercentageOfDurationWeekdays(50, fullWeek);
            expect(result.monday).toEqual({ hours: '0', minutes: '30' });
            expect(result.tuesday).toEqual({ hours: '0', minutes: '30' });
            expect(result.wednesday).toEqual({ hours: '0', minutes: '30' });
            expect(result.thursday).toEqual({ hours: '0', minutes: '30' });
            expect(result.friday).toEqual({ hours: '0', minutes: '30' });
        });
        it('gets excludes days with no duration weekday', () => {
            const result = getPercentageOfDurationWeekdays(50, {});
            expect(result.monday).toBeUndefined();
            expect(result.tuesday).toBeUndefined();
            expect(result.wednesday).toBeUndefined();
            expect(result.thursday).toBeUndefined();
            expect(result.friday).toBeUndefined();
        });
    });

    describe('durationWeekdaysFromHoursPerWeek', () => {
        it('divides hours with 5 and returns correct duration', () => {
            const result = durationWeekdaysFromHoursPerWeek(30);
            expect(result.monday).toEqual({ hours: '6', minutes: '0' });
            expect(result.tuesday).toEqual({ hours: '6', minutes: '0' });
            expect(result.wednesday).toEqual({ hours: '6', minutes: '0' });
            expect(result.thursday).toEqual({ hours: '6', minutes: '0' });
            expect(result.friday).toEqual({ hours: '6', minutes: '0' });
        });
    });

    describe('hasWeekdaysWithoutDuration', () => {
        it('returns true if a day has no duration', () => {
            expect(hasWeekdaysWithoutDuration({ ...fullWeek2, monday: undefined })).toBeTruthy();
        });
        it('returns false if all days have duration', () => {
            expect(hasWeekdaysWithoutDuration({ ...fullWeek2 })).toBeFalsy();
        });
    });

    describe('removeDurationWeekdaysNotInDurationWeekdays', () => {
        it('removes days from durationWeekdays1 not present in durationWeekdays2', () => {
            const result = removeDurationWeekdaysNotInDurationWeekdays(fullWeek, { ...fullWeek, monday: undefined });
            expect(result.monday).toBeUndefined();
            expect(result.tuesday).toBeDefined();
            expect(result.wednesday).toBeDefined();
            expect(result.thursday).toBeDefined();
            expect(result.friday).toBeDefined();
        });
        it('removes all days from durationWeekdays1 when durationWeekdays2 is empty', () => {
            const result = removeDurationWeekdaysNotInDurationWeekdays(fullWeek, {});
            expect(result.monday).toBeUndefined();
            expect(result.tuesday).toBeUndefined();
            expect(result.wednesday).toBeUndefined();
            expect(result.thursday).toBeUndefined();
            expect(result.friday).toBeUndefined();
        });
        it('keeps all days from durationWeekdays1 when durationWeekdays2 is full', () => {
            const result = removeDurationWeekdaysNotInDurationWeekdays(fullWeek, fullWeek2);
            expect(result.monday).toBeDefined();
            expect(result.tuesday).toBeDefined();
            expect(result.wednesday).toBeDefined();
            expect(result.thursday).toBeDefined();
            expect(result.friday).toBeDefined();
        });
    });

    describe('getDurationOrUndefinedIfZeroDuration', () => {
        it('returns undefined if duration is undefined', () => {
            expect(getDurationOrUndefinedIfZeroDuration(undefined)).toBeUndefined();
        });
        it('returns undefined if duration is zero', () => {
            expect(getDurationOrUndefinedIfZeroDuration({ hours: '0', minutes: '0' })).toBeUndefined();
        });
        it('returns duration param if duration is invalid', () => {
            expect(getDurationOrUndefinedIfZeroDuration({ a: 'b' } as any)).toEqual({ a: 'b' });
        });
        it('returns duration if duration is more than zero', () => {
            expect(getDurationOrUndefinedIfZeroDuration({ hours: '0', minutes: '1' })).toBeDefined();
        });
    });

    describe('removeDurationWeekdaysWithNoDuration', () => {
        it('removes all weekdays with zero duration', () => {
            const result = removeDurationWeekdaysWithNoDuration({ ...fullWeek, tuesday: { hours: '0', minutes: '0' } });
            expect(result.monday).toBeDefined();
            expect(result.tuesday).toBeUndefined();
            expect(result.wednesday).toBeDefined();
            expect(result.thursday).toBeDefined();
            expect(result.friday).toBeDefined();
        });
    });

    describe('getAllWeekdaysWithoutDuration', () => {
        it('returnerer ingen ukedager når alle ukedager har varighet', () => {
            const weekdays = getAllWeekdaysWithoutDuration(fullWeek);
            expect(weekdays.length).toEqual(0);
        });
        it('returnerer alle ukedager når ingen ukedager har varighet', () => {
            const weekdays = getAllWeekdaysWithoutDuration({});
            expect(weekdays.length).toEqual(5);
            expect(weekdays[0]).toEqual(Weekday.monday);
            expect(weekdays[1]).toEqual(Weekday.tuesday);
            expect(weekdays[2]).toEqual(Weekday.wednesday);
            expect(weekdays[3]).toEqual(Weekday.thursday);
            expect(weekdays[4]).toEqual(Weekday.friday);
        });
        it('returnerer ukedag som har varighet === undefined, eller som ikke er definert i weekdays', () => {
            const weekdays = getAllWeekdaysWithoutDuration({ friday: { hours: '1', minutes: '0' } });
            expect(weekdays.length).toEqual(4);
            expect(weekdays[3]).toEqual(Weekday.thursday);
        });
        it('returnerer alle ukedager som har varighet === 0 timer 0 minutter, eller som ikke er definert i weekdays', () => {
            const weekdays = getAllWeekdaysWithoutDuration({
                monday: { hours: '1', minutes: '0' },
                tuesday: { hours: '0', minutes: '0' },
                thursday: { hours: '1', minutes: '0' },
                friday: { hours: '0', minutes: '0' },
            });
            expect(weekdays.length).toEqual(3);
            expect(weekdays[0]).toEqual(Weekday.tuesday);
            expect(weekdays[1]).toEqual(Weekday.wednesday);
            expect(weekdays[2]).toEqual(Weekday.friday);
        });
    });
    describe('getDateDurationMapFromDurationWeekdaysInDateRange', () => {
        const periode: DateRange = {
            from: ISODateToDate('2022-01-03'),
            to: ISODateToDate('2022-01-12'),
        };
        const durationWeekdays: DurationWeekdays = {
            monday: ISODurationToDuration('PT1H0M'),
            tuesday: ISODurationToDuration('PT2H0M'),
            thursday: ISODurationToDuration('PT3H0M'),
            friday: ISODurationToDuration('PT4H0M'),
        };
        it('returnerer alle dager riktig', () => {
            const result = getDateDurationMapFromDurationWeekdaysInDateRange(periode, durationWeekdays);
            expect(Object.keys(result).length).toEqual(6);
            expect(durationToISODuration(result['2022-01-03'])).toEqual('PT1H0M');
            expect(durationToISODuration(result['2022-01-04'])).toEqual('PT2H0M');
            expect(result['2022-01-05']).toBeUndefined();
            expect(durationToISODuration(result['2022-01-06'])).toEqual('PT3H0M');
            expect(durationToISODuration(result['2022-01-07'])).toEqual('PT4H0M');
            expect(durationToISODuration(result['2022-01-10'])).toEqual('PT1H0M');
            expect(durationToISODuration(result['2022-01-11'])).toEqual('PT2H0M');
            expect(result['2022-01-12']).toBeUndefined();
        });
    });
    describe('ensureCompleteDurationWeekdays', () => {
        const durationLocal: Duration = { hours: '2', minutes: '10' };
        const noDuration: Duration = { hours: '0', minutes: '0' };
        it('endrer ikke allerede komplett durationWeekdays', () => {
            const dw: DurationWeekdays = {
                [Weekday.monday]: { ...durationLocal },
                [Weekday.tuesday]: { ...durationLocal },
                [Weekday.wednesday]: { ...durationLocal },
                [Weekday.thursday]: { ...durationLocal },
                [Weekday.friday]: { ...durationLocal },
            };
            const result = ensureCompleteDurationWeekdays(dw);
            expect(durationToISODuration(result[Weekday.monday]!)).toEqual(durationToISODuration(durationLocal));
            expect(durationToISODuration(result[Weekday.tuesday]!)).toEqual(durationToISODuration(durationLocal));
            expect(durationToISODuration(result[Weekday.wednesday]!)).toEqual(durationToISODuration(durationLocal));
            expect(durationToISODuration(result[Weekday.thursday]!)).toEqual(durationToISODuration(durationLocal));
            expect(durationToISODuration(result[Weekday.friday]!)).toEqual(durationToISODuration(durationLocal));
        });
        it('fyller ut en ukomplett uke', () => {
            const dw: DurationWeekdays = {
                [Weekday.monday]: { ...durationLocal },
                [Weekday.friday]: { ...durationLocal },
            };
            const result = ensureCompleteDurationWeekdays(dw);
            expect(durationToISODuration(result[Weekday.monday]!)).toEqual(durationToISODuration(durationLocal));
            expect(durationToISODuration(result[Weekday.tuesday]!)).toEqual(durationToISODuration(noDuration));
            expect(durationToISODuration(result[Weekday.wednesday]!)).toEqual(durationToISODuration(noDuration));
            expect(durationToISODuration(result[Weekday.thursday]!)).toEqual(durationToISODuration(noDuration));
            expect(durationToISODuration(result[Weekday.friday]!)).toEqual(durationToISODuration(durationLocal));
        });
        it('fyller ut en ukomplette dager', () => {
            const dw: DurationWeekdays = {
                [Weekday.tuesday]: { hours: '20' } as any,
                [Weekday.wednesday]: { minutes: '10' } as any,
            };
            const result = ensureCompleteDurationWeekdays(dw);
            expect(result[Weekday.tuesday]!.hours).toEqual('20');
            expect(result[Weekday.tuesday]!.minutes).toEqual('0');
            expect(result[Weekday.wednesday]!.hours).toEqual('0');
            expect(result[Weekday.wednesday]!.minutes).toEqual('10');
        });
    });
});
