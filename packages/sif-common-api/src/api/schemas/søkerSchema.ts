import { z } from 'zod';
import { parseMaybeDateStringToDate } from '../../utils/jsonParseUtils';

export const søkerResponseSchema = z.object({
    aktørId: z.string(),
    fødselsnummer: z.string(),
    fornavn: z.string(),
    etternavn: z.string(),
    mellomnavn: z
        .string()
        .nullable()
        .transform((v) => (v === null ? undefined : v))
        .optional(),
    fødselsdato: z.preprocess(parseMaybeDateStringToDate, z.date()),
});
