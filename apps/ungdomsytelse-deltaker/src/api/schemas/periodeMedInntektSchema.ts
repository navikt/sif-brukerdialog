import { z } from 'zod';
import { isoDateStringSchema } from './isoDateStringSchema';

export const periodeMedInntektSchema = z.object({
    fraOgMed: isoDateStringSchema,
    tilOgMed: isoDateStringSchema,
    inntektAnsatt: z.number().min(0).optional(),
    inntektSN: z.number().min(0).optional(),
    inntektYtelse: z.number().min(0).optional(),
    samletInntekt: z.number().min(0),
    bekrefterInntekt: z.boolean(),
});
