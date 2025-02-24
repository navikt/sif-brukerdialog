import { z } from 'zod';
import { inntektSchema } from '../Inntekt';

export const inntektForPeriodeDTOSchema = z.object({
    oppgittInntektForPeriode: inntektSchema.extend({
        periodeForInntekt: z.object({
            fraOgMed: z.string().date(),
            tilOgMed: z.string().date(),
        }),
    }),
    harBekreftetInntekt: z.boolean(),
});
