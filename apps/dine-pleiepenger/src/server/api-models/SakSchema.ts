import { z } from 'zod';
import { parseMaybeDateStringToDate } from '../../utils/jsonParseUtils';

export type Sak = z.infer<typeof SakSchema>;

export const SakSchema = z.object({
    saksbehandlingsFrist: z.union([z.preprocess((val) => parseMaybeDateStringToDate(val), z.date()), z.undefined()]),
});
