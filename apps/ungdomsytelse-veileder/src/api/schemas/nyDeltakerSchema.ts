import { z } from 'zod';

export const nyDeltakerSchema = z.object({
    id: z.null().optional(),
    deltakerIdent: z.string(),
    navn: z.object({
        fornavn: z.string(),
        etternavn: z.string(),
        mellomnavn: z
            .string()
            .optional()
            .nullable()
            .transform((v) => (v === null ? undefined : v)),
    }),
});
