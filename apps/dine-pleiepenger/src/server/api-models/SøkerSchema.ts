import { z } from 'zod';

export type Søker = z.infer<typeof SøkerSchema>;

export const SøkerSchema = z.object({
    aktørId: z.string(),
    fornavn: z.string(),
    // mellomnavn: z.string() || z.null(),
    etternavn: z.string(),
    fødselsdato: z.string(),
    fødselsnummer: z.string(),
});
