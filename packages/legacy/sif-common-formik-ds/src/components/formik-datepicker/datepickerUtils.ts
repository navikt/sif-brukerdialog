import { isISODateString, ISODateToDate } from '@navikt/sif-common-utils';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { Matcher } from 'react-day-picker';

import { DatepickerLimitations } from './FormikDatepicker';

dayjs.extend(customParseFormat);

const isoStringFormat = 'YYYY-MM-DD';

export const dateToISOString = (date?: Date) => (date ? dayjs(date).format(isoStringFormat) : '');
export const ISOStringToDate = (dateString = ''): Date | undefined => getDateFromDateString(dateString);

export const getDisabledDates = (limitations: DatepickerLimitations): Matcher[] => {
    const invalidDates: Matcher[] = [];
    if (limitations.disabledDateRanges) {
        limitations.disabledDateRanges.forEach(({ from, to }) => {
            if (from && to) {
                invalidDates.push({
                    from,
                    to,
                });
            }
        });
    }
    const disabledDays: number[] = limitations.disableWeekends ? [0, 6] : [];

    if (limitations.disabledDaysOfWeek) {
        const { dayOfWeek } = limitations.disabledDaysOfWeek;
        const additionalDays = Array.isArray(dayOfWeek) ? dayOfWeek : [dayOfWeek];
        disabledDays.push(...additionalDays);
    }

    return [
        ...invalidDates,
        ...(limitations.maxDate ? [{ after: limitations.maxDate } as Matcher] : []),
        ...(limitations.minDate ? [{ before: limitations.minDate } as Matcher] : []),
        ...(disabledDays.length > 0 ? [{ dayOfWeek: disabledDays } as Matcher] : []),
    ];
};

const getDateFromDateString = (dateString: string | undefined): Date | undefined => {
    if (dateString === undefined) {
        return undefined;
    }
    if (isISODateString(dateString) && dayjs(dateString, 'YYYY-MM-DD', true).isValid()) {
        return ISODateToDate(dateString);
    }
    return undefined;
};

/** Check if dateString has format DD.MM.YYYY, or D.M.YY */
const isValidFormattedDateString = (dateString = ''): boolean => {
    return /\d{1,2}.\d{1,2}.(\d{2}|\d{4})$/.test(dateString);
};

export { isISODateString };

export const datepickerUtils = {
    getDateFromDateString,
    getDisabledDates,
    isValidFormattedDateString,
};
