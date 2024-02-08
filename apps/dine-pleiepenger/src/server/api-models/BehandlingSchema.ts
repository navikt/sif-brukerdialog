import { z } from 'zod';
import { AksjonspunktSchema } from './AksjonspunktSchema';
import { SøknadSchema } from './SøknadSchema';
import { BehandlingStatus } from '../../types/BehandlingStatus';
import { parseMaybeDateStringToDate } from '../../utils/jsonParseUtils';

export type Behandling = z.infer<typeof BehandlingSchema>;

export const BehandlingSchema = z.object({
    status: z.nativeEnum(BehandlingStatus),
    søknader: z.array(SøknadSchema),
    opprettetDato: z.preprocess((val) => parseMaybeDateStringToDate(val), z.date()),
    aksjonspunkter: z.array(AksjonspunktSchema),
});
