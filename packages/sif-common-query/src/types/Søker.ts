import { zSøker } from '@navikt/k9-brukerdialog-prosessering-api';
import { z } from 'zod';

import { zNullableISODate } from '../schemas/zJsonDateSchemas';

export const søkerSchema = zSøker.extend({
    fornavn: z.string().min(1),
    etternavn: z.string().min(1),
    fødselsdato: zNullableISODate,
});

export type Søker = z.infer<typeof søkerSchema>;
