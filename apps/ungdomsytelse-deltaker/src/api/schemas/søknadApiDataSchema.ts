import { z } from 'zod';

export const søknadApiDataSchema = z.object({
    id: z.string(),
    språk: z.string(),
    fraOgMed: z.string(),
    søkerNorskIdent: z.string(),
    kontonummerStemmer: z.boolean(),
    barnStemmer: z.boolean(),
    harBekreftetOpplysninger: z.boolean(),
    harForståttRettigheterOgPlikter: z.boolean(),
});
