import { ApplicationState } from '@navikt/appstatus-react-ds/src/hooks/useGetApplicationStatus';
import z from 'zod';

import { zSakerMetadataDtoModified } from './sakerMetadataDtoModified';
import { søkerDtoSchema } from './søkerDtoSchema';

export const innsynsdataDtoSchema = z.object({
    søker: søkerDtoSchema,
    appStatus: z.custom<ApplicationState>().optional(),
    sakerMetadata: zSakerMetadataDtoModified.array(),
    harSak: z.boolean(),
});

export type InnsynsdataDto = z.infer<typeof innsynsdataDtoSchema>;
