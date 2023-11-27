import { z } from 'zod';
import { parseMaybeDateStringToDate } from '../../utils/jsonParseUtils';

export enum MellomlagringType {
    SØKNAD = 'SØKNAD',
    ENDRING = 'ENDRING',
}

export type MellomlagringModel = z.infer<typeof MellomlagringSchema>;

export const MellomlagringSchema = z.object({
    metadata: z.union([
        z.object({
            updatedTimestamp: z.preprocess((val) => parseMaybeDateStringToDate(val), z.date()),
        }),
        z.undefined(),
    ]),
});
