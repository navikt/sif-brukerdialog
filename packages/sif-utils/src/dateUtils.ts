import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';

import { DateRange, getWeeksInDateRange, ISODate } from '.';
import { getDatesInDateRange, getMonthDateRange } from './dateRangeUtils';

dayjs.extend(isoWeek);

const ISODateFormat = 'YYYY-MM-DD';

export const getDateToday = (): ISODate => dayjs().format(ISODateFormat) as ISODate;
export const getDate1YearAgo = (): ISODate => dayjs().subtract(1, 'year').format(ISODateFormat) as ISODate;
export const getDate2YearsAgo = (): ISODate => dayjs().subtract(2, 'year').format(ISODateFormat) as ISODate;
export const getDate3YearsAgo = (): ISODate => dayjs().subtract(3, 'year').format(ISODateFormat) as ISODate;
export const getDate4YearsAgo = (): ISODate => dayjs().subtract(4, 'year').format(ISODateFormat) as ISODate;
export const getDate4WeeksAgo = (): ISODate => dayjs().subtract(4, 'week').format(ISODateFormat) as ISODate;
export const getDate1YearFromNow = (): ISODate => dayjs().add(1, 'year').format(ISODateFormat) as ISODate;
export const getDate99YearsAgoFromNow = (): ISODate => dayjs().subtract(99, 'year').format(ISODateFormat) as ISODate;

export const dateToISODate = (date: dayjs.ConfigType): ISODate => dayjs(date).format(ISODateFormat) as ISODate;

export const isISODateString = (value: unknown): value is ISODate => {
    return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value);
};

export const getYearFromISODate = (isoDate: ISODate): number => {
    return parseInt(isoDate.split('-')[0], 10);
};
/**
 * Konverterer en ISODate-streng til et lokalt Date-objekt med midnatt lokal tid.
 * Brukes kun ved Aksel-komponent-grensen (DatePicker etc.).
 */
export const ISODateToDate = (isoDate: ISODate): Date => {
    const [year, month, day] = isoDate.split('-').map(Number);
    let date: Date;
    if (isoDate.charAt(0) === '0') {
        // Håndterer hvis verdien er f.eks. 0001; JS-konstruktøren tolker år 0-99 som 1900+år
        date = new Date(year, (month ?? 1) - 1, day ?? 1);
        date.setFullYear(year);
    } else {
        date = new Date(year, month - 1, day);
    }
    if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
        return new Date(NaN);
    }
    return date;
};

export const getISOWeekdayFromISODate = (isoDate: ISODate): number => {
    return dayjs(isoDate).isoWeekday();
};

export const getDatesInMonth = (month: ISODate, onlyWeekDays = false): ISODate[] => {
    return getDatesInDateRange(getMonthDateRange(month, onlyWeekDays), onlyWeekDays);
};

export const getFirstWeekdayInMonth = (month: ISODate): ISODate => {
    const firstDay = dayjs(month).startOf('month');
    if (firstDay.isoWeekday() > 5) {
        return firstDay.add(8 - firstDay.isoWeekday(), 'days').format(ISODateFormat) as ISODate;
    }
    return firstDay.format(ISODateFormat) as ISODate;
};

export const getWeekFromDate = (date: ISODate, withinSameMonth = false): DateRange => {
    const from = dateToISODate(dayjs(date).startOf('isoWeek'));
    const to = dateToISODate(dayjs(date).endOf('isoWeek'));

    if (withinSameMonth === false || (dayjs(date).isSame(from, 'month') && dayjs(date).isSame(to, 'month'))) {
        return { from, to };
    }
    return {
        from: getLastOfTwoDates(from, dateToISODate(dayjs(date).startOf('month'))),
        to: getFirstOfTwoDates(to, dateToISODate(dayjs(date).endOf('month'))),
    };
};

export const getLastWeekDayInMonth = (month: ISODate): ISODate => {
    return getLastWeekdayOnOrBeforeDate(dateToISODate(dayjs(month).endOf('month')));
};

export const getLastWeekdayOnOrBeforeDate = (date: ISODate): ISODate => {
    const isoWeekDay = dayjs(date).isoWeekday();
    return isoWeekDay <= 5 ? date : (dateToISODate(dayjs(date).startOf('isoWeek').add(4, 'days')) as ISODate);
};

export const getFirstWeekdayOnOrAfterDate = (date: ISODate): ISODate => {
    const isoWeekDay = dayjs(date).isoWeekday();
    return isoWeekDay <= 5 ? date : (dateToISODate(dayjs(date).endOf('isoWeek').add(1, 'days')) as ISODate);
};

export const getWeeksInMonth = (month: ISODate, includeWholeWeeks = false): DateRange[] => {
    const range = getMonthDateRange(month);
    return getWeeksInDateRange({
        from:
            includeWholeWeeks === false
                ? range.from
                : getFirstOfTwoDates(range.from, dateToISODate(dayjs(range.from).startOf('isoWeek'))),
        to:
            includeWholeWeeks === false
                ? range.to
                : getLastOfTwoDates(range.to, dateToISODate(dayjs(range.to).endOf('isoWeek'))),
    });
};

export const isDateWeekDay = (date: ISODate): boolean => {
    return dayjs(date).isoWeekday() <= 5;
};

export const isDateInDates = (date: ISODate, dates?: ISODate[]): boolean => {
    if (!dates) {
        return false;
    }
    return dates.includes(date);
};

export const getYearMonthKey = (date: ISODate): string => dayjs(date).format('YYYY-MM');

export const getFirstOfTwoDates = (date1: ISODate, date2: ISODate): ISODate => {
    return date1 > date2 ? date2 : date1;
};

export const getLastOfTwoDates = (date1: ISODate, date2: ISODate): ISODate => {
    return date1 < date2 ? date2 : date1;
};

export const sortDateArray = (dates: ISODate[]): ISODate[] => dates.sort(sortDates);

export const sortDates = (d1: ISODate, d2: ISODate): number => d1.localeCompare(d2);

export const maxISODate = (dates: ISODate[]): ISODate | undefined => {
    if (dates.length === 0) {
        return undefined;
    }
    return dates.reduce((max, d) => (d > max ? d : max));
};

export const minISODate = (dates: ISODate[]): ISODate | undefined => {
    if (dates.length === 0) {
        return undefined;
    }
    return dates.reduce((min, d) => (d < min ? d : min));
};

export const dateUtils = {
    getDateToday,
    dateToISODate,
    getDatesInMonth,
    getFirstOfTwoDates,
    getFirstWeekdayInMonth,
    getLastOfTwoDates,
    getISOWeekdayFromISODate,
    getLastWeekDayInMonth,
    getYearMonthKey,
    isISODateString,
    isDateInDates,
    isDateWeekDay,
    ISODateToDate,
};
