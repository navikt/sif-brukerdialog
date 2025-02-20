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
        .optional(),
});

export type Deltaker = z.infer<typeof deltakerSchema>;
