import { z } from 'zod';
import { parseMaybeDateStringToDate } from '../../utils/jsonParseUtils';

export type Søker = z.infer<typeof SøkerSchema>;

export const SøkerSchema = z.object({
    aktørId: z.string(),
    fornavn: z.string(),
    mellomnavn: z.union([z.string(), z.null(), z.undefined()]),
    etternavn: z.string(),
    fødselsdato: z.preprocess((val) => parseMaybeDateStringToDate(val), z.date()),
    fødselsnummer: z.string(),
});
