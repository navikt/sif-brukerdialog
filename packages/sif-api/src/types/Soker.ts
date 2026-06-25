import { zSøker } from '@navikt/k9-brukerdialog-prosessering-api';
import { z } from 'zod';

export const søkerSchema = zSøker.extend({
    fornavn: z.string().min(1),
    etternavn: z.string().min(1),
    mellomnavn: z.string().optional(),
});

export type Søker = z.infer<typeof søkerSchema>;
