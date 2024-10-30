import { z } from 'zod';
import { isoDateStringSchema } from './isoDateStringSchema';

export const periodeMedInntektSchema = z.object({
    fraOgMed: isoDateStringSchema,
    tilOgMed: isoDateStringSchema,
    inntekt: z.number().min(0),
});
