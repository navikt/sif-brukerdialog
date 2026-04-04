import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import utc from 'dayjs/plugin/utc';
import type { Matcher } from 'react-day-picker';

import { DatepickerLimitations } from '../components/SifDatepicker';

dayjs.extend(customParseFormat);
dayjs.extend(utc);

type ISODateString = string;

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

const INVALID_DATE = 'Invalid date';

const isISODateString = (value: any): value is ISODateString =>
    typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value);

const dateToISODateString = (date: Date): string => {
    const d = dayjs(date);
    return d.isValid() ? d.format(ISO_FORMAT) : INVALID_DATE;
};

const ISODateStringToUTCDate = (iso?: string): Date | undefined => {
    if (!iso || iso.length !== 10) return undefined;
    const d = dayjs(iso, ISO_FORMAT).utc(true);
    return d.isValid() ? d.toDate() : undefined;
};

const InputDateStringToISODateString = (input: string): string => {
    const d = dayjs(input, ALLOWED_INPUT_FORMATS, true).utc(true);
    return d.isValid() ? d.format(ISO_FORMAT) : INVALID_DATE;
};

const getDisabledDates = ({
    minDate,
    maxDate,
    disabledDateRanges,
    disableWeekends,
    disabledDaysOfWeek,
}: DatepickerLimitations): Matcher[] => {
    const matchers: Matcher[] = [];
    if (minDate) matchers.push({ before: minDate });
    if (maxDate) matchers.push({ after: maxDate });
    if (disabledDateRanges) {
        disabledDateRanges.forEach(({ from, to }) => matchers.push({ from, to }));
    }
    const disabledDays: number[] = disableWeekends ? [0, 6] : [];
    if (disabledDaysOfWeek) {
        const additionalDays = Array.isArray(disabledDaysOfWeek.dayOfWeek)
            ? disabledDaysOfWeek.dayOfWeek
            : [disabledDaysOfWeek.dayOfWeek];
        disabledDays.push(...additionalDays);
    }
    if (disabledDays.length > 0) {
        matchers.push({ dayOfWeek: disabledDays });
    }
    return matchers;
};

export const datePickerUtils = {
    dateToISODateString,
    getDisabledDates,
    InputDateStringToISODateString,
    isISODateString,
    ISODateStringToUTCDate,
    INVALID_DATE,
};
