import { parseMaybeDateStringToDate } from '@navikt/sif-common-api';
import { z } from 'zod';

export const deltakerSchema = z.object({
    id: z.string(),
    deltakerIdent: z.string(),
    navn: z
        .object({
            fornavn: z.string(),
            etternavn: z.string(),
            mellomnavn: z
                .string()
                .optional()
                .nullable()
                .transform((v) => (v === null ? undefined : v)),
        })
        .optional()
        .default({ fornavn: 'ToDoFornavn', etternavn: 'ToDoEtternavn' }),
    fødselsdato: z.preprocess((val) => parseMaybeDateStringToDate(val), z.date()),
    førsteMuligeInnmeldingsdato: z.preprocess((val) => parseMaybeDateStringToDate(val), z.date()),
    sisteMuligeInnmeldingsdato: z.preprocess((val) => parseMaybeDateStringToDate(val), z.date()),
});
