import { z } from 'zod';
import { isoDateStringSchema } from './isoDateStringSchema';

export const oppgittInntektForPeriodeSchema = z.object({
    arbeidstakerOgFrilansInntekt: z.number().min(0).optional(),
    næringsinntekt: z.number().min(0).optional(),
    inntektFraYtelse: z.number().min(0).optional(),
    periodeForInntekt: z.object({
        fraOgMed: isoDateStringSchema,
        tilOgMed: isoDateStringSchema,
    }),
});

export const inntektsrapporteringSchema = z.object({
    oppgittInntektForPeriode: oppgittInntektForPeriodeSchema,
    harBekreftetInntekt: z.boolean(),
});
