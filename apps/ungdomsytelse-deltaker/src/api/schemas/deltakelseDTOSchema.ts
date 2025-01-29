import { z } from 'zod';

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
                kanEndre: z.boolean().optional(),
                inntekt: z.number().optional().nullable(),
                fristForRapportering: z.string().optional().nullable(),
            }),
        )
        .optional()
        .nullable(),
});

export type DeltakelseDTO = z.infer<typeof deltakelseDTOSchema>;
