import { z } from 'zod';

export const OrganisasjonSchema = z.object({
    navn: z.string(),
    organisasjonsnummer: z.string(),
});
