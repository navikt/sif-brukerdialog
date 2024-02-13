import { z } from 'zod';
import { parseMaybeDateStringToDate } from '../../utils/jsonParseUtils';

export type Pleietrengende = z.infer<typeof PleietrengendeSchema>;

export const PleietrengendeSchema = z.object({
    aktørId: z.string(),
    fornavn: z.string(),
    mellomnavn: z.union([z.string(), z.null(), z.undefined()]),
    etternavn: z.string(),
    fødselsdato: z.preprocess((val) => parseMaybeDateStringToDate(val), z.date()),
    identitetsnummer: z.string(),
});
