import { z } from 'zod';
import { AksjonspunktSchema } from './AksjonspunktSchema';
import { SøknadSchema } from './SøknadSchema';
import { BehandlingStatus } from './BehandlingStatus';
import { parseMaybeDateStringToDate } from '../../utils/jsonParseUtils';

export type Behandling = z.infer<typeof BehandlingSchema>;

export const BehandlingSchema = z.object({
    status: z.nativeEnum(BehandlingStatus),
    søknader: z.array(SøknadSchema),
    opprettetDato: z.preprocess(parseMaybeDateStringToDate, z.date()),
    avsluttetDato: z.preprocess(parseMaybeDateStringToDate, z.date()).or(z.undefined()),
    aksjonspunkter: z.array(AksjonspunktSchema),
});
