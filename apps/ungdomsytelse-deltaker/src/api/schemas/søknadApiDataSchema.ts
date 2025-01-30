import { z } from 'zod';
import { Søknadstype } from '../../types/Søknadstype';

export const søknadApiDataSchema = z.object({
    søknadstype: z.nativeEnum(Søknadstype),
    språk: z.enum(['nb', 'nn']),
    søknadId: z.string(),
    startdato: z.string(),
    søkerNorskIdent: z.string(),
    kontonummerStemmer: z.boolean(),
    barnStemmer: z.boolean(),
    harBekreftetOpplysninger: z.boolean(),
    harForståttRettigheterOgPlikter: z.boolean(),
    isInntektForPeriode: z.boolean(),
});
