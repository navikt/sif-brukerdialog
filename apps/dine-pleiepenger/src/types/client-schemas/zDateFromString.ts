import { innsyn } from '@navikt/k9-sak-innsyn-api';
import { ISODateToDate } from '@navikt/sif-common-utils';
import dayjs from 'dayjs';
import z from 'zod';

const validateAndConvertToUTCDate = (val: string): Date => {
    if (!dayjs(val).isValid()) {
        throw new Error(`Invalid date string: ${val}`);
    }
    return dayjs.utc(val).toDate();
};

export const zDateFromDateTimeString = z.string().transform((val) => {
    return validateAndConvertToUTCDate(val);
});

export const zOptionalDateFromDateTimeString = z
    .string()
    .optional()
    .transform((val) => {
        return val ? validateAndConvertToUTCDate(val) : undefined;
    });

export const zDateFromISODateString = z.string().transform((val) => ISODateToDate(val));
export const zDateFromISODateStringFix9999Year = z
    .string()
    .transform((val) => ISODateToDate(val))
    .transform((date) => {
        if (date.getFullYear() === 9999) {
            return undefined;
        }
        return date;
    });

export const zOptionalDateFromISODateString = z
    .string()
    .optional()
    .transform((val) => (val ? ISODateToDate(val) : undefined));

export const zDatePeriodeFromStringPeriode = innsyn.zPeriodeDto.extend({
    fom: zDateFromISODateString,
    tom: zDateFromISODateString,
});

export const zDatePeriodeFromStringPeriodeFixYear9999 = innsyn.zPeriodeDto.extend({
    fom: zDateFromISODateString,
    tom: zDateFromISODateStringFix9999Year,
});
