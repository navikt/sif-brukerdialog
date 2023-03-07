import { DatepickerDateRange, DatepickerLimitations } from '@navikt/ds-datepicker/lib/types';
import dayjs from 'dayjs';
import { FormikDatepickerLimitations } from './formikDatepickerTypes';

const isoStringFormat = 'YYYY-MM-DD';

export const dateToISOString = (date?: Date) => (date ? dayjs(date).format(isoStringFormat) : '');
export const ISOStringToDate = (dateString = ''): Date | undefined => getDateFromDateString(dateString);

const parseDateLimitations = ({
    minDate,
    maxDate,
    disabledDateRanges = [],
    disableWeekend,
    disabledDaysOfWeek,
}: FormikDatepickerLimitations): DatepickerLimitations => {
    const invalidDateRanges: DatepickerDateRange[] = disabledDateRanges.map((d) => ({
        from: dateToISOString(d.from),
        to: dateToISOString(d.to),
    }));
    return {
        minDate: minDate ? dateToISOString(minDate) : undefined,
        maxDate: maxDate ? dateToISOString(maxDate) : undefined,
        weekendsNotSelectable: disableWeekend,
        invalidDateRanges,
        disabledDaysOfWeek: disabledDaysOfWeek ? { dayOfWeek: disabledDaysOfWeek } : undefined,
    };
};

const getDateStringFromValue = (value?: Date | string): string | undefined => {
    let date;
    if (value && typeof value === 'string') {
        if (dayjs(value, isoStringFormat, true).isValid()) {
            date = new Date(value);
        }
    } else if (typeof value === 'object') {
        date = value;
    }
    return date ? dateToISOString(date) : undefined;
};

const getDateFromDateString = (dateString: string | undefined): Date | undefined => {
    const ISOFormat = 'YYYY-MM-DD';
    if (dateString === undefined) {
        return undefined;
    }
    // console.log({ dateString, res: dayjs(dateString, ISOFormat, true) });
    const isValid = dayjs(dateString, ISOFormat, true).isValid();

    if (isValid) {
        if (isValidFormattedISODateString(dateString)) {
            const [year, month, day] = dateString.split('-').map((i) => parseInt(i, 10));
            const date = dayjs(dateString);
            if (date.get('year') === year && date.get('month') + 1 === month && date.get('date') === day) {
                return date.toDate();
            }
        }
    }
    return undefined;
};

const isValidFormattedISODateString = (dateString = ''): boolean => {
    return /\d{4}-\d{2}-(\d{2})$/.test(dateString);
};

/** Check if dateString has format DD.MM.YYYY, or D.M.YY */
const isValidFormattedDateString = (dateString = ''): boolean => {
    return /\d{1,2}.\d{1,2}.(\d{2}|\d{4})$/.test(dateString);
};

const datepickerUtils = {
    getDateStringFromValue,
    getDateFromDateString,
    parseDateLimitations,
    isValidFormattedDateString,
};

export default datepickerUtils;
