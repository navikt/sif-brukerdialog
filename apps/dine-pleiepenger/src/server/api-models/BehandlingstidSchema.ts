import { z } from 'zod';

export type Behandlingstid = z.infer<typeof BehandlingstidSchema>;

export const BehandlingstidSchema = z.object({
    behandlingstid: z.object({
        uker: z.number(),
    }),
});
