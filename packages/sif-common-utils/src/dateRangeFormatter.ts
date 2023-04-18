import dayjs from 'dayjs';
import { dateFormatter } from './dateFormatter';
import { DateRange } from './types';

const getDateText = (dato: Date, compact = true, inkluderDagNavn?: boolean): string => {
    const tekst = compact ? dateFormatter.compact(dato) : dateFormatter.full(dato);
    return inkluderDagNavn ? `${dateFormatter.day(dato)} ${tekst}` : tekst;
};

type Options = {
    compact?: boolean;
    includeDayName?: boolean;
};

export const getDateRangeText = (
    { from, to }: DateRange,
    options: Options = { compact: true, includeDayName: false }
): string => {
    const { includeDayName, compact } = options;
    const fromString = getDateText(from, compact, includeDayName);
    const toString = getDateText(to, compact, includeDayName);

    if (dayjs(from).isSame(to, 'date')) {
        return fromString;
    }
    return `${fromString} - ${toString}`;
};

export const dateRangeFormatter = {
    getDateRangeText,
};
