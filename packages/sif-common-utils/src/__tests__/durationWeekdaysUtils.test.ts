import { DurationWeekdays, getDurationForISOWeekdayNumber } from '..';
import { ISODateToDate } from '../dateUtils';
import { durationToISODuration, ISODurationToDuration } from '../durationUtils';
import {
    ensureCompleteDurationWeekdays,
    getAllWeekdaysWithoutDuration,
    getDateDurationMapFromDurationWeekdaysInDateRange,
    getWeekdaysWithDuration,
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
describe('workDurationUtils', () => {
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
        const durations: DurationWeekdays = {
            monday: { hours: '1', minutes: '0' },
            tuesday: { hours: '2', minutes: '0' },
            wednesday: { hours: '3', minutes: '0' },
            thursday: { hours: '4', minutes: '0' },
            friday: { hours: '5', minutes: '0' },
        };
        it('returns correctly for monday', () => {
            const result = getDurationForISOWeekdayNumber(durations, 1);
            expect(result).toBeDefined();
            expect(result?.hours).toEqual('1');
            expect(result?.minutes).toEqual('0');
        });
        it('returns correctly for tuesday', () => {
            const result = getDurationForISOWeekdayNumber(durations, 2);
            expect(result).toBeDefined();
            expect(result?.hours).toEqual('2');
            expect(result?.minutes).toEqual('0');
        });
        it('returns correctly for wednesday', () => {
            const result = getDurationForISOWeekdayNumber(durations, 3);
            expect(result).toBeDefined();
            expect(result?.hours).toEqual('3');
            expect(result?.minutes).toEqual('0');
        });
        it('returns correctly for thursday', () => {
            const result = getDurationForISOWeekdayNumber(durations, 4);
            expect(result).toBeDefined();
            expect(result?.hours).toEqual('4');
            expect(result?.minutes).toEqual('0');
        });
        it('returns correctly for friday', () => {
            const result = getDurationForISOWeekdayNumber(durations, 5);
            expect(result).toBeDefined();
            expect(result?.hours).toEqual('5');
            expect(result?.minutes).toEqual('0');
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
        it('returnerer ikke ukedag som har varighet === undefined ', () => {
            const weekdays = getWeekdaysWithDuration({ thursday: { hours: '1', minutes: '0' }, friday: undefined });
            expect(weekdays.length).toEqual(1);
            expect(weekdays[0]).toEqual(Weekday.thursday);
        });
        it('returnerer ikke ukedag som har varighet === 0 timer 0 minutter ', () => {
            const weekdays = getWeekdaysWithDuration({
                thursday: { hours: '1', minutes: '0' },
                friday: { hours: '0', minutes: '0' },
            });
            expect(weekdays.length).toEqual(1);
            expect(weekdays[0]).toEqual(Weekday.thursday);
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
        const duration: Duration = { hours: '2', minutes: '10' };
        const noDuration: Duration = { hours: '0', minutes: '0' };
        it('endrer ikke allerede komplett durationWeekdays', () => {
            const dw: DurationWeekdays = {
                [Weekday.monday]: { ...duration },
                [Weekday.tuesday]: { ...duration },
                [Weekday.wednesday]: { ...duration },
                [Weekday.thursday]: { ...duration },
                [Weekday.friday]: { ...duration },
            };
            const result = ensureCompleteDurationWeekdays(dw);
            expect(durationToISODuration(result[Weekday.monday]!)).toEqual(durationToISODuration(duration));
            expect(durationToISODuration(result[Weekday.tuesday]!)).toEqual(durationToISODuration(duration));
            expect(durationToISODuration(result[Weekday.wednesday]!)).toEqual(durationToISODuration(duration));
            expect(durationToISODuration(result[Weekday.thursday]!)).toEqual(durationToISODuration(duration));
            expect(durationToISODuration(result[Weekday.friday]!)).toEqual(durationToISODuration(duration));
        });
        it('fyller ut en ukomplett uke', () => {
            const dw: DurationWeekdays = {
                [Weekday.monday]: { ...duration },
                [Weekday.friday]: { ...duration },
            };
            const result = ensureCompleteDurationWeekdays(dw);
            expect(durationToISODuration(result[Weekday.monday]!)).toEqual(durationToISODuration(duration));
            expect(durationToISODuration(result[Weekday.tuesday]!)).toEqual(durationToISODuration(noDuration));
            expect(durationToISODuration(result[Weekday.wednesday]!)).toEqual(durationToISODuration(noDuration));
            expect(durationToISODuration(result[Weekday.thursday]!)).toEqual(durationToISODuration(noDuration));
            expect(durationToISODuration(result[Weekday.friday]!)).toEqual(durationToISODuration(duration));
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
