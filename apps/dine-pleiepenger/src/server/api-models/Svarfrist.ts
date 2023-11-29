import { z } from 'zod';
import { parseMaybeDateStringToDate } from '../../utils/jsonParseUtils';

export type Svarfrist = z.infer<typeof SvarfristSchema>;

export const SvarfristSchema = z.object({
    frist: z.union([z.preprocess((val) => parseMaybeDateStringToDate(val), z.date()), z.undefined()]),
});
