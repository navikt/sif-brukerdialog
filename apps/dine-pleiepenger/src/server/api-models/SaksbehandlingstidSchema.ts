import { z } from 'zod';

export type Saksbehandlingstid = z.infer<typeof SaksbehandlingstidSchema>;

export const SaksbehandlingstidSchema = z.object({
    saksbehandlingstidUker: z.number(),
});
