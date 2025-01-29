import { z } from 'zod';
import { isoDateStringSchema } from './isoDateStringSchema';

export const inntektSchema = z.object({
    inntektAnsatt: z.number().min(0).optional(),
    inntektSN: z.number().min(0).optional(),
    inntektYtelse: z.number().min(0).optional(),
    samletInntekt: z.number().min(0),
});

export const periodeMedInntektSchema = inntektSchema.extend({
    fraOgMed: isoDateStringSchema,
    tilOgMed: isoDateStringSchema,
    bekrefterInntekt: z.boolean(),
});
