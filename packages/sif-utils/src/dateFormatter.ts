import 'dayjs/locale/nb';
import 'dayjs/locale/nn';

import dayjs from 'dayjs';

import { capsFirstCharacter, getValidLocale, ISODate } from '.';

dayjs.locale('nb');

const compactFormat = 'DD.MM.YYYY';

/** For dato-only ISODate-verdier — ingen tz-konvertering */
const local = (date: ISODate, locale?: string) => dayjs(date).locale(getValidLocale(locale));

/** Brukt i eldre apper */
export const prettifyDate = (date: ISODate, locale?: string): string => {
    return dateFormatter.compact(date, locale);
};

/** Brukt i eldre apper */
export const prettifyDateExtended = (date: ISODate, locale?: string): string => {
    return dateFormatter.dateShortMonthYear(date, locale);
};

export const dateFormatter = {
    /**
     * @returns 01.01.2020
     */
    compact: (date: ISODate, locale?: string) => local(date, locale).format(compactFormat),

    /**
     * @returns 1. jan. 2021
     */
    dateShortMonthYear: (date: ISODate, locale?: string) => local(date, locale).format('D. MMM YYYY'),

    /**
     * @returns 1. januar 2021
     */
    full: (date: ISODate, locale?: string) => local(date, locale).format('D. MMMM YYYY'),

    /**
     * @returns fredag
     */
    day: (date: ISODate, locale?: string) => local(date, locale).format('dddd'),

    /**
     * @returns fredag 01.01.2021
     */
    dayCompactDate: (date: ISODate, locale?: string) =>
        `${dateFormatter.day(date, locale)} ${dateFormatter.compact(date, locale)}`,

    /**
     * @returns fredag 1. jan. 2021
     */
    dayDateShortMonthYear: (date: ISODate, locale?: string) =>
        `${dateFormatter.day(date, locale)} ${dateFormatter.dateShortMonthYear(date, locale)}`,

    /**
     * @returns fredag 1. januar 2021
     */
    dayDateMonthYear: (date: ISODate, locale?: string) =>
        `${dateFormatter.day(date, locale)} ${dateFormatter.full(date, locale)}`,

    /**
     * @returns fredag 1. januar
     */
    dayDateMonth: (date: ISODate, locale?: string) => local(date, locale).format('dddd D. MMMM'),

    /**
     * @returns fredag 1. jan.
     */
    dayDateShortMonth: (date: ISODate, locale?: string) => local(date, locale).format('dddd D. MMM'),

    /**
     * @returns januar 2021
     */
    monthFullYear: (date: ISODate, locale?: string) => local(date, locale).format('MMMM YYYY'),

    /**
     * @returns januar
     */
    month: (date: ISODate, locale?: string) => local(date, locale).format('MMMM'),

    /**
     * @returns Januar 2021
     */
    MonthFullYear: (date: ISODate, locale?: string) => capsFirstCharacter(local(date, locale).format('MMMM YYYY')),
};
