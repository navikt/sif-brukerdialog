import { z } from 'zod';
import { parseMaybeDateStringToDate } from '../../utils/jsonParseUtils';

export type Pleietrengende = z.infer<typeof PleietrengendeSchema> | z.infer<typeof PleietrengendeAnonymisertSchema>;

export const PleietrengendeSchema = z.object({
    aktørId: z.string(),
    fornavn: z.string(),
    mellomnavn: z.union([z.string(), z.null(), z.undefined()]),
    etternavn: z.string(),
    fødselsdato: z.preprocess((val) => parseMaybeDateStringToDate(val), z.date()),
    identitetsnummer: z.string(),
    anonymisert: z.preprocess(() => false, z.literal(false)),
});

export const PleietrengendeAnonymisertSchema = z.object({
    aktørId: z.string(),
    fødselsdato: z.preprocess((val) => parseMaybeDateStringToDate(val), z.date()),
    identitetsnummer: z.string(),
    anonymisert: z.preprocess(() => true, z.literal(true)),
});
