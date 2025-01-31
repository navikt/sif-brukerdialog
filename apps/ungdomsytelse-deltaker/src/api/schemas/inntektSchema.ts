import { z } from 'zod';

export const inntektSchema = z.object({
    inntektAnsatt: z.number().min(0).optional(),
    inntektSN: z.number().min(0).optional(),
    inntektYtelse: z.number().min(0).optional(),
    summertInntekt: z.number().min(0),
});
