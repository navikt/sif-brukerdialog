import 'dayjs/locale/nb';
import 'dayjs/locale/nn';

import dayjs from 'dayjs';

import { dateFormatter } from './dateFormatter';
import { DateRange, ISODate } from './types';

const getDateText = (date: ISODate, locale: string, compact = true, inkluderDagNavn?: boolean): string => {
    const tekst = compact ? dateFormatter.compact(date, locale) : dateFormatter.full(date, locale);
    return inkluderDagNavn ? `${dateFormatter.day(date, locale)} ${tekst}` : tekst;
};

type Options = {
    compact?: boolean;
    includeDayName?: boolean;
};

export const getDateRangeText = (
    { from, to }: DateRange,
    locale: string,
    { compact = true, includeDayName = false }: Options = {},
): string => {
    const fromString = getDateText(from, locale, compact, includeDayName);
    const toString = getDateText(to, locale, compact, includeDayName);

    if (dayjs(from).isSame(to, 'date')) {
        return fromString;
    }
    return `${fromString} - ${toString}`;
};

export const compact = ({ from, to }: DateRange): string => {
    if (dayjs(from).isSame(to, 'date')) {
        return dateFormatter.compact(from);
    }
    return `${dateFormatter.compact(from)} - ${dateFormatter.compact(to)}`;
};

export const dateRangeFormatter = {
    getDateRangeText,
    compact,
};
