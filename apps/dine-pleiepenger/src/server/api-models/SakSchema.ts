import { z } from 'zod';
import { parseMaybeDateStringToDate } from '../../utils/jsonParseUtils';
import { BehandlingSchema } from './BehandlingSchema';

export type Sak = z.infer<typeof SakSchema>;

export const SakSchema = z.object({
    saksnummer: z.string(),
    saksbehandlingsFrist: z.union([
        z.preprocess((val) => parseMaybeDateStringToDate(val), z.date()),
        z.null(),
        z.undefined(),
    ]),
    behandlinger: z.array(BehandlingSchema),
});
