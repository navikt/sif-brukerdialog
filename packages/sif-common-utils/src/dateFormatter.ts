import dayjs from 'dayjs';
import 'dayjs/locale/nb';
import 'dayjs/locale/nn';
import { ValidLocale } from './localeUtils';

dayjs.locale('nb');

const compactFormat = 'DD.MM.YYYY';

const getLocale = (locale?: ValidLocale) => locale || 'nb';

/** Brukt i eldre apper */
export const prettifyDate = (date: Date, locale?: ValidLocale): string => {
    return dateFormatter.compact(date, locale);
};

/** Brukt i eldre apper */
export const prettifyDateExtended = (date: Date, locale?: ValidLocale): string => {
    return dateFormatter.dateShortMonthYear(date, locale);
};

export const dateFormatter = {
    /**
     *
     * @param date: Date
     * @returns 01.01.2020
     */
    compact: (date: Date, locale?: ValidLocale) => dayjs(date).locale(getLocale(locale)).format(compactFormat),

    /**
     *
     * @param date: Date
     * @returns 1. jan. 2021
     */
    dateShortMonthYear: (date: Date, locale?: ValidLocale) =>
        dayjs(date).locale(getLocale(locale)).format('D. MMM YYYY'),

    /**
     *
     * @param date: Date
     * @returns 1. januar 2021
     */
    full: (date: Date, locale?: ValidLocale) => dayjs(date).locale(getLocale(locale)).format('D. MMMM YYYY'),

    /**
     *
     * @param date: Date
     * @returns fredag
     */
    day: (date: Date, locale?: ValidLocale) => `${dayjs(date).locale(getLocale(locale)).format('dddd')}`,

    /**
     *
     * @param date: Date
     * @returns fredag 01.01.2021
     */
    dayCompactDate: (date: Date, locale?: ValidLocale) =>
        `${dateFormatter.day(date, locale)} ${dateFormatter.compact(date, locale)}`,

    /**
     *
     * @param date: Date
     * @returns fredag 1. jan. 2021
     */
    dayDateShortMonthYear: (date: Date, locale?: ValidLocale) =>
        `${dateFormatter.day(date)} ${dateFormatter.dateShortMonthYear(date, locale)}`,

    /**
     *
     * @param date: Date
     * @returnsfredag 1. januar 2021
     */
    dayDateMonthYear: (date: Date, locale?: ValidLocale) =>
        `${dateFormatter.day(date, locale)} ${dateFormatter.full(date, locale)}`,

    /**
     *
     * @param date: Date
     * @returns fredag 1. jan.
     */
    dayDateMonth: (date: Date, locale?: ValidLocale) => dayjs(date).locale(getLocale(locale)).format('dddd D. MMMM'),

    /**
     *
     * @param date: Date
     * @returns fredag 1. januar
     */
    dayDateShortMonth: (date: Date, locale?: ValidLocale) =>
        dayjs(date).locale(getLocale(locale)).format('dddd D. MMM'),
};
