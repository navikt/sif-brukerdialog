import { z } from 'zod';

export const søknadApiDataSchema = z.object({
    id: z.string(),
    språk: z.string(),
    fraOgMed: z.string(),
    tilOgMed: z.string().optional(),
    søkerNorskIdent: z.string(),
    harBekreftetOpplysninger: z.boolean(),
    harForståttRettigheterOgPlikter: z.boolean(),
});
