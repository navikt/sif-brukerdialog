import { z } from 'zod';

import { parseMaybeDateStringToDate } from '../../utils/jsonParseUtils';
import { AksjonspunktSchema } from './AksjonspunktSchema';
import { BehandlingSchema } from './BehandlingSchema';
import { Behandlingsstatus } from './Behandlingsstatus';

export type Sak = z.infer<typeof SakSchema>;

export const UtledetStatusSakSchema = z.object({
    status: z.nativeEnum(Behandlingsstatus),
    aksjonspunkter: z.array(AksjonspunktSchema),
    saksbehandlingsFrist: z.preprocess((val) => parseMaybeDateStringToDate(val), z.date().optional()),
});

export const SakSchema = z.object({
    saksnummer: z.string(),
    utledetStatus: UtledetStatusSakSchema,
    behandlinger: z.array(BehandlingSchema),
});
