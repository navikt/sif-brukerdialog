import { z } from 'zod';

import { parseMaybeDateStringToDate } from '../../utils/jsonParseUtils';

export type Pleietrengende = z.infer<typeof PleietrengendeSchema>;

const BasePleietrengendeSchema = z.object({
    aktørId: z.string(),
    fødselsdato: z.preprocess((val) => parseMaybeDateStringToDate(val), z.date()),
    identitetsnummer: z.string(),
});

export const PleietrengendeSchema = z.union([
    // Ikke-anonymisert: har navn-felter
    BasePleietrengendeSchema.extend({
        fornavn: z.string(),
        mellomnavn: z.union([z.string(), z.null(), z.undefined()]),
        etternavn: z.string(),
        anonymisert: z.preprocess(() => false, z.literal(false)),
    }),
    // Anonymisert: mangler navn-felter (undefined)
    BasePleietrengendeSchema.extend({
        fornavn: z.undefined().optional(),
        mellomnavn: z.undefined().optional(),
        etternavn: z.undefined().optional(),
        anonymisert: z.preprocess(() => true, z.literal(true)),
    }),
]);
