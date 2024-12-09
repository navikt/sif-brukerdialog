import { z } from 'zod';

const navnSchema = z.object({
    fornavn: z.string(),
    etternavn: z.string(),
    mellomnavn: z.string().optional(),
});

export type Navn = z.infer<typeof navnSchema>;
