import { z } from 'zod';

/** Kun for å type mock */
export const deltakelseDTOSchema = z.object({
    id: z.string(),
    programperiodeFraOgMed: z.string(),
    programperiodeTilOgMed: z.string(),
    harSøkt: z.boolean(),
    rapporteringsPerioder: z
        .array(
            z.object({
                fraOgMed: z.string(),
                tilOgMed: z.string(),
                harRapportert: z.boolean(),
                kanRapportere: z.boolean().optional(),
                inntekt: z
                    .object({
                        arbeidstakerOgFrilansInntekt: z.number().optional(),
                        næringsinntekt: z.number().optional(),
                        inntektFraYtelse: z.number().optional(),
                        summertInntekt: z.number(),
                    })
                    .optional()
                    .nullable(),
                fristForRapportering: z.string().optional().nullable(),
            }),
        )
        .optional()
        .nullable(),
});

export type DeltakelseDTO = z.infer<typeof deltakelseDTOSchema>;
