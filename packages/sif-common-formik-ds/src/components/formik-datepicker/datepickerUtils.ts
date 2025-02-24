import { Matcher } from 'react-day-picker';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { isArray } from 'lodash';
import { ISODateString } from './dateFormatUtils';
import { DatepickerLimitations } from './FormikDatepicker';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { ISODateToDate } from '@navikt/sif-common-utils';
dayjs.extend(customParseFormat);

dayjs.extend(utc);

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
    const disabledWeekdays: Matcher = {
        dayOfWeek: [...(limitations.disableWeekends ? [0, 6] : [])],
    };

    if (limitations.disabledDaysOfWeek) {
        const { dayOfWeek } = limitations.disabledDaysOfWeek;
        const days = isArray(dayOfWeek) ? dayOfWeek : [dayOfWeek];
        if (isArray(disabledWeekdays.dayOfWeek)) {
            disabledWeekdays.dayOfWeek = [...disabledWeekdays.dayOfWeek, ...days];
        } else {
            disabledWeekdays.dayOfWeek = [disabledWeekdays.dayOfWeek, ...days];
        }
    }

    return [
        ...invalidDates,
        ...(limitations.maxDate ? [{ after: limitations.maxDate } as Matcher] : []),
        ...(limitations.minDate ? [{ before: limitations.minDate } as Matcher] : []),
        ...[disabledWeekdays],
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

export const isISODateString = (value: any): value is ISODateString => {
    if (value && typeof value === 'string') {
        const reg = /^\d{4}-\d{2}-\d{2}$/;
        const match: RegExpMatchArray | null = value.match(reg);
        return match !== null;
    } else {
        return false;
    }
};

export const datepickerUtils = {
    getDateFromDateString,
    getDisabledDates,
    isValidFormattedDateString,
};
