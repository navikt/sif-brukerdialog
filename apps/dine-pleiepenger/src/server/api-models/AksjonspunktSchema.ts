import { z } from 'zod';
import { Venteårsak } from '../../types/Venteårsak';

export type Aksjonspunkt = z.infer<typeof AksjonspunktSchema>;

export const AksjonspunktSchema = z.object({
    venteårsak: z.nativeEnum(Venteårsak),
});
