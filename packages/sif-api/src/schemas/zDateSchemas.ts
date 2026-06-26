import { isISODateString } from '@sif/utils';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { z } from 'zod';

dayjs.extend(utc);

/** Validerer og konverterer en ISO datetime-streng til UTC Date */
const parseUTCDate = (val: string): Date => {
    const parsed = dayjs.utc(val);
    if (!parsed.isValid()) {
        throw new Error(`Ugyldig datostreng: ${val}`);
    }
    return parsed.toDate();
};

/** Schema for ISO datetime-streng (f.eks. "2024-01-15T10:30:00Z") → Date */
export const zDateTime = z.string().transform(parseUTCDate);

/** Schema for nullable/optional ISO datetime-streng, transformerer null/undefined → undefined */
export const zNullableDateTime = z
    .string()
    .nullish()
    .transform((val) => (val ? parseUTCDate(val) : undefined));

/** Schema for nullable/optional ISO date-streng, transformerer null/undefined → undefined */

export const zISODate = z.string().transform((val, ctx) => {
    if (!isISODateString(val)) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Ugyldig ISO-dato (YYYY-MM-DD)' });
        return z.NEVER;
    }
    return val;
});
