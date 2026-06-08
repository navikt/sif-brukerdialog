import { z } from 'zod';

export type SøkerDto = z.infer<typeof søkerDtoSchema>;

// Fra generert kode i k9-brukerdialog-prosessering-api, kopiert inn enn så lenge
export const søkerDtoSchema = z.object({
    aktørId: z.string(),
    fødselsdato: z.iso.date(),
    fødselsnummer: z.string(),
    fornavn: z.optional(z.string()),
    mellomnavn: z.optional(z.string()),
    etternavn: z.optional(z.string()),
});
