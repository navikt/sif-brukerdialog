import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { uniq } from 'lodash';

import { DateRange, ISODate, ISODateRange, ISODateRangeMap, MaybeDateRange } from '.';
import {
    dateToISODate,
    getFirstWeekdayInMonth,
    getFirstWeekdayOnOrAfterDate,
    getLastWeekdayInMonth,
    getLastWeekdayOnOrBeforeDate,
    isDateWeekDay,
    isISODateString,
    maxISODate,
    minISODate,
    sortDates,
} from './dateUtils';

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(isBetween);

/**
 * Typecheck for DateRange object
 */
export const isDateRange = (dateRange: any): dateRange is DateRange => {
    return isISODateString(dateRange?.from) && isISODateString(dateRange?.to);
};

/**
 * Sorts an array of date ranges by the from-date
 */
export const sortDateRange = (d1: Pick<DateRange, 'from'>, d2: Pick<DateRange, 'from'>): number => {
    if (dayjs(d1.from).isSameOrBefore(d2.from, 'day')) {
        return -1;
    }
    return 1;
};

/**
 * Sorts an array of date ranges by the from-date
 */
export const sortMaybeDateRange = (d1: MaybeDateRange, d2: MaybeDateRange): number => {
    if (d1.from === undefined && d2.from === undefined) {
        return 0;
    }
    if (d1.from === undefined) {
        return -1;
    }
    if (d2.from === undefined) {
        return 1;
    }
    if (dayjs(d1.from).isSameOrBefore(d2.from, 'day')) {
        return -1;
    }
    return 1;
};

/**
 * Sorts an array of date ranges by the to-date
 */
export const sortDateRangeByToDate = (d1: DateRange, d2: DateRange): number => {
    if (dayjs(d1.to).isSameOrBefore(d2.to, 'day')) {
        return -1;
    }
    return 1;
};

/**
 * Checks if date ranges spans the same dates
 */
export const dateRangesCollide = (dateRanges: DateRange[], fromDateCanBeSameAsPreviousToDate = false): boolean => {
    if (dateRanges.length > 0) {
        const sortedDates = dateRanges.sort(sortDateRange);
        const hasOverlap = dateRanges.find((d, idx) => {
            if (idx < sortedDates.length - 1) {
                if (fromDateCanBeSameAsPreviousToDate) {
                    return dayjs(d.to).isAfter(sortedDates[idx + 1].from, 'day');
                } else {
                    return dayjs(d.to).isSameOrAfter(sortedDates[idx + 1].from, 'day');
                }
            }
            return false;
        });
        return hasOverlap !== undefined;
    }
    return false;
};

/**
 * Check if multiple date ranges exceeds one date range
 */
export const dateRangesExceedsRange = (ranges: DateRange[], allowedRange: DateRange): boolean => {
    if (ranges.length === 0) {
        return false;
    }
    const sortedRanges = ranges.sort(sortDateRange);
    const from = sortedRanges[0].from;
    const to = sortedRanges[sortedRanges.length - 1].to;

    if (
        !dayjs(from).isBetween(allowedRange.from, allowedRange.to, 'day', '[]') ||
        !dayjs(to).isBetween(allowedRange.from, allowedRange.to, 'day', '[]')
    ) {
        return true;
    }
    return false;
};

/**
 * Check if one or more dates are within dateranges
 */
export const datesCollideWithDateRanges = (dates: ISODate[], dateRanges: DateRange[]): boolean => {
    if (dateRanges.length > 0 && dates.length > 0) {
        return dates.some((d) => {
            return dateRanges.some((range) => isDateInDateRange(d, range));
        });
    }
    return false;
};

/**
 * Check if date is within a date range or open dateRange
 */
export const isDateInMaybeDateRange = (date: ISODate, dateRange: MaybeDateRange): boolean => {
    if (isDateRange(dateRange)) {
        return isDateInDateRange(date, dateRange);
    }
    if (dateRange.from) {
        return dayjs(date).isSameOrAfter(dateRange.from);
    }
    if (dateRange.to) {
        return dayjs(date).isSameOrBefore(dateRange.to);
    }
    return false;
};

/**
 * Check if a date is in a date range, including date range from-date and date range to-date
 */
export const isDateInDateRange = (date: ISODate, dateRange: DateRange): boolean => {
    return dayjs(date).isBetween(dateRange.from, dateRange.to, 'day', '[]');
};

/**
 * Check if a date is in one of the dateranges, including date range from-date and date range to-date
 */
export const isDateInDateRanges = (date: ISODate, dateRanges: DateRange[]): boolean => {
    return dateRanges.some((dateRange) => isDateInDateRange(date, dateRange));
};

/**
 * Check if a date is inside a date range, excluding date range from-date and date range to-date
 */
export const isDateInsideDateRange = (date: ISODate, dateRange: DateRange): boolean => {
    return dayjs(date).isBetween(dateRange.from, dateRange.to, 'day', '()');
};

/**
 * Check if a dateRange is before or equal to given date
 */
export const isDateRangeSameOrBeforeDate = (dateRange: DateRange, date: ISODate): boolean => {
    return dayjs(dateRange.to).isSameOrBefore(date, 'day');
};

/**
 * Returns array of DateRange representing the months in @dateRange.
 */
export const getMonthsInDateRange = (dateRange: DateRange, returnFullMonths = false): DateRange[] => {
    const months: DateRange[] = [];
    let current = dayjs(dateRange.from);
    do {
        const from: ISODate = returnFullMonths ? dateToISODate(current.startOf('month')) : dateToISODate(current);
        const endOfMonth = dateToISODate(dayjs(from).endOf('month'));
        const to: ISODate =
            dayjs(endOfMonth).isAfter(dateRange.to, 'day') && returnFullMonths === false ? dateRange.to : endOfMonth;

        months.push({ from, to });
        current = current.add(1, 'month').startOf('month');
    } while (current.isSameOrBefore(dateRange.to, 'day'));
    return months;
};

/**
 * Returns array of unique month start-dates represented as ISODate.
 */
export const getMonthsInDates = (dates: ISODate[]): ISODate[] => {
    const months: ISODate[] = [];
    dates.forEach((date) => {
        const month = dateToISODate(dayjs(date).startOf('month'));
        if (!months.includes(month)) {
            months.push(month);
        }
    });
    return months;
};

/**
 * Returns a DateRange for the month which date is a part of.
 */
export const getMonthDateRange = (date: ISODate, onlyWeekDays = false): DateRange => ({
    from: onlyWeekDays ? getFirstWeekdayInMonth(date) : dateToISODate(dayjs(date).startOf('month')),
    to: onlyWeekDays ? getLastWeekdayInMonth(date) : dateToISODate(dayjs(date).endOf('month')),
});

/**
 * Utvider DateRange til å gå til og med søndag, dersom dateRange slutter på fredag, lørdag eller søndag
 */
export const includeWeekendIfDateRangeEndsOnFridayOrLater = (dateRange: DateRange): DateRange => {
    if (dayjs(dateRange.to).isoWeekday() >= 5) {
        return {
            ...dateRange,
            to: dateToISODate(dayjs(dateRange.to).endOf('isoWeek')),
        };
    }
    return dateRange;
};

/**
 * Checks if two date ranges are adjacent -> if the second DateRange starts on the day after the first dateRange
 */
export const dateRangeIsAdjacentToDateRange = (
    dateRange1: DateRange,
    dateRange2: DateRange,
    ignoreWeekends = false,
): boolean => {
    if (dayjs(dateRange1.to).isSameOrAfter(dateRange2.from, 'day')) {
        return false;
    }
    if (ignoreWeekends && dayjs(dateRange1.to).isoWeekday() >= 5 && dayjs(dateRange2.from).isoWeekday() === 1) {
        const diff = dayjs(dateRange1.to).diff(dayjs(dateRange2.from), 'days');
        return diff === -1 || diff === -2 || diff === -3;
    }

    return dayjs(dateRange1.to).diff(dayjs(dateRange2.from), 'days') === -1;
};

/**
 * Joins DateRanges which are adjacent
 */
export const joinAdjacentDateRanges = (dateRanges: DateRange[], ignoreWeekends?: boolean): DateRange[] => {
    if (dateRanges.length === 0) {
        return [];
    }
    if (dateRanges.length === 1) {
        return dateRanges;
    }

    const joinedDateRanges: DateRange[] = [];
    let rangeFromDate: ISODate = dateRanges[0].from;

    dateRanges.forEach((current, index) => {
        if (index === dateRanges.length - 1) {
            joinedDateRanges.push({
                from: rangeFromDate,
                to: current.to,
            });
            return;
        }
        const next = dateRanges[index + 1];
        if (dateRangeIsAdjacentToDateRange(current, next, ignoreWeekends) === false) {
            joinedDateRanges.push({
                from: rangeFromDate,
                to: current.to,
            });
            rangeFromDate = next.from;
        }
    });

    return joinedDateRanges;
};

/**
 * Returns a DateRange for the week which date is a part of.
 */
export const getWeekDateRange = (date: ISODate, onlyWeekDays = false): DateRange => ({
    from: dateToISODate(dayjs(date).startOf('isoWeek')),
    to: dateToISODate(
        dayjs(date)
            .endOf('isoWeek')
            .subtract(onlyWeekDays ? 2 : 0, 'days'),
    ),
});

/**
 * Get an array of week DateRange for all weeks within @dateRange
 */
export const getWeeksInDateRange = (dateRange: DateRange): DateRange[] => {
    const weeks: DateRange[] = [];
    let current = dayjs(dateRange.from);
    do {
        const weekFrom = dateToISODate(current);
        const weekTo = minISODate([dateToISODate(current.endOf('isoWeek')), dateRange.to])!;
        weeks.push({ from: weekFrom, to: weekTo });
        current = current.add(1, 'week').startOf('isoWeek');
    } while (current.isBefore(dateRange.to, 'day'));
    if (current.isSame(dateRange.to, 'day')) {
        weeks.push({ from: dateRange.to, to: dateRange.to });
    }
    return weeks;
};

/**
 * Returns an array of all dates within @dateRange, with or without weekends
 */
export const getDatesInDateRange = (dateRange: DateRange, onlyWeekDays = false): ISODate[] => {
    const dates: ISODate[] = [];
    let current = dayjs(dateRange.from);
    do {
        const date = dateToISODate(current);
        if (onlyWeekDays === false || isDateWeekDay(date)) {
            dates.push(date);
        }
        current = current.add(1, 'day');
    } while (current.isSameOrBefore(dateRange.to, 'day'));
    return dates;
};

/**
 * Returns array with all years defined in the dateRanges from value
 */
export const getYearsInDateRanges = (dateRanges: DateRange[]): number[] =>
    uniq(dateRanges.map((d) => parseInt(d.from.split('-')[0], 10)));

/**
 * Returns number of days within @dateRange
 */
export const getNumberOfDaysInDateRange = (dateRange: DateRange, onlyWeekDays = false): number =>
    onlyWeekDays
        ? getDatesInDateRange(dateRange, onlyWeekDays).length
        : Math.abs(dayjs(dateRange.to).diff(dayjs(dateRange.from), 'days')) + 1;

/**
 * Returns the number of weekdays (Monday–Friday) in the date range.
 * Inclusive: both from- and to-date are counted.
 */
export const getNumberOfWeekdaysInDateRange = (dateRange: DateRange): number =>
    getNumberOfDaysInDateRange(dateRange, true);

/**
 * Gets a dateRange from a list of @dates
 */
export const getDateRangeFromDates = (dates: ISODate[]): DateRange => {
    if (dates.length === 0) {
        throw new Error('getDateRangeFromDates: Cannot get date range from empty array');
    }
    const sortedDates = dates.sort(sortDates);
    return {
        from: sortedDates[0],
        to: sortedDates[sortedDates.length - 1],
    };
};

/**
 * Gets a dateRange spanning all @ranges
 */
export const getDateRangeFromDateRanges = (dateRanges: DateRange[]): DateRange => {
    if (dateRanges.length === 0) {
        throw new Error('getDateRangeFromDateRanges: Cannot get date range from empty array');
    }
    return {
        from: minISODate(dateRanges.map((r) => r.from))!,
        to: maxISODate(dateRanges.map((r) => r.to))!,
    };
};

/**
 * Gets a isoDateRangeMap from array of DateRange
 */
export const getIsoDateRangeMapFromDateRanges = (dateRanges: DateRange[], value: any): ISODateRangeMap<any> => {
    const dateRangeMap: ISODateRangeMap<any> = {};
    dateRanges.map(dateRangeToISODateRange).forEach((key) => {
        dateRangeMap[key] = value;
    });
    return dateRangeMap;
};

/**
 * Gets DateRanges from array of dates, where following dates are grouped in one DateRange
 */
export const getDateRangesFromDates = (dates: ISODate[], removeDuplicateDates = true): DateRange[] => {
    const datesToUse = removeDuplicateDates ? uniq(dates).sort(sortDates) : dates;

    const datesCount = datesToUse.length;
    if (datesCount === 0) {
        return [];
    }
    if (datesCount === 1) {
        return [{ from: datesToUse[0], to: datesToUse[0] }];
    }

    const dateRanges: DateRange[] = [];
    let from: ISODate | undefined;
    datesToUse.forEach((date, index) => {
        if (!from) {
            from = date;
        }
        if (index === datesCount - 1) {
            return dateRanges.push({ from: from!, to: date });
        }

        const followingCalendarDate = dayjs(date).add(1, 'day');
        const nextDateInArray = datesToUse[index + 1];

        if (!dayjs(followingCalendarDate).isSame(nextDateInArray, 'day')) {
            dateRanges.push({ from: from!, to: date });
            from = nextDateInArray;
        }
    });
    return dateRanges;
};

export const getDatesInDateRanges = (dateRanges: DateRange[], removeDuplicateDates = true): ISODate[] => {
    const dates: ISODate[] = [];
    dateRanges.forEach((dateRange) => {
        dates.push(...getDatesInDateRange(dateRange));
    });
    return removeDuplicateDates ? uniq(dates) : dates;
};

/**
 * Returns an array of DateRanges between other @dateRanges
 */
export const getDateRangesBetweenDateRanges = (dateRanges: DateRange[]): DateRange[] => {
    const rangesInBetween: DateRange[] = [];
    dateRanges.forEach((periode, index) => {
        if (index === 0) {
            return;
        }
        const rangeInBetween: DateRange = {
            from: dateToISODate(dayjs(dateRanges[index - 1].to).add(1, 'day')),
            to: dateToISODate(dayjs(periode.from).subtract(1, 'day')),
        };

        if (dayjs(rangeInBetween.from).isSameOrBefore(rangeInBetween.to, 'day')) {
            rangesInBetween.push(rangeInBetween);
        }
    });
    return rangesInBetween;
};

/**
 * Gets all dates in @month, not inside @dateRange
 */
export const getDatesInMonthOutsideDateRange = (month: ISODate, dateRange: DateRange): ISODate[] => {
    const monthDateRange: DateRange = getMonthDateRange(month);
    const dates: ISODate[] = [];

    if (dayjs(dateRange.from).isAfter(monthDateRange.from, 'day')) {
        dates.push(
            ...getDatesInDateRange({
                from: monthDateRange.from,
                to: dateToISODate(dayjs(dateRange.from).subtract(1, 'day')),
            }),
        );
    }
    if (dayjs(dateRange.to).isBefore(monthDateRange.to, 'day')) {
        dates.push(
            ...getDatesInDateRange({
                from: dateToISODate(dayjs(dateRange.to).add(1, 'day')),
                to: monthDateRange.to,
            }),
        );
    }

    return dates;
};

/**
 * Gets all dates in @week, not inside @dateRange
 */
export const getDatesInWeekOutsideDateRange = (
    week: ISODate,
    dateRange: DateRange,
    onlyWeekDays?: boolean,
): ISODate[] => {
    const weekDateRange: DateRange = getWeekDateRange(week, onlyWeekDays);
    const dates: ISODate[] = [];

    if (dayjs(dateRange.from).isAfter(weekDateRange.from, 'day')) {
        dates.push(
            ...getDatesInDateRange({
                from: weekDateRange.from,
                to: dateToISODate(dayjs(dateRange.from).subtract(1, 'day')),
            }),
        );
    }
    if (dayjs(dateRange.to).isBefore(weekDateRange.to, 'day')) {
        dates.push(
            ...getDatesInDateRange({
                from: dateToISODate(dayjs(dateRange.to).add(1, 'day')),
                to: weekDateRange.to,
            }),
        );
    }

    return dates;
};

/**
 * Converts ISODateRange to DateRange
 */
export const ISODateRangeToDateRange = (isoDateRange: ISODateRange): DateRange => {
    const parts = isoDateRange.split('/');
    return {
        from: parts[0] as ISODate,
        to: parts[1] as ISODate,
    };
};

/**
 * Converts dateRange to ISODateRange
 */
export const dateRangeToISODateRange = (dateRange: DateRange): ISODateRange => {
    return `${dateRange.from}/${dateRange.to}`;
};

/**
 * Returns all dates in date range as ISODates, weekends excluded
 */
export const getISODatesInISODateRange = (range: ISODateRange, onlyWeekDays = false): ISODate[] => {
    const dateRange = ISODateRangeToDateRange(range);
    return getDatesInDateRange(dateRange).filter((date) => (onlyWeekDays ? isDateWeekDay(date) : true));
};

/**
 * Return an ISODateRange with the same from and to date
 */
export const ISODateToISODateRange = (isoDate: ISODate): ISODateRange => {
    return `${isoDate}/${isoDate}`;
};

export const getIsoWeekDateRangeForDate = (date: ISODate): DateRange => ({
    from: dateToISODate(dayjs(date).startOf('isoWeek')),
    to: dateToISODate(dayjs(date).endOf('isoWeek')),
});

export const getDateRangesFromISODateRangeMap = (map: ISODateRangeMap<any>): DateRange[] => {
    return Object.keys(map).map((isoDateRange) => ISODateRangeToDateRange(isoDateRange));
};

/**
 * If the dateRange to-date is after maxDate, it sets the to-date to the maxDate.
 */
export const setMaxToDateForDateRange = (dateRange: DateRange, maxToDate: ISODate): DateRange => {
    if (dayjs(dateRange.to).isAfter(maxToDate, 'day')) {
        return {
            from: dateRange.from,
            to: maxToDate,
        };
    }
    return dateRange;
};

/**
 * Modifies start and/or end date to be within limitDateRange
 */
export const limitDateRangeToDateRange = <Type extends DateRange>(dateRange: Type, limitDateRange: DateRange): Type => {
    return {
        ...dateRange,
        from: dayjs(dateRange.from).isBefore(limitDateRange.from, 'day') ? limitDateRange.from : dateRange.from,
        to: dayjs(dateRange.to).isAfter(limitDateRange.to, 'day') ? limitDateRange.to : dateRange.to,
    };
};

/**
 * Returns all dateRanges within the limitDateRange.
 */
export const getDateRangesWithinDateRange = <Type extends DateRange>(
    dateRanges: Type[],
    limitDateRange: DateRange,
    adjustToLimit = true,
): Type[] => {
    return dateRanges
        .filter((dr) => dateRangesCollide([dr, limitDateRange]))
        .map((dr) => (adjustToLimit ? limitDateRangeToDateRange(dr, limitDateRange) : dr));
};

/**
 * Returns the last date in the dateranges
 */
export const getLastDateInDateRanges = (dateRanges: DateRange[]): ISODate | undefined => {
    if (dateRanges.length === 0) {
        return undefined;
    }
    return maxISODate(dateRanges.map((dr) => dr.to));
};

/**
 * Returns the first date in the dateranges
 */
export const getFirstDateInDateRanges = (dateRanges: DateRange[]): ISODate | undefined => {
    if (dateRanges.length === 0) {
        return undefined;
    }
    return minISODate(dateRanges.map((dr) => dr.from));
};

export const getDateRangesBetweenDateRangesWithinDateRange = (
    minDate: ISODate,
    maxDate: ISODate,
    dateRanges: DateRange[],
): DateRange[] => {
    const preDateRange: DateRange = { from: minDate, to: dateToISODate(dayjs(minDate).subtract(1, 'day')) };
    const postDateRange: DateRange = { from: maxDate, to: dateToISODate(dayjs(maxDate).add(1, 'day')) };
    return getDateRangesBetweenDateRanges([preDateRange, ...dateRanges, postDateRange]);
};

export const dateRangeIncludesWeekdays = (dateRange: DateRange): boolean => {
    const dates = getDatesInDateRange(dateRange);
    return dates.some((date) => isDateWeekDay(date));
};

export const trimDateRangeToWeekdays = (range: DateRange): DateRange | undefined => {
    const from = getFirstWeekdayOnOrAfterDate(range.from);
    const to = getLastWeekdayOnOrBeforeDate(range.to);
    if (dayjs(from).isAfter(to, 'day')) {
        return undefined;
    }
    return { from, to };
};

export const getDateRangeWithinDateRange = (range: DateRange, limitRange: DateRange): DateRange => ({
    from: range.from > limitRange.from ? range.from : limitRange.from,
    to: range.to < limitRange.to ? range.to : limitRange.to,
});

export const dateRangeUtils = {
    dateRangeIncludesWeekdays,
    dateRangeIsAdjacentToDateRange,
    dateRangesCollide,
    dateRangesExceedsRange,
    dateRangeToISODateRange,
    datesCollideWithDateRanges,
    getDateRangeFromDateRanges,
    getDateRangeFromDates,
    getDateRangesBetweenDateRanges,
    getDateRangesFromDates,
    getDateRangesFromISODateRangeMap,
    getDateRangesWithinDateRange,
    getDateRangeWithinDateRange,
    getDatesInDateRanges,
    getDatesInWeekOutsideDateRange,
    getIsoWeekDateRangeForDate,
    getMonthDateRange,
    getMonthsInDateRange,
    getNumberOfDaysInDateRange,
    getNumberOfWeekdaysInDateRange,
    getWeekDateRange,
    includeWeekendIfDateRangeEndsOnFridayOrLater,
    isDateInDateRange,
    isDateInDateRanges,
    isDateInMaybeDateRange,
    isDateInsideDateRange,
    isDateRange,
    ISODateRangeToDateRange,
    ISODateToISODateRange,
    joinAdjacentDateRanges,
    limitDateRangeToDateRange,
    sortDateRange,
    sortDateRangeByToDate,
    trimDateRangeToWeekdays,
};
