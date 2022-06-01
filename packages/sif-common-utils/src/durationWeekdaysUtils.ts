import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import { Duration, DurationWeekdays, getDatesInDateRange, NumberDuration, summarizeDurations } from './';
import { dateToISODate } from './dateUtils';
import {
    decimalDurationToDuration,
    durationIsGreatherThanZero,
    durationToDecimalDuration,
    durationToISODuration,
    ensureDuration,
    getNumberDurationOrUndefined,
    getPercentageOfDuration,
    isValidDuration,
} from './durationUtils';
import { DateDurationMap, DateRange, ISODurationWeekdays, Weekday } from './types';

dayjs.extend(isoWeek);

export const getISOWeekdaysFromDurationWeekdays = (durationWeekdays: DurationWeekdays): number[] => {
    const isoWeekdays: number[] = [];
    if (durationWeekdays.monday) {
        isoWeekdays.push(1);
    }
    if (durationWeekdays.tuesday) {
        isoWeekdays.push(2);
    }
    if (durationWeekdays.wednesday) {
        isoWeekdays.push(3);
    }
    if (durationWeekdays.thursday) {
        isoWeekdays.push(4);
    }
    if (durationWeekdays.friday) {
        isoWeekdays.push(5);
    }
    return isoWeekdays;
};

export const summarizeDurationInDurationWeekdays = (weekdays: DurationWeekdays): NumberDuration => {
    return summarizeDurations([
        weekdays.monday,
        weekdays.tuesday,
        weekdays.wednesday,
        weekdays.thursday,
        weekdays.friday,
    ]);
};

export const getDurationForISOWeekdayNumber = (
    durationWeekdays: DurationWeekdays,
    isoWeekday: number
): Duration | undefined => {
    switch (isoWeekday) {
        case 1:
            return durationWeekdays.monday;
        case 2:
            return durationWeekdays.tuesday;
        case 3:
            return durationWeekdays.wednesday;
        case 4:
            return durationWeekdays.thursday;
        case 5:
            return durationWeekdays.friday;
    }
    return undefined;
};

export const getNumberDurationForWeekday = (
    fasteDager: DurationWeekdays,
    weekday: Weekday
): NumberDuration | undefined => {
    switch (weekday) {
        case 'monday':
            return getNumberDurationOrUndefined(fasteDager.monday);
        case 'tuesday':
            return getNumberDurationOrUndefined(fasteDager.tuesday);
        case 'wednesday':
            return getNumberDurationOrUndefined(fasteDager.wednesday);
        case 'thursday':
            return getNumberDurationOrUndefined(fasteDager.thursday);
        case 'friday':
            return getNumberDurationOrUndefined(fasteDager.friday);
        default:
            return undefined;
    }
};

export const durationWeekdaysToISODurationWeekdays = ({
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
}: DurationWeekdays): ISODurationWeekdays => {
    return {
        monday: monday ? durationToISODuration(monday) : undefined,
        tuesday: tuesday ? durationToISODuration(tuesday) : undefined,
        wednesday: wednesday ? durationToISODuration(wednesday) : undefined,
        thursday: thursday ? durationToISODuration(thursday) : undefined,
        friday: friday ? durationToISODuration(friday) : undefined,
    };
};

const allWeekdays: Weekday[] = [Weekday.monday, Weekday.tuesday, Weekday.wednesday, Weekday.thursday, Weekday.friday];

export const getPercentageOfDurationWeekdays = (percentage: number, weekdays: DurationWeekdays): DurationWeekdays => ({
    monday: weekdays.monday ? getPercentageOfDuration(weekdays.monday, percentage) : undefined,
    tuesday: weekdays.tuesday ? getPercentageOfDuration(weekdays.tuesday, percentage) : undefined,
    wednesday: weekdays.wednesday ? getPercentageOfDuration(weekdays.wednesday, percentage) : undefined,
    thursday: weekdays.thursday ? getPercentageOfDuration(weekdays.thursday, percentage) : undefined,
    friday: weekdays.friday ? getPercentageOfDuration(weekdays.friday, percentage) : undefined,
});

export const durationWeekdaysFromHoursPerWeek = (timer: number): DurationWeekdays => {
    const tidPerDag = decimalDurationToDuration(timer / 5);
    return {
        monday: tidPerDag,
        tuesday: tidPerDag,
        wednesday: tidPerDag,
        thursday: tidPerDag,
        friday: tidPerDag,
    };
};

export const getWeekdaysWithDuration = (durationWeekdays: DurationWeekdays): Weekday[] => {
    return Object.keys(durationWeekdays)
        .filter((key) => {
            const duration = durationWeekdays[key as Weekday];
            return duration ? durationToDecimalDuration(duration) > 0 : false;
        })
        .map((key) => key as Weekday);
};

export const ensureCompleteDurationWeekdays = (durationWeekdays: DurationWeekdays): DurationWeekdays => {
    return {
        [Weekday.monday]: ensureDuration(durationWeekdays[Weekday.monday] || {}),
        [Weekday.tuesday]: ensureDuration(durationWeekdays[Weekday.tuesday] || {}),
        [Weekday.wednesday]: ensureDuration(durationWeekdays[Weekday.wednesday] || {}),
        [Weekday.thursday]: ensureDuration(durationWeekdays[Weekday.thursday] || {}),
        [Weekday.friday]: ensureDuration(durationWeekdays[Weekday.friday] || {}),
    };
};

/**
 *
 * @param durationWeekdays
 * @returns alle dager i uken som er undefined eller har 0 i varighet
 */
export const getAllWeekdaysWithoutDuration = (durationWeekdays: DurationWeekdays): Weekday[] => {
    const days: Weekday[] = [];
    allWeekdays.forEach((weekday) => {
        if (durationIsGreatherThanZero(durationWeekdays[weekday]) === false) {
            days.push(weekday);
        }
    });
    return days;
};

export const hasWeekdaysWithoutDuration = (durationWeekdays: DurationWeekdays): boolean =>
    allWeekdays.some((weekday) => durationIsGreatherThanZero(durationWeekdays[weekday]) === false);

export const removeDurationWeekdaysNotInDurationWeekdays = (
    weekdays1: DurationWeekdays,
    weekdays2: DurationWeekdays
): DurationWeekdays => {
    return {
        [Weekday.monday]: weekdays2.monday ? weekdays1.monday : undefined,
        [Weekday.tuesday]: weekdays2.tuesday ? weekdays1.tuesday : undefined,
        [Weekday.wednesday]: weekdays2.wednesday ? weekdays1.wednesday : undefined,
        [Weekday.thursday]: weekdays2.thursday ? weekdays1.thursday : undefined,
        [Weekday.friday]: weekdays2.friday ? weekdays1.friday : undefined,
    };
};

const getDurationOrUndefinedIfZeroDuration = (duration: Duration | undefined): Duration | undefined => {
    if (duration === undefined) {
        return undefined;
    }
    if (isValidDuration(duration) === false) {
        return duration;
    }
    return durationIsGreatherThanZero(duration) ? duration : undefined;
};

export const removeDurationWeekdaysWithNoDuration = ({
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
}: DurationWeekdays): DurationWeekdays => {
    return {
        [Weekday.monday]: getDurationOrUndefinedIfZeroDuration(monday),
        [Weekday.tuesday]: getDurationOrUndefinedIfZeroDuration(tuesday),
        [Weekday.wednesday]: getDurationOrUndefinedIfZeroDuration(wednesday),
        [Weekday.thursday]: getDurationOrUndefinedIfZeroDuration(thursday),
        [Weekday.friday]: getDurationOrUndefinedIfZeroDuration(friday),
    };
};

/**
 * Lage DateDurationMap ut fra periode og DurationWeekdays
 * @param dateRange
 * @param durationWeekdays
 * @returns dateDurationMap for alle datoer i perioden med durations fra @durationWeekdays
 */
export const getDateDurationMapFromDurationWeekdaysInDateRange = (
    dateRange: DateRange,
    durationWeekdays: DurationWeekdays
): DateDurationMap => {
    const resultMap: DateDurationMap = {};
    const weekdays = getISOWeekdaysFromDurationWeekdays(durationWeekdays);
    getDatesInDateRange(dateRange)
        .filter((d) => weekdays.includes(dayjs(d).isoWeekday()))
        .forEach((d) => {
            const isoDate = dateToISODate(d);
            const duration = getDurationForISOWeekdayNumber(durationWeekdays, dayjs(d).isoWeekday());
            if (duration) {
                resultMap[isoDate] = duration;
            }
        });

    return resultMap;
};
