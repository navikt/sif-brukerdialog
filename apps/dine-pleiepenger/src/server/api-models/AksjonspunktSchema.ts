import { z } from 'zod';

export const AksjonspunktSchema = z.object({
    venteårsak: z.string(),
});
