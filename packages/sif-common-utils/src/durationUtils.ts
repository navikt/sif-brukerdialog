import { parse } from 'iso8601-duration';
import { trim } from 'lodash';
import {
    NumberDuration,
    ISODuration,
    DateDurationMap,
    Duration,
    isDateInDateRange,
    ISODateToDate,
    DateRange,
    ISODate,
    InputDateDurationMap,
} from '.';
import { isDateInDates, sortDateArray } from './dateUtils';

export const getPositiveNumberValue = (value: any): number | 'invalidNumberValue' | undefined => {
    if (typeof value === 'number' && value >= 0) {
        return value;
    }
    if (typeof value === 'string') {
        if (trim(value).length === 0) {
            return undefined;
        }
        const numberValue = parseInt(value, 10);
        if (!isNaN(numberValue) && numberValue >= 0) {
            return numberValue;
        }
    }
    if (typeof value === 'undefined') {
        return undefined;
    }
    return 'invalidNumberValue';
};

export const numberDurationAsDuration = (duration: NumberDuration | Partial<Duration>): Duration => {
    const d = ensureNumberDuration(duration);
    return {
        hours: `${d.hours}`,
        minutes: `${d.minutes}`,
    };
};

export const durationAsNumberDuration = (duration: Partial<Duration>): NumberDuration => ensureNumberDuration(duration);

export const ensureNumberDuration = (duration: Partial<Duration> | Partial<NumberDuration>): NumberDuration => {
    const hours = getPositiveNumberValue(duration.hours);
    const minutes = getPositiveNumberValue(duration.minutes);

    if (hours === 'invalidNumberValue' || minutes === 'invalidNumberValue') {
        return { hours: 0, minutes: 0 };
    }
    return {
        hours: hours || 0,
        minutes: minutes || 0,
    };
};

export const ensureDuration = (duration: Partial<Duration> | NumberDuration): Duration => {
    const d = ensureNumberDuration(duration);
    return {
        hours: `${d.hours}`,
        minutes: `${d.minutes}`,
    };
};

export const durationIsZero = (duration: NumberDuration | Partial<Duration>): boolean => {
    return durationToISODuration(duration) === 'PT0H0M';
};

export const durationToISODuration = (duration: NumberDuration | Partial<Duration>): ISODuration => {
    const { hours, minutes } = ensureNumberDuration(duration);
    return `PT${hours}H${minutes}M`;
};

export const durationsAreEqual = (
    duration1?: Partial<Duration> | NumberDuration,
    duration2?: Partial<Duration> | NumberDuration,
): boolean => {
    if (duration1 === undefined && duration2 === undefined) {
        return true;
    }
    if (duration1 === undefined || duration2 === undefined) {
        return false;
    }
    return durationToISODuration(duration1) === durationToISODuration(duration2);
};

export const summarizeDurations = (
    durations: Array<Partial<Duration> | NumberDuration | undefined>,
): NumberDuration => {
    let minutes = 0;
    durations.forEach((duration) => {
        if (duration) {
            const dur = ensureNumberDuration(duration);
            minutes += dur.hours * 60 + dur.minutes;
        }
    });
    return {
        hours: Math.floor(minutes / 60),
        minutes: minutes % 60,
    };
};

export const ISODurationToNumberDuration = (duration: string): NumberDuration | undefined => {
    try {
        const parts = parse(duration);
        return {
            hours: parts.hours || 0,
            minutes: parts.minutes || 0,
        };
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
        return undefined;
    }
};

export const ISODurationToMaybeDuration = (duration: string): Duration | undefined => {
    try {
        return ISODurationToDuration(duration);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
        return undefined;
    }
};

/** Ignores seconds */
export const ISODurationToDuration = (validDuration: string): Duration => {
    const parts = parse(validDuration);
    const { hours, minutes } = parts;
    return {
        hours: `${hours}`,
        minutes: `${minutes}`,
    };
};

export const ISODurationToDecimalDuration = (isoDuration: string): number | undefined => {
    const duration = ISODurationToMaybeDuration(isoDuration);
    return duration ? durationToDecimalDuration(duration) : undefined;
};

export const getPercentageOfDecimalDuration = (decimalDuration: number, percentage: number): number => {
    return (decimalDuration / 100) * percentage;
};

export const getPercentageOfISODuration = (isoDuration: ISODuration, percentage: number): ISODuration | undefined => {
    const decimalDuration = ISODurationToDecimalDuration(isoDuration);
    if (decimalDuration) {
        return decimalDurationToISODuration(getPercentageOfDecimalDuration(decimalDuration, percentage));
    }
    return undefined;
};

export const getPercentageOfDuration = (duration: Duration, percentage: number): Duration => {
    return decimalDurationToDuration(getPercentageOfDecimalDuration(durationToDecimalDuration(duration), percentage));
};

export const ensureValidHoursAndMinutes = ({ hours, minutes }: NumberDuration): NumberDuration => {
    if (minutes === 60) {
        return {
            hours: hours + 1,
            minutes: 0,
        };
    }
    return {
        hours,
        minutes,
    };
};

export const decimalDurationToNumberDuration = (duration: number): NumberDuration => {
    const hours = Math.floor(duration);
    const minutes = Math.round(60 * (duration % 1));
    return ensureValidHoursAndMinutes({ hours, minutes });
};

export const decimalDurationToDuration = (duration: number): Duration => {
    const { hours, minutes } = ensureValidHoursAndMinutes(decimalDurationToNumberDuration(duration));
    return numberDurationAsDuration(
        ensureNumberDuration({
            hours,
            minutes,
        }),
    );
};

export const decimalDurationToISODuration = (duraction: number): ISODuration => {
    return durationToISODuration(decimalDurationToDuration(duraction));
};

export const durationToDecimalDuration = (duration: NumberDuration | Partial<Duration>): number => {
    const { hours, minutes } = ensureNumberDuration(duration);
    const decimalTime = hours + ((100 / 60) * minutes) / 100;
    return Math.round(decimalTime * 10000) / 10000;
};

/**
 * Validates duration as Time (max 59 minutes)
 * @param duration
 * @returns
 */
export const isValidDuration = (
    duration: NumberDuration | Partial<Duration> | undefined,
): duration is NumberDuration => {
    if (!duration) {
        return false;
    }
    const hours = getPositiveNumberValue(duration.hours);
    const minutes = getPositiveNumberValue(duration.minutes);
    if (hours === 'invalidNumberValue' || minutes === 'invalidNumberValue') {
        return false;
    }
    if (hours === undefined && minutes === undefined) {
        return false;
    }
    const dur = ensureNumberDuration({ hours, minutes });
    return dur.hours >= 0 && dur.minutes >= 0 && dur.minutes < 60;
};

/**
 * Get all durations which is different in durations1 from durations2
 * @param durations1
 * @param durations2
 * @returns
 */
export const getDurationsDiff = (durations1: DateDurationMap, durations2: DateDurationMap): DateDurationMap => {
    const resultMap: DateDurationMap = {};
    Object.keys(durations1).forEach((isoDate) => {
        const oldValue = durations2[isoDate];
        if (oldValue && durationsAreEqual(durations1[isoDate], oldValue)) {
            return;
        }
        resultMap[isoDate] = durations1[isoDate];
    });
    return resultMap;
};

export const getValidDurations = (durationMap: DateDurationMap | InputDateDurationMap): DateDurationMap => {
    const cleanMap: DateDurationMap = {};
    Object.keys(durationMap).forEach((key) => {
        const duration = durationMap[key];
        if (isValidDuration(duration)) {
            cleanMap[key] = { ...duration };
        }
    });
    return cleanMap;
};

export const summarizeDateDurationMap = (durationMap: DateDurationMap): NumberDuration => {
    const durations = Object.keys(durationMap).map((key) => ensureNumberDuration(durationMap[key]));
    return summarizeDurations(durations);
};

export const getDatesWithDurationLongerThanZero = (duration: DateDurationMap | InputDateDurationMap): ISODate[] =>
    Object.keys(duration).filter((key) => {
        const d = duration[key];
        return isValidDuration(d) && durationIsZero(ensureDuration(d)) === false;
    });

/**
 * Get all dates with duration in date range
 * @param dateDurationMap
 * @param dateRange
 * @returns
 */
export const getDurationsInDateRange = (dateDurationMap: DateDurationMap, dateRange: DateRange): DateDurationMap => {
    const returnMap: DateDurationMap = {};
    Object.keys(dateDurationMap).forEach((isoDate) => {
        const date = ISODateToDate(isoDate);
        if (date && isDateInDateRange(date, dateRange)) {
            returnMap[isoDate] = dateDurationMap[isoDate];
        }
        return false;
    });
    return returnMap;
};

/** Remove dates from a dateDurationMap */
export const removeDatesFromDateDurationMap = (
    dateDurationMap: DateDurationMap,
    datesToRemove: Date[],
): DateDurationMap => {
    const cleanedMap: DateDurationMap = {};
    Object.keys(dateDurationMap).forEach((key) => {
        const date = ISODateToDate(key);
        if (date && isDateInDates(date, datesToRemove) === false) {
            cleanedMap[key] = dateDurationMap[key];
        }
    });
    return cleanedMap;
};

/**
 * Get all durations which is different in durations1 from durations2
 * @param durations1
 * @param durations2
 * @returns
 */
export const getDateDurationDiff = (durations1: DateDurationMap, durations2: DateDurationMap): DateDurationMap => {
    const resultMap: DateDurationMap = {};
    Object.keys(durations1).forEach((isoDate) => {
        const oldValue = durations2[isoDate];
        if (oldValue && durationsAreEqual(durations1[isoDate], oldValue)) {
            return;
        }
        resultMap[isoDate] = durations1[isoDate];
    });
    return resultMap;
};

export const durationIsGreatherThanZero = (duration: Duration | undefined): boolean => {
    if (!duration) {
        return false;
    }
    const dur = durationToDecimalDuration(duration);
    return dur > 0;
};

export const getNumberDurationOrUndefined = (duration?: Duration): NumberDuration | undefined => {
    if (duration && durationIsGreatherThanZero(duration)) {
        return durationAsNumberDuration(duration);
    }
    return undefined;
};

export const getDateRangeFromDateDurationMap = (dateDurationMap: DateDurationMap): DateRange => {
    const unsortedDates = Object.keys(dateDurationMap).map((key) => ISODateToDate(key));
    const sortedDates = sortDateArray(unsortedDates);
    return {
        from: sortedDates[0],
        to: sortedDates[sortedDates.length - 1],
    };
};

export const durationUtils = {
    decimalDurationToDuration,
    decimalDurationToNumberDuration,
    decimalDurationToISODuration,
    durationAsNumberDuration,
    durationIsZero,
    durationsAreEqual,
    durationToDecimalDuration,
    durationToISODuration,
    durationIsGreatherThanZero,
    ensureDuration,
    ensureNumberDuration,
    getDateDurationDiff,
    getDateRangeFromDateDurationMap,
    getDatesWithDurationLongerThanZero,
    getDurationsDiff,
    getDurationsInDateRange,
    getNumberDurationOrUndefined,
    getPercentageOfISODuration,
    getPercentageOfDuration,
    getPercentageOfDecimalDuration,
    getValidDurations,
    ISODurationToDuration: ISODurationToMaybeDuration,
    ISODurationToNumberDuration,
    ISODurationToDecimalDuration,
    isValidDuration,
    numberDurationAsDuration,
    summarizeDateDurationMap,
    summarizeDurations,
};
