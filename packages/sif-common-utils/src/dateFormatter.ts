import dayjs from 'dayjs';
import 'dayjs/locale/nb';

dayjs.locale('nb');

const compactFormat = 'DD.MM.YYYY';

/** Brukt i eldre apper */
export const prettifyDate = (date: Date): string => {
    return dateFormatter.compact(date);
};

/** Brukt i eldre apper */
export const prettifyDateExtended = (date: Date): string => {
    return dateFormatter.dateShortMonthYear(date);
};

export const dateFormatter = {
    /**
     *
     * @param date: Date
     * @returns 01.01.2020
     */
    compact: (date: Date) => dayjs(date).format(compactFormat),

    /**
     *
     * @param date: Date
     * @returns 1. jan. 2021
     */
    dateShortMonthYear: (date: Date) => dayjs(date).format('D. MMM YYYY'),

    /**
     *
     * @param date: Date
     * @returns 1. januar 2021
     */
    full: (date: Date) => dayjs(date).format('D. MMMM YYYY'),

    /**
     *
     * @param date: Date
     * @returns fredag
     */
    day: (date: Date) => `${dayjs(date).format('dddd')}`,

    /**
     *
     * @param date: Date
     * @returns fredag 01.01.2021
     */
    dayCompactDate: (date: Date) => `${dateFormatter.day(date)} ${dateFormatter.compact(date)}`,

    /**
     *
     * @param date: Date
     * @returns fredag 1. jan. 2021
     */
    dayDateShortMonthYear: (date: Date) => `${dateFormatter.day(date)} ${dateFormatter.dateShortMonthYear(date)}`,

    /**
     *
     * @param date: Date
     * @returnsfredag 1. januar 2021
     */
    dayDateMonthYear: (date: Date) => `${dateFormatter.day(date)} ${dateFormatter.full(date)}`,

    /**
     *
     * @param date: Date
     * @returns fredag 1. jan.
     */
    dayDateMonth: (date: Date) => dayjs(date).format('dddd D. MMMM'),

    /**
     *
     * @param date: Date
     * @returns fredag 1. januar
     */
    dayDateShortMonth: (date: Date) => dayjs(date).format('dddd D. MMM'),
};
