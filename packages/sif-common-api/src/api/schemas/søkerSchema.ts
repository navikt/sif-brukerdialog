import { z } from 'zod';

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
    fødselsdato: z.iso.date(),
});
