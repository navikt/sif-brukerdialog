import { z } from 'zod';
import { AksjonspunktSchema } from './AksjonspunktSchema';
import { SøknadSchema } from './SøknadSchema';
import { Behandlingsstatus } from './Behandlingsstatus';
import { parseMaybeDateStringToDate } from '../../utils/jsonParseUtils';

export type Behandling = z.infer<typeof BehandlingSchema>;

export const BehandlingSchema = z.object({
    status: z.nativeEnum(Behandlingsstatus),
    søknader: z.array(SøknadSchema),
    opprettetDato: z.preprocess(parseMaybeDateStringToDate, z.date()).or(z.undefined()).or(z.null()),
    avsluttetDato: z.preprocess(parseMaybeDateStringToDate, z.date()).or(z.undefined()).or(z.null()),
    aksjonspunkter: z.array(AksjonspunktSchema),
});
