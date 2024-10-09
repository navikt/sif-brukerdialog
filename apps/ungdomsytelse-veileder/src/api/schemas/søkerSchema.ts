import { parseMaybeDateStringToDate } from '@navikt/sif-common/src/utils/jsonParseUtils';
import { z } from 'zod';

export const søkerSchema = z.object({
    aktørId: z.string(),
    fødselsnummer: z.string(),
    fornavn: z.string(),
    etternavn: z.string(),
    mellomnavn: z
        .string()
        .optional()
        .nullable()
        .transform((v) => (v === null ? undefined : v)),
    fødselsdato: z.preprocess(parseMaybeDateStringToDate, z.date()),
});
