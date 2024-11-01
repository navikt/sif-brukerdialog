import { z } from 'zod';

export const KursholderSchema = z.object({
    id: z.string(),
    navn: z.string(),
    godkjent: z.boolean(),
});

export type Kursholder = z.infer<typeof KursholderSchema>;
