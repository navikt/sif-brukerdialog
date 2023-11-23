import { z } from 'zod';

export type Søker = z.infer<typeof SøkerSchema>;

export const SøkerSchema = z.object({
    fornavn: z.string(),
    mellomnavn: z.optional(z.string()),
    etternavn: z.string(),
    kjønn: z.string(),
    fødselsnummer: z.string(),
});
