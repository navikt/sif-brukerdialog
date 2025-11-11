import { z } from 'zod';

import { parseMaybeDateStringToDate } from '../../utils/jsonParseUtils';

export type Pleietrengende = z.infer<typeof PleietrengendeSchema>;

const BasePleietrengendeSchema = z.object({
    aktørId: z.string(),
    fødselsdato: z.preprocess((val) => parseMaybeDateStringToDate(val), z.date()),
    identitetsnummer: z.string(),
});

// Schema that infers anonymisert from presence of name fields if not provided
const PleietrengendeSchemaWithInference = BasePleietrengendeSchema.extend({
    fornavn: z.string().optional(),
    mellomnavn: z.union([z.string(), z.null(), z.undefined()]).optional(),
    etternavn: z.string().optional(),
    anonymisert: z.boolean().optional(),
}).transform((data) => {
    // Infer anonymisert if not provided by backend
    const hasName = data.fornavn != null && data.fornavn !== '' && data.etternavn != null && data.etternavn !== '';
    const anonymisert = data.anonymisert ?? !hasName;
    
    // Transform null to undefined for consistency
    const fornavn = data.fornavn === null ? undefined : data.fornavn;
    const mellomnavn = data.mellomnavn === null ? undefined : data.mellomnavn;
    const etternavn = data.etternavn === null ? undefined : data.etternavn;
    
    return {
        ...data,
        fornavn,
        mellomnavn,
        etternavn,
        anonymisert,
    };
});

// Use discriminated union for type safety after transformation
export const PleietrengendeSchema = PleietrengendeSchemaWithInference.pipe(
    z.discriminatedUnion('anonymisert', [
        // Ikke-anonymisert: har navn-felter
        z.object({
            aktørId: z.string(),
            fødselsdato: z.date(),
            identitetsnummer: z.string(),
            anonymisert: z.literal(false),
            fornavn: z.string(),
            mellomnavn: z.union([z.string(), z.undefined()]),
            etternavn: z.string(),
        }),
        // Anonymisert: mangler navn-felter
        z.object({
            aktørId: z.string(),
            fødselsdato: z.date(),
            identitetsnummer: z.string(),
            anonymisert: z.literal(true),
            fornavn: z.string().optional(),
            mellomnavn: z.string().optional(),
            etternavn: z.string().optional(),
        }),
    ]),
);
