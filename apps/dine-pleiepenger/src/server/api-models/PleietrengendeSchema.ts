import { z } from 'zod';

import { parseMaybeDateStringToDate } from '../../utils/jsonParseUtils';

export type Pleietrengende = z.infer<typeof PleietrengendeSchema>;

const BasePleietrengendeSchema = z.object({
    aktørId: z.string(),
    fødselsdato: z.preprocess((val) => parseMaybeDateStringToDate(val), z.date()),
    identitetsnummer: z.string(),
});

const IkkeAnonymisertPleietrengendeSchema = BasePleietrengendeSchema.extend({
    fornavn: z.string(),
    mellomnavn: z.union([z.string(), z.null(), z.undefined()]),
    etternavn: z.string(),
    anonymisert: z.literal(false),
});

const AnonymisertPleietrengendeSchema = BasePleietrengendeSchema.extend({
    anonymisert: z.literal(true),
});

export const PleietrengendeSchema = z.preprocess(
    (data: any) => {
        // Sjekk om personen har navn (ikke-anonymisert)
        const harNavn = typeof data?.fornavn === 'string' && typeof data?.etternavn === 'string';

        if (harNavn) {
            // Ikke-anonymisert: behold data som den er
            return {
                ...data,
                anonymisert: false,
            };
        } else {
            // Anonymisert: fjern navn-felter
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { fornavn, mellomnavn, etternavn, ...rest } = data || {};
            return {
                ...rest,
                anonymisert: true,
            };
        }
    },
    z.union([IkkeAnonymisertPleietrengendeSchema, AnonymisertPleietrengendeSchema]),
);
