import { z } from 'zod';
import { parseMaybeDateStringToDate } from '../../utils/jsonParseUtils';
import { BehandlingSchema } from './BehandlingSchema';
import { Behandlingsstatus } from './Behandlingsstatus';
import { AksjonspunktSchema } from './AksjonspunktSchema';

export type Sak = z.infer<typeof SakSchema>;

export const UtledetStatusSakSchema = z.object({
    status: z.nativeEnum(Behandlingsstatus),
    aksjonspunkter: z.array(AksjonspunktSchema),
    saksbehandlingsFrist: z.union([
        z.preprocess((val) => (val === null ? undefined : val), z.undefined() || z.string()),
        z.preprocess((val) => parseMaybeDateStringToDate(val), z.date()),
        z.undefined(),
    ]),
    // .nullable(),
});

export const SakSchema = z.object({
    saksnummer: z.string(),
    utledetStatus: UtledetStatusSakSchema,
    // saksbehandlingsFrist: z.union([
    //     z.preprocess((val) => (val === null ? undefined : val), z.undefined() || z.string()),
    //     z.preprocess((val) => parseMaybeDateStringToDate(val), z.date()),
    //     z.undefined(),
    // ]),
    behandlinger: z.array(BehandlingSchema),
});
