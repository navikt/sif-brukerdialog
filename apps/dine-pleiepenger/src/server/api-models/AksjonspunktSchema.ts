import { z } from 'zod';

export type Aksjonspunkt = z.infer<typeof AksjonspunktSchema>;

export const AksjonspunktSchema = z.object({
    venteårsak: z.string(),
});
