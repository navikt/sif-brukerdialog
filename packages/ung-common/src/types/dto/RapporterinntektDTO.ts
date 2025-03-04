import { z } from 'zod';

export const oppgittInntektForPeriodeSchema = z.object({
    arbeidstakerOgFrilansInntekt: z.number().min(0).optional(),
    næringsinntekt: z.number().min(0).optional(),
    inntektFraYtelse: z.number().min(0).optional(),
    periodeForInntekt: z.object({
        fraOgMed: z.string().date(),
        tilOgMed: z.string().date(),
    }),
});

export const rapporterInntektDTOSchema = z.object({
    oppgittInntektForPeriode: oppgittInntektForPeriodeSchema,
    harBekreftetInntekt: z.boolean(),
});

export type RapporterInntektDTO = z.infer<typeof rapporterInntektDTOSchema>;
