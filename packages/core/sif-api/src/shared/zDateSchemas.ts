import { isISODateString } from '@sif/utils';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { z } from 'zod';

dayjs.extend(utc);

/** Schema for nullable/optional ISO date-streng, transformerer null/undefined → undefined */

export const zISODate = z.string().transform((val, ctx) => {
    if (!isISODateString(val)) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Ugyldig ISO-dato (YYYY-MM-DD)' });
        return z.NEVER;
    }
    return val;
});
