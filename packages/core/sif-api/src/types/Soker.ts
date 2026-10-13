import { zSøker } from '@navikt/k9-brukerdialog-prosessering-api';
import { z } from 'zod';

import { zISODate } from '../schemas/zDateSchemas';

export const søkerSchema = zSøker.extend({
    fornavn: z.string().min(1),
    etternavn: z.string().min(1),
    mellomnavn: z.string().optional(),
    fødselsdato: zISODate.optional().nullable(),
});

export type Søker = z.infer<typeof søkerSchema>;
