import { dateUtils } from '@navikt/sif-common-utils';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import type { Matcher } from 'react-day-picker';

import { DatepickerLimitations } from '../components/SifDatepicker';

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

    if (dateUtils.isISODateString(dateString) && dayjs(dateString, ISO_FORMAT, true).isValid()) {
        return dateUtils.ISODateToDate(dateString);
    }

    const parsedDate = dayjs(dateString, ALLOWED_INPUT_FORMATS, true);
    if (!parsedDate.isValid()) {
        return undefined;
    }

    return dateUtils.ISODateToDate(parsedDate.format(ISO_FORMAT));
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
    getDisabledDates,
};
