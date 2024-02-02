import { z } from 'zod';

export type SaksbehandlingstidUker = z.infer<typeof SaksbehandlingstidUkerSchema>;

export const SaksbehandlingstidUkerSchema = z.object({
    saksbehandlingstidUker: z.number(),
});
