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
    // Anonymisert: mangler navn-felter (transformerer null til undefined)
    BasePleietrengendeSchema.extend({
        fornavn: z.preprocess((val) => (val === null ? undefined : val), z.string().optional()),
        mellomnavn: z.preprocess((val) => (val === null ? undefined : val), z.string().optional()),
        etternavn: z.preprocess((val) => (val === null ? undefined : val), z.string().optional()),
        anonymisert: z.preprocess(() => true, z.literal(true)),
    }),
]);
