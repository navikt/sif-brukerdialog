import { z } from 'zod';
import { parseMaybeDateStringToDate } from '../../utils/jsonParseUtils';
import { AksjonspunktSchema } from './AksjonspunktSchema';
import { Behandlingsstatus } from './Behandlingsstatus';
import { InnsendelseSchema } from './InnsendelseSchema';

export type Behandling = z.infer<typeof BehandlingSchema>;

export const BehandlingSchema = z.object({
    status: z.nativeEnum(Behandlingsstatus),
    innsendelser: z.array(InnsendelseSchema),
    harVedtak: z.boolean(),
    opprettetTidspunkt: z.preprocess(parseMaybeDateStringToDate, z.date()).or(z.undefined()).or(z.null()),
    avsluttetTidspunkt: z.preprocess(parseMaybeDateStringToDate, z.date()).or(z.undefined()).or(z.null()),
    aksjonspunkter: z.array(AksjonspunktSchema),
});
