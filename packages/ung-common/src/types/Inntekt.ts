import { z } from 'zod';

export const inntektSchema = z.object({
    arbeidstakerOgFrilansInntekt: z.number().min(0).optional(),
    næringsinntekt: z.number().min(0).optional(),
    inntektFraYtelse: z.number().min(0).optional(),
    summertInntekt: z.number().min(0),
});

export type Inntekt = z.infer<typeof inntektSchema>;
