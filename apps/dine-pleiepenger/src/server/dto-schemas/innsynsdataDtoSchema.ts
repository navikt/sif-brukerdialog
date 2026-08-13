import z from 'zod';

import { zSakerMetadataDtoModified } from './sakerMetadataDtoModified';
import { søkerDtoSchema } from './søkerDtoSchema';

export const innsynsdataDtoSchema = z.object({
    søker: søkerDtoSchema,
    sakerMetadata: zSakerMetadataDtoModified.array(),
    harSak: z.boolean(),
});

export type InnsynsdataDto = z.infer<typeof innsynsdataDtoSchema>;
