import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import minMax from 'dayjs/plugin/minMax';
import { uniq } from 'lodash';
import { DateRange, getFirstOfTwoDates, ISODate, ISODateRange, MaybeDateRange } from '.';
import {
    isDateWeekDay,
    dateToISODate,
    getFirstWeekDayInMonth,
    getLastWeekDayInMonth,
    ISODateToDate,
} from './dateUtils';

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(isBetween);
dayjs.extend(minMax);

/**
 * Typecheck for DateRange object
 * @param dateRange
 * @returns boolean
 */
export const isDateRange = (dateRange: any): dateRange is DateRange => {
    return dateRange.from && dateRange.to;
};

/**
 * Sorts an array of date ranges by the from-date
 * @param d1
 * @param d2
 * @returns sort value
 */

export const sortDateRange = (d1: DateRange, d2: DateRange): number => {
    if (dayjs(d1.from).isSameOrBefore(d2.from, 'day')) {
        return -1;
    }
    return 1;
};

/**
 * Sorts an array of date ranges by the to-date
 * @param d1
 * @param d2
 * @returns sort value
 */
export const sortDateRangeByToDate = (d1: DateRange, d2: DateRange): number => {
    if (dayjs(d1.to).isSameOrBefore(d2.to, 'day')) {
        return -1;
    }
    return 1;
};

/**
 * Checks if date ranges spans the same dates
 * @param dateRanges
 * @param fromDateCanBeSameAsPreviousToDate
 * @returns boolean
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
 * Check if one or more dates are within dateranges
 * @param dates
 * @param dateRanges
 * @returns boolean
 */
export const datesCollideWithDateRanges = (dates: Date[], dateRanges: DateRange[]): boolean => {
    if (dateRanges.length > 0 && dates.length > 0) {
        return dates.some((d) => {
            return dateRanges.some((range) => isDateInDateRange(d, range));
        });
    }
    return false;
};

/**
 * Check if date is within a date range or open dateRange
 * @param date
 * @param dateRange
 * @returns boolean
 */
export const isDateInMaybeDateRange = (date: Date, dateRange: MaybeDateRange): boolean => {
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
 * @param date
 * @param dateRange
 * @returns boolean
 */

export const isDateInDateRange = (date: Date, dateRange: DateRange): boolean => {
    return dayjs(date).isBetween(dateRange.from, dateRange.to, 'day', '[]');
};

/**
 * Check if a date is inside a date range, excluding date range from-date and date range to-date
 * @param date
 * @param dateRange
 * @returns boolean
 */
export const isDateInsideDateRange = (date: Date, dateRange: DateRange): boolean => {
    return dayjs(date).isBetween(dateRange.from, dateRange.to, 'day', '()');
};

/**
 * Returns array of DateRange representing the months in @dateRange.
 * @param dateRange
 * @param returnFullMonths Set to return full months, not cap the months by @dateRange
 * @returns array of DateRange
 */
export const getMonthsInDateRange = (dateRange: DateRange, returnFullMonths = false): DateRange[] => {
    const months: DateRange[] = [];
    let current = dayjs(dateRange.from);
    do {
        const from: Date = returnFullMonths ? current.startOf('month').toDate() : current.toDate();
        const endOfMonth = dayjs(from).endOf('month').toDate();
        const to =
            dayjs(endOfMonth).isAfter(dateRange.to, 'day') && returnFullMonths === false ? dateRange.to : endOfMonth;

        months.push({ from, to });
        current = current.add(1, 'month').startOf('month');
    } while (current.isSameOrBefore(dateRange.to, 'day'));
    return months;
};

/**
 * Returns a DateRange for the month which date is a part of.
 * @param date
 * @param onlyWeekDays Exclude saturday and sunday from dateRange
 * @returns DateRange
 */
export const getMonthDateRange = (date: Date, onlyWeekDays = false): DateRange => ({
    from: onlyWeekDays ? getFirstWeekDayInMonth(date) : dayjs(date).startOf('month').toDate(),
    to: onlyWeekDays ? getLastWeekDayInMonth(date) : dayjs(date).endOf('month').toDate(),
});

/**
 * Returns a DateRange for the week which date is a part of.
 * @param date
 * @param onlyWeekDays Exclude saturday and sunday from dateRange
 * @returns DateRange
 */

export const getWeekDateRange = (date: Date, onlyWeekDays = false): DateRange => {
    return {
        from: dayjs(date).startOf('isoWeek').toDate(),
        to: dayjs(date)
            .endOf('isoWeek')
            .subtract(onlyWeekDays ? 2 : 0, 'days')
            .toDate(),
    };
};

/**
 * Get an array of week dataRange for all weeks within @dateRange
 * @param dateRange
 * @returns
 */
export const getWeeksInDateRange = (dateRange: DateRange): DateRange[] => {
    const weeks: DateRange[] = [];
    let current = dayjs(dateRange.from);
    do {
        const weekDateRange: DateRange = { from: current.toDate(), to: current.endOf('isoWeek').toDate() };
        const rangeToPush: DateRange = {
            from: weekDateRange.from,
            to: getFirstOfTwoDates(weekDateRange.to, dateRange.to),
        };
        weeks.push(rangeToPush);
        current = current.add(1, 'week').startOf('isoWeek');
    } while (current.isBefore(dateRange.to, 'day'));
    if (current.isSame(dateRange.to, 'day')) {
        weeks.push({ from: dateRange.to, to: dateRange.to });
    }
    return weeks;
};
/**
 * Returns an array of all dates within @dateRange, with our without weekends
 * @param dateRange;
 * @param onlyWeekDays only include weekdays
 * @returns Date[]
 */
export const getDatesInDateRange = (dateRange: DateRange, onlyWeekDays = false): Date[] => {
    const dates: Date[] = [];
    let current = dayjs(dateRange.from);
    do {
        const date = current.toDate();
        if (onlyWeekDays === false || isDateWeekDay(date)) {
            dates.push(date);
        }
        current = current.add(1, 'day');
    } while (current.isSameOrBefore(dateRange.to, 'day'));
    return dates;
};

/**
 * Returns array with all years defined i the dateRanges from value
 * @param dateRanges
 * @returns array of unique years in dateRange.from
 */
export const getYearsInDateRanges = (dateRanges: DateRange[]): number[] =>
    uniq(dateRanges.map((d) => d.from.getFullYear()));

/**
 * Returns number of days within @dateRange
 * @param dateRange
 * @param onlyWeekDays
 * @returns
 */
export const getNumberOfDaysInDateRange = (dateRange: DateRange, onlyWeekDays = false): number =>
    onlyWeekDays
        ? getDatesInDateRange(dateRange, onlyWeekDays).length
        : Math.abs(dayjs(dateRange.to).diff(dateRange.from, 'days')) + 1;

/**
 * Gets a dateRange spanning all @ranges
 * @param dateRanges
 * @returns dateRange
 */
export const getDateRangeFromDateRanges = (dateRanges: DateRange[]): DateRange => {
    return {
        from: dayjs.min(dateRanges.map((range) => dayjs(range.from))).toDate(),
        to: dayjs.max(dateRanges.map((range) => dayjs(range.to))).toDate(),
    };
};

/**
 * Returns an array of DateRanges between other @dateRanges
 * @param dateRanges
 * @returns date ranges between @dateRanges
 */
export const getDateRangesBetweenDateRanges = (dateRanges: DateRange[]): DateRange[] => {
    const rangesInBetween: DateRange[] = [];
    dateRanges.forEach((periode, index) => {
        if (index === 0) {
            return;
        }
        const rangeInBetween: DateRange = {
            from: dayjs(dateRanges[index - 1].to)
                .add(1, 'day')
                .toDate(),
            to: dayjs(periode.from).subtract(1, 'day').toDate(),
        };

        if (dayjs(rangeInBetween.from).isSameOrBefore(rangeInBetween.to, 'day')) {
            rangesInBetween.push(rangeInBetween);
        }
    });
    return rangesInBetween;
};

/**
 * Gets all dates in @month, not inside @dateRange
 * @param month
 * @param dateRange
 * @returns array of dates not within the dateRange
 */
export const getDatesInMonthOutsideDateRange = (month: Date, dateRange: DateRange): Date[] => {
    const monthDateRange: DateRange = getMonthDateRange(month);
    const dates: Date[] = [];

    if (dayjs(dateRange.from).isAfter(monthDateRange.from, 'day')) {
        dates.push(
            ...getDatesInDateRange({
                from: monthDateRange.from,
                to: dayjs(dateRange.from).subtract(1, 'day').toDate(),
            })
        );
    }
    if (dayjs(dateRange.to).isBefore(monthDateRange.to, 'day')) {
        dates.push(
            ...getDatesInDateRange({
                from: dayjs(dateRange.to).add(1, 'day').toDate(),
                to: monthDateRange.to,
            })
        );
    }

    return dates;
};

/**
 * Converts ISODateRange to DateRange
 * @param isoDateRange
 * @returns
 */
export const ISODateRangeToDateRange = (isoDateRange: ISODateRange): DateRange => {
    const parts = isoDateRange.split('/');
    return {
        from: ISODateToDate(parts[0]),
        to: ISODateToDate(parts[1]),
    };
};

/**
 * Extracts from and to ISODates from ISODateRanges
 * @param isoDateRange
 * @returns
 */
export const ISODateRangeToISODates = (isoDateRange: ISODateRange): { from: ISODate; to: ISODate } => {
    const parts = isoDateRange.split('/');
    return {
        from: parts[0],
        to: parts[1],
    };
};

/**
 * Converts dateRange to ISODateRange
 * @param dateRange
 * @returns
 */
export const dateRangeToISODateRange = (dateRange: DateRange): ISODateRange => {
    return `${dateToISODate(dateRange.from)}/${dateToISODate(dateRange.to)}`;
};

/**
 * Returns all dates in date range as ISODates, weekends excluded
 * @param range
 * @returns
 */
export const getISODatesInISODateRange = (range: ISODateRange, onlyWeekDays = false): ISODate[] => {
    const dateRange = ISODateRangeToDateRange(range);
    return getDatesInDateRange(dateRange)
        .filter((date) => (onlyWeekDays ? isDateWeekDay(date) : true))
        .map((date) => dateToISODate(date));
};

/**
 * Return an ISODateRange with the same from and to date
 * @param isoDate
 * @returns ISODateRange
 */

export const ISODateToISODateRange = (isoDate: ISODate): ISODateRange => {
    return `${isoDate}/${isoDate}`;
};

export const dateRangeUtils = {
    dateRangesCollide,
    dateRangeToISODateRange,
    datesCollideWithDateRanges,
    getDateRangeFromDateRanges,
    getDateRangesBetweenDateRanges,
    getMonthDateRange,
    getMonthsInDateRange,
    getNumberOfDaysInDateRange,
    getWeekDateRange,
    isDateInDateRange,
    isDateInMaybeDateRange,
    isDateInsideDateRange,
    isDateRange,
    ISODateRangeToDateRange,
    ISODateRangeToISODates,
    ISODateToISODateRange,
    sortDateRange,
    sortDateRangeByToDate,
};
