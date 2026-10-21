import { isISODateString } from '@sif/utils';
import { z } from 'zod';

export const zISODate = z.string().transform((val, ctx) => {
    if (!isISODateString(val)) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Ugyldig ISO-dato (YYYY-MM-DD)' });
        return z.NEVER;
    }
    return val;
});
