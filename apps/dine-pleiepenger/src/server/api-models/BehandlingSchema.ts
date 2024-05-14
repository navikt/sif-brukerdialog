import { z } from 'zod';
import { AksjonspunktSchema } from './AksjonspunktSchema';
import { InnsendelseSchema } from './InnsendelseSchema';
import { Behandlingsstatus } from './Behandlingsstatus';
import { parseMaybeDateStringToDate } from '../../utils/jsonParseUtils';

export type Behandling = z.infer<typeof BehandlingSchema>;

export const BehandlingSchema = z.object({
    status: z.nativeEnum(Behandlingsstatus),
    innsendelser: z.array(InnsendelseSchema),
    opprettetTidspunkt: z.preprocess(parseMaybeDateStringToDate, z.date()).or(z.undefined()).or(z.null()),
    avsluttetTidspunkt: z.preprocess(parseMaybeDateStringToDate, z.date()).or(z.undefined()).or(z.null()),
    aksjonspunkter: z.array(AksjonspunktSchema),
});
