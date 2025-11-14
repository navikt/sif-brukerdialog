import { z } from 'zod';

export const OrganisasjonSchema = z.object({
    navn: z.string().nullable(),
    organisasjonsnummer: z.string(),
});
