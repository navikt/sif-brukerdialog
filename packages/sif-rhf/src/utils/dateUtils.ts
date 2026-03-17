import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import utc from 'dayjs/plugin/utc';
import type { Matcher } from 'react-day-picker';

dayjs.extend(customParseFormat);
dayjs.extend(utc);

export type ISODateString = string;

const ISO_FORMAT = 'YYYY-MM-DD';

const ALLOWED_INPUT_FORMATS = [
    'DD.MM.YYYY',
    'DDMMYYYY',
    'DD/MM/YYYY',
    'DD-MM-YYYY',
    'D.M.YYYY',
    'DD.MM.YY',
    'D.M.YY',
    'DDMMYY',
];

export const INVALID_DATE = 'Invalid date';

export const isISODateString = (value: any): value is ISODateString =>
    typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value);

export const dateToISODateString = (date: Date): string => {
    const d = dayjs.utc(date);
    return d.isValid() ? d.format(ISO_FORMAT) : INVALID_DATE;
};

export const ISODateStringToUTCDate = (iso?: string): Date | undefined => {
    if (!iso || iso.length !== 10) return undefined;
    const d = dayjs(iso, ISO_FORMAT).utc(true);
    return d.isValid() ? d.toDate() : undefined;
};

export const InputDateStringToISODateString = (input: string): string => {
    const d = dayjs(input, ALLOWED_INPUT_FORMATS, true).utc(true);
    return d.isValid() ? d.format(ISO_FORMAT) : INVALID_DATE;
};

export interface DatepickerLimitations {
    minDate?: Date;
    maxDate?: Date;
    disabledDateRanges?: Array<{ from: Date; to: Date }>;
    disableWeekends?: boolean;
}

export const getDisabledDates = ({
    minDate,
    maxDate,
    disabledDateRanges,
    disableWeekends,
}: DatepickerLimitations): Matcher[] => {
    const matchers: Matcher[] = [];
    if (minDate) matchers.push({ before: minDate });
    if (maxDate) matchers.push({ after: maxDate });
    if (disabledDateRanges) {
        disabledDateRanges.forEach(({ from, to }) => matchers.push({ from, to }));
    }
    if (disableWeekends) matchers.push({ dayOfWeek: [0, 6] });
    return matchers;
};
