import { z } from 'zod';
import { isoDateStringSchema } from './isoDateStringSchema';
import { inntektSchema } from './inntektSchema';

export const periodeMedInntektSchema = inntektSchema.extend({
    fraOgMed: isoDateStringSchema,
    tilOgMed: isoDateStringSchema,
    bekrefterInntekt: z.boolean(),
});
