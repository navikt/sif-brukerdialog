import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';

import { DateRange, ISODate } from './types';
import { getDatesInDateRange, getMonthDateRange, getWeeksInDateRange } from './dateRangeUtils';

dayjs.extend(isoWeek);

const ISODateFormat = 'YYYY-MM-DD';

export const TidenesEnde: ISODate = '2099-01-01' as ISODate;

export const getDateToday = (): ISODate => dateToISODate(dayjs());
export const getDate1YearAgo = (): ISODate => dateToISODate(dayjs().subtract(1, 'year'));
export const getDate2YearsAgo = (): ISODate => dateToISODate(dayjs().subtract(2, 'year'));
export const getDate3YearsAgo = (): ISODate => dateToISODate(dayjs().subtract(3, 'year'));
export const getDate4YearsAgo = (): ISODate => dateToISODate(dayjs().subtract(4, 'year'));
export const getDate4WeeksAgo = (): ISODate => dateToISODate(dayjs().subtract(4, 'week'));
export const getDate1YearFromNow = (): ISODate => dateToISODate(dayjs().add(1, 'year'));
export const getDate99YearsAgo = (): ISODate => dateToISODate(dayjs().subtract(99, 'year'));

export const dateToISODate = (date: Exclude<dayjs.ConfigType, null | undefined>): ISODate =>
    dayjs(date).format(ISODateFormat) as ISODate;

export const isISODateString = (value: unknown): value is ISODate => {
    return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value);
};

export const getYearFromISODate = (isoDate: ISODate): string => isoDate.substring(0, 4);
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

/** Intern hjelpefunksjon: konverterer JS Date til ISODate-streng */
const dateToISO = (date: Date): ISODate => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}` as ISODate;
};

export const getISOWeekdayFromISODate = (isoDate: ISODate): number => {
    const day = ISODateToDate(isoDate).getDay(); // 0=Sun, 1=Mon...6=Sat
    return ((day + 6) % 7) + 1; // Mon=1...Sun=7
};

export const getDatesInMonth = (month: ISODate, onlyWeekDays = false): ISODate[] => {
    return getDatesInDateRange(getMonthDateRange(month, onlyWeekDays), onlyWeekDays);
};

export const getFirstWeekdayInMonth = (month: ISODate): ISODate => {
    const firstDay = `${month.substring(0, 7)}-01` as ISODate;
    const wd = getISOWeekdayFromISODate(firstDay);
    if (wd > 5) {
        const d = ISODateToDate(firstDay);
        d.setDate(d.getDate() + (8 - wd));
        return dateToISO(d);
    }
    return firstDay;
};

export const getWeekFromDate = (date: ISODate, withinSameMonth = false): DateRange => {
    const d = dayjs(date);
    const from = dateToISODate(d.startOf('isoWeek'));
    const to = dateToISODate(d.endOf('isoWeek'));

    if (!withinSameMonth || (d.isSame(from, 'month') && d.isSame(to, 'month'))) {
        return { from, to };
    }
    return {
        from: maxISODate([from, dateToISODate(d.startOf('month'))])!,
        to: minISODate([to, dateToISODate(d.endOf('month'))])!,
    };
};

export const getLastWeekdayInMonth = (month: ISODate): ISODate => {
    const [year, mon] = month.split('-').map(Number);
    return getLastWeekdayOnOrBeforeDate(dateToISO(new Date(year, mon, 0)));
};

export const getLastWeekdayOnOrBeforeDate = (date: ISODate): ISODate => {
    const wd = getISOWeekdayFromISODate(date);
    if (wd <= 5) return date;
    const d = ISODateToDate(date);
    d.setDate(d.getDate() - (wd - 5));
    return dateToISO(d);
};

export const getFirstWeekdayOnOrAfterDate = (date: ISODate): ISODate => {
    const wd = getISOWeekdayFromISODate(date);
    if (wd <= 5) return date;
    const d = ISODateToDate(date);
    d.setDate(d.getDate() + (8 - wd));
    return dateToISO(d);
};

export const getWeeksInMonth = (month: ISODate, includeWholeWeeks = false): DateRange[] => {
    const range = getMonthDateRange(month);
    return getWeeksInDateRange({
        from: !includeWholeWeeks
            ? range.from
            : minISODate([range.from, dateToISODate(dayjs(range.from).startOf('isoWeek'))])!,
        to: !includeWholeWeeks ? range.to : maxISODate([range.to, dateToISODate(dayjs(range.to).endOf('isoWeek'))])!,
    });
};

export const isDateWeekDay = (date: ISODate): boolean => getISOWeekdayFromISODate(date) <= 5;

export const isDateInDates = (date: ISODate, dates?: ISODate[]): boolean => dates?.includes(date) ?? false;

export const getYearMonthKey = (date: ISODate): string => date.substring(0, 7);

export const sortDateArray = (dates: ISODate[]): ISODate[] => [...dates].sort(sortDates);

export const sortDates = (d1: ISODate, d2: ISODate): number => d1.localeCompare(d2);
export const sortDateTimes = (d1: Date, d2: Date): number => d1.getTime() - d2.getTime();

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

export const getFirstOfTwoDates = (date1: ISODate, date2: ISODate): ISODate => (date1 < date2 ? date1 : date2);

export const getLastOfTwoDates = (date1: ISODate, date2: ISODate): ISODate => (date1 > date2 ? date1 : date2);
