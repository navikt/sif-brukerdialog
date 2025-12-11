import { ApplicationState } from '@navikt/appstatus-react-ds/src/hooks/useGetApplicationStatus';
import { innsyn } from '@navikt/k9-sak-innsyn-api';
import z from 'zod';

import { søkerDtoSchema } from './søkerDtoSchema';

export const innsynsdataDtoSchema = z.object({
    søker: søkerDtoSchema,
    appStatus: z.custom<ApplicationState>().optional(),
    sakerMetadata: innsyn.zSakerMetadataDto.array(),
    harSak: z.boolean(),
});

export type InnsynsdataDto = z.infer<typeof innsynsdataDtoSchema>;
