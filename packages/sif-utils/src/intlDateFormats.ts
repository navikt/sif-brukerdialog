import { FormatDateOptions } from 'react-intl';

export type IntlDateFormat = keyof typeof intlDateFormats;

/**
 *
 * @param date: Date
 * @returns 01.01.2020
 */
const compact: FormatDateOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
};
/**
 *
 * @param date: Date
 * @returns 1. jan. 2021
 */
const dateShortMonthYear: FormatDateOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
};
/**
 *
 * @param date: Date
 * @returns 1. januar 2021
 */
const full: FormatDateOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
};

/**
 *
 * @param date: Date
 * @returns fredag
 */
const weekday: FormatDateOptions = {
    weekday: 'long',
};

/**
 *
 * @param date: Date
 * @returns fredag 01.01.2021
 */
const weekdayCompactDate: FormatDateOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    weekday: 'long',
};

/**
 *
 * @param date: Date
 * @returns fredag 1. jan. 2021
 */
const weekdayDateShortMonthYear: FormatDateOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    weekday: 'long',
};

/**
 *
 * @param date: Date
 * @returnsfredag 1. januar 2021
 */
const weekdayDateMonthYear: FormatDateOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    weekday: 'long',
};

/**
 *
 * @param date: Date
 * @returns fredag 1. jan.
 */
const weekdayDateMonth: FormatDateOptions = {
    day: 'numeric',
    month: 'long',
    weekday: 'long',
};

/**
 *
 * @param date: Date
 * @returns fredag 1. januar
 */
const weekdayDateShortMonth: FormatDateOptions = {
    day: 'numeric',
    month: 'short',
    weekday: 'long',
};

export const intlDateFormats: Record<string, FormatDateOptions> = {
    compact,
    dateShortMonthYear,
    full,
    weekday,
    weekdayCompactDate,
    weekdayDateMonth,
    weekdayDateMonthYear,
    weekdayDateShortMonth,
    weekdayDateShortMonthYear,
};
