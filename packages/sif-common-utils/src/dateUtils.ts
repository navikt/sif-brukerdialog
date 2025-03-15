import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import utc from 'dayjs/plugin/utc';
import { DateRange, getWeeksInDateRange, ISODate } from '.';
import { getDatesInDateRange, getMonthDateRange } from './dateRangeUtils';

dayjs.extend(utc);
dayjs.extend(isoWeek);

const ISODateFormat = 'YYYY-MM-DD';

export const getDateToday = () => dayjs().toDate();
export const getDate1YearAgo = () => dayjs().subtract(1, 'year').startOf('day').toDate();
export const getDate2YearsAgo = () => dayjs().subtract(2, 'year').startOf('day').toDate();
export const getDate3YearsAgo = () => dayjs().subtract(3, 'year').startOf('day').toDate();
export const getDate4YearsAgo = () => dayjs().subtract(4, 'year').startOf('day').toDate();
export const getDate4WeeksAgo = () => dayjs().subtract(4, 'week').startOf('day').toDate();
export const getDate1YearFromNow = () => dayjs().add(1, 'year').endOf('day').toDate();
export const getDate99YearsFromNow = () => dayjs().subtract(99, 'year').startOf('day').toDate();

export const dateToISODate = (date: Date): ISODate => dayjs(date).format(ISODateFormat);

export const ISODateToDate = (isoDate: ISODate): Date => {
    return dayjs.utc(isoDate, ISODateFormat).toDate();
};

export const getISOWeekdayFromISODate = (isoDate: ISODate): number => {
    return dayjs(ISODateToDate(isoDate)).isoWeekday();
};

export const getDatesInMonth = (month: Date, onlyWeekDays = false): Date[] => {
    return getDatesInDateRange(getMonthDateRange(month, onlyWeekDays), onlyWeekDays);
};

export const getFirstWeekDayInMonth = (month: Date): Date => {
    const firstDay = dayjs(month).startOf('month');
    if (firstDay.isoWeekday() > 5) {
        return firstDay.add(8 - firstDay.isoWeekday(), 'days').toDate();
    }
    return firstDay.toDate();
};

export const getWeekFromDate = (date: Date, withinSameMonth = false): DateRange => {
    const from = dayjs(date).startOf('isoWeek').toDate();
    const to = dayjs(date).endOf('isoWeek').toDate();

    if (withinSameMonth === false || (dayjs(date).isSame(from, 'month') && dayjs(date).isSame(to, 'month'))) {
        return {
            from,
            to,
        };
    }
    return {
        from: getLastOfTwoDates(from, dayjs(date).startOf('month').toDate()),
        to: getFirstOfTwoDates(to, dayjs(date).endOf('month').toDate()),
    };
};

export const getLastWeekDayInMonth = (month: Date): Date => {
    return getLastWeekdayOnOrBeforeDate(dayjs(month).endOf('month').toDate());
};

export const getLastWeekdayOnOrBeforeDate = (date: Date): Date => {
    const isoWeekDay = dayjs(date).isoWeekday();
    return isoWeekDay <= 5 ? date : dayjs(date).startOf('isoWeek').add(4, 'days').toDate();
};
export const getFirstWeekdayOnOrAfterDate = (date: Date): Date => {
    const isoWeekDay = dayjs(date).isoWeekday();
    return isoWeekDay <= 5 ? date : dayjs(date).endOf('isoWeek').add(1, 'days').toDate();
};

export const getWeeksInMonth = (month: Date, includeWholeWeeks = false): DateRange[] => {
    const range = getMonthDateRange(month);
    return getWeeksInDateRange({
        from:
            includeWholeWeeks === false
                ? range.from
                : getFirstOfTwoDates(range.from, dayjs(range.from).startOf('isoWeek').toDate()),
        to:
            includeWholeWeeks === false
                ? range.to
                : getLastOfTwoDates(range.to, dayjs(range.to).endOf('isoWeek').toDate()),
    });
};

export const isDateWeekDay = (date: Date): boolean => {
    return dayjs(date).isoWeekday() <= 5;
};

export const isDateInDates = (date: Date, dates?: Date[]): boolean => {
    if (!dates) {
        return false;
    }
    return dates.some((d) => dayjs(date).isSame(d, 'day'));
};

export const getYearMonthKey = (date: Date): string => dayjs(date).format('YYYY-MM');

export const getFirstOfTwoDates = (date1: Date, date2: Date): Date => {
    return dayjs(date1).isAfter(date2, 'day') ? date2 : date1;
};

export const getLastOfTwoDates = (date1: Date, date2: Date): Date => {
    return dayjs(date1).isBefore(date2, 'day') ? date2 : date1;
};

export const sortDateArray = (dates: Date[]): Date[] => dates.sort(sortDates);

export const sortDates = (d1: Date, d2: Date) => {
    return d1.getTime() - d2.getTime();
};

/**
 * Obs! Denne kan feile hvis fødselsnummeret er syntetisk. Det er også tilfeller hvor dato ikke
 * er helt korrekt - men dette er sjelden.
 * @param fnr Fødselsnummer
 * @returns fødselsdatoen eller null hvis fødselsnummeret er ugyldig
 */
export const getFødselsdatoFromFødselsnummer = (fnr?: string): Date | undefined => {
    if (fnr === undefined || !/^\d{11}$/.test(fnr)) {
        return undefined;
        // throw new Error('Ugyldig fødselsnummer. Må bestå av 11 siffer.');
    }

    const day = parseInt(fnr.substring(0, 2), 10);
    const month = parseInt(fnr.substring(2, 4), 10);
    const yearPart = parseInt(fnr.substring(4, 6), 10);
    const individnummer = parseInt(fnr.substring(6, 9), 10);

    let year: number;

    if (individnummer >= 0 && individnummer <= 499) {
        year = 1900 + yearPart;
    } else if (individnummer >= 500 && individnummer <= 749 && yearPart >= 0 && yearPart <= 39) {
        year = 2000 + yearPart;
    } else if (individnummer >= 900 && individnummer <= 999 && yearPart >= 0 && yearPart <= 39) {
        year = 1900 + yearPart;
    } else if (individnummer >= 500 && individnummer <= 999 && yearPart >= 40 && yearPart <= 99) {
        year = 1900 + yearPart;
    } else {
        return undefined; // Ugyldig fødselsnummer
    }

    try {
        return dayjs.utc(new Date(year, month - 1, day)).toDate();
    } catch {
        return undefined;
    }
};

export const dateUtils = {
    getDateToday: getDateToday(),
    dateToISODate,
    getDatesInMonth,
    getFirstOfTwoDates,
    getFirstWeekDayInMonth,
    getFødselsdatoFromFødselsnummer,
    getLastOfTwoDates,
    getISOWeekdayFromISODate,
    getLastWeekDayInMonth,
    getYearMonthKey,
    isDateInDates,
    isDateWeekDay,
    ISODateToDate,
};
