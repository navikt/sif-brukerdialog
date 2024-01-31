import dayjs from 'dayjs';
import 'dayjs/locale/nb';
import 'dayjs/locale/nn';

import { dateFormatter } from './dateFormatter';
import { DateRange } from './types';

const getDateText = (date: Date, locale: string, compact = true, inkluderDagNavn?: boolean): string => {
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
    options: Options = { compact: true, includeDayName: false },
): string => {
    const { includeDayName, compact } = options;
    const fromString = getDateText(from, locale, compact, includeDayName);
    const toString = getDateText(to, locale, compact, includeDayName);

    if (dayjs(from).isSame(to, 'date')) {
        return fromString;
    }
    return `${fromString} - ${toString}`;
};

export const dateRangeFormatter = {
    getDateRangeText,
};
