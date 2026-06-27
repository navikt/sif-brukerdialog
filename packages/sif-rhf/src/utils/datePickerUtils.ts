import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import type { Matcher } from 'react-day-picker';

import { DatepickerLimitations } from '../components/SifDatepicker';
import { isISODateString, ISODate, ISODateToDate } from '@sif/utils';

dayjs.extend(customParseFormat);

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

const parseDatePickerValue = (dateString: string | undefined): Date | undefined => {
    if (!dateString) {
        return undefined;
    }

    if (isISODateString(dateString) && dayjs(dateString, ISO_FORMAT, true).isValid()) {
        return ISODateToDate(dateString);
    }

    const parsedDate = dayjs(dateString, ALLOWED_INPUT_FORMATS, true);
    if (!parsedDate.isValid()) {
        return undefined;
    }

    return ISODateToDate(parsedDate.format(ISO_FORMAT) as ISODate);
};

const parseDatePickerValueToISODate = (dateString: string | undefined): ISODate | undefined => {
    if (!dateString) {
        return undefined;
    }

    if (isISODateString(dateString) && dayjs(dateString, ISO_FORMAT, true).isValid()) {
        return dateString as ISODate;
    }

    const parsedDate = dayjs(dateString, ALLOWED_INPUT_FORMATS, true);
    if (!parsedDate.isValid()) {
        return undefined;
    }
    return parsedDate.format(ISO_FORMAT) as ISODate;
};

const getDisabledDates = ({
    minDate,
    maxDate,
    disabledDateRanges,
    disableWeekends,
    disabledDaysOfWeek,
}: DatepickerLimitations): Matcher[] => {
    const matchers: Matcher[] = [];
    if (minDate) matchers.push({ before: ISODateToDate(minDate) });
    if (maxDate) matchers.push({ after: ISODateToDate(maxDate) });
    if (disabledDateRanges) {
        disabledDateRanges.forEach(({ from, to }) =>
            matchers.push({ from: ISODateToDate(from), to: ISODateToDate(to) }),
        );
    }
    const disabledDays: number[] = disableWeekends ? [0, 6] : [];
    if (disabledDaysOfWeek !== undefined) {
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
    parseDatePickerValue,
    parseDatePickerValueToISODate,
    getDisabledDates,
};
