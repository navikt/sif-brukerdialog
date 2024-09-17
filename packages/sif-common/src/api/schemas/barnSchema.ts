import { z } from 'zod';
import { parseMaybeDateStringToDate } from '../../utils/jsonParseUtils';

export const barnSchema = z.object({
    aktørId: z.string(),
    fornavn: z.string(),
    etternavn: z.string(),
    mellomnavn: z
        .string()
        // .optional()
        .nullable()
        .transform((v) => (v === null ? undefined : v)),
    fødselsdato: z.preprocess(parseMaybeDateStringToDate, z.date()),
});

export const barnResponseSchema = z.object({
    barn: z.array(barnSchema),
});
