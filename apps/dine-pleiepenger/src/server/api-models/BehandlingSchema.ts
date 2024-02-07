import { z } from 'zod';
import { AksjonspunktSchema } from './AksjonspunktSchema';
import { SøknadSchema } from './SøknadSchema';

export type Behandling = z.infer<typeof BehandlingSchema>;

export const BehandlingSchema = z.object({
    status: z.string(),
    søknader: z.array(SøknadSchema),
    aksjonspunkter: z.array(AksjonspunktSchema),
});
