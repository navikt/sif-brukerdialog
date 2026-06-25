import 'dayjs/locale/nb';
import 'dayjs/locale/nn';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

import { capsFirstCharacter, getValidLocale, ISODate, ISODateToDate } from '.';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale('nb');

const compactFormat = 'DD.MM.YYYY';
const compactFormatWithTime = 'DD.MM.YYYY kl. HH.mm';
const OSLO = 'Europe/Oslo';

/** For UTC-timestamps fra backend — konverterer til norsk tid */
const oslo = (date: Date, locale?: string) => dayjs(date).tz(OSLO).locale(getValidLocale(locale));

/** For dato-only verdier (bruker-input, ISODateToDate) — ingen tz-konvertering */
const local = (date: Date, locale?: string) => dayjs(date).locale(getValidLocale(locale));

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
     * @returns 01.01.2020
     */
    compact: (date: Date, locale?: string) => local(date, locale).format(compactFormat),

    /**
     * @returns 01.01.2020 kl. 08.29
     * NB: Kun for UTC-timestamps fra backend — konverterer til Europe/Oslo
     */
    compactWithTime: (date: Date, locale?: string) => {
        return oslo(date, locale).format(compactFormatWithTime);
    },

    /**
     * @returns 1. jan. 2021
     */
    dateShortMonthYear: (date: Date, locale?: string) => local(date, locale).format('D. MMM YYYY'),

    /**
     * @returns 1. januar 2021
     */
    full: (date: Date, locale?: string) => local(date, locale).format('D. MMMM YYYY'),

    /**
     * @returns fredag
     */
    day: (date: Date, locale?: string) => local(date, locale).format('dddd'),

    /**
     * @returns fredag 01.01.2021
     */
    dayCompactDate: (date: Date, locale?: string) =>
        `${dateFormatter.day(date, locale)} ${dateFormatter.compact(date, locale)}`,

    /**
     * @returns fredag 1. jan. 2021
     */
    dayDateShortMonthYear: (date: Date, locale?: string) =>
        `${dateFormatter.day(date, locale)} ${dateFormatter.dateShortMonthYear(date, locale)}`,

    /**
     * @returns fredag 1. januar 2021
     */
    dayDateMonthYear: (date: Date, locale?: string) =>
        `${dateFormatter.day(date, locale)} ${dateFormatter.full(date, locale)}`,

    /**
     * @returns fredag 1. januar
     */
    dayDateMonth: (date: Date, locale?: string) => local(date, locale).format('dddd D. MMMM'),

    /**
     * @returns fredag 1. jan.
     */
    dayDateShortMonth: (date: Date, locale?: string) => local(date, locale).format('dddd D. MMM'),

    /**
     * @returns januar 2021
     */
    monthFullYear: (date: Date, locale?: string) => local(date, locale).format('MMMM YYYY'),

    /**
     * @returns januar
     */
    month: (date: Date, locale?: string) => local(date, locale).format('MMMM'),

    /**
     * @returns Januar 2021
     */
    MonthFullYear: (date: Date, locale?: string) => capsFirstCharacter(local(date, locale).format('MMMM YYYY')),
};
