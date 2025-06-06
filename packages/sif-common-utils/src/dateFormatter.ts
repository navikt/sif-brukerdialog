import dayjs from 'dayjs';
import 'dayjs/locale/nb';
import 'dayjs/locale/nn';
import { capsFirstCharacter, getValidLocale, ISODate, ISODateToDate } from './';

dayjs.locale('nb');

const compactFormat = 'DD.MM.YYYY';
const compactFormatWithTime = 'DD.MM.YYYY kl. HH.mm';

/** Brukt i eldre apper */
export const prettifyDate = (date: Date, locale?: string): string => {
    return dateFormatter.compact(date, locale);
};

/** Brukt i eldre apper */
export const prettifyDateExtended = (date: Date, locale?: string): string => {
    return dateFormatter.dateShortMonthYear(date, locale);
};

export const prettifyApiDate = (apiDate: ISODate, extended = true): string =>
    extended ? prettifyDate(ISODateToDate(apiDate)) : prettifyDateExtended(ISODateToDate(apiDate));

export const dateFormatter = {
    /**
     *
     * @param date: Date
     * @returns 01.01.2020
     */
    compact: (date: Date, locale?: string) => dayjs(date).locale(getValidLocale(locale)).format(compactFormat),

    /**
     *
     * @param date: Date
     * @returns 01.01.2020
     */
    compactWithTime: (date: Date, locale?: string) =>
        dayjs(date).locale(getValidLocale(locale)).format(compactFormatWithTime),

    /**
     *
     * @param date: Date
     * @returns 1. jan. 2021
     */
    dateShortMonthYear: (date: Date, locale?: string) =>
        dayjs(date).locale(getValidLocale(locale)).format('D. MMM YYYY'),

    /**
     *
     * @param date: Date
     * @returns 1. januar 2021
     */
    full: (date: Date, locale?: string) => dayjs(date).locale(getValidLocale(locale)).format('D. MMMM YYYY'),

    /**
     *
     * @param date: Date
     * @returns fredag
     */
    day: (date: Date, locale?: string) => `${dayjs(date).locale(getValidLocale(locale)).format('dddd')}`,

    /**
     *
     * @param date: Date
     * @returns fredag 01.01.2021
     */
    dayCompactDate: (date: Date, locale?: string) =>
        `${dateFormatter.day(date, locale)} ${dateFormatter.compact(date, locale)}`,

    /**
     *
     * @param date: Date
     * @returns fredag 1. jan. 2021
     */
    dayDateShortMonthYear: (date: Date, locale?: string) =>
        `${dateFormatter.day(date)} ${dateFormatter.dateShortMonthYear(date, locale)}`,

    /**
     *
     * @param date: Date
     * @returnsfredag 1. januar 2021
     */
    dayDateMonthYear: (date: Date, locale?: string) =>
        `${dateFormatter.day(date, locale)} ${dateFormatter.full(date, locale)}`,

    /**
     *
     * @param date: Date
     * @returns fredag 1. jan.
     */
    dayDateMonth: (date: Date, locale?: string) => dayjs(date).locale(getValidLocale(locale)).format('dddd D. MMMM'),

    /**
     *
     * @param date: Date
     * @returns fredag 1. januar
     */
    dayDateShortMonth: (date: Date, locale?: string) =>
        dayjs(date).locale(getValidLocale(locale)).format('dddd D. MMM'),

    /**
     *
     * @param date: Date
     * @return Måned årstall
     */
    monthFullYear: (date: Date, locale?: string) => dayjs(date).locale(getValidLocale(locale)).format('MMMM YYYY'),
    /**
     *
     * @param date: Date
     * @return Måned
     */
    month: (date: Date, locale?: string) => dayjs(date).locale(getValidLocale(locale)).format('MMMM'),
    /**
     *
     * @param date: Date
     * @return Måned årstall
     */
    MonthFullYear: (date: Date, locale?: string) =>
        capsFirstCharacter(dayjs(date).locale(getValidLocale(locale)).format('MMMM YYYY')),
};
