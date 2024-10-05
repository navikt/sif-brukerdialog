import { z } from 'zod';

export const søknadApiDataSchema = z.object({
    søknadId: z.string(),
    språk: z.string(),
    fraOgMed: z.string(),
    tilOgMed: z.string(),
    søkerNorskIdent: z.string(),
    harBekreftetOpplysninger: z.boolean(),
    harForståttRettigheterOgPlikter: z.boolean(),
});
