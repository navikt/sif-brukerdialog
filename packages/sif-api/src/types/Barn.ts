import { zBarnOppslag, zBarnOppslagListe } from '@navikt/k9-brukerdialog-prosessering-api';
import { z } from 'zod';

import { zISODate } from '../schemas/zDateSchemas';

// Schema for barn oppdatert med date for fødselsdato
// mellomnavn overrides nullish → optional (null strippes av interceptor)
const registrertBarnSchema = zBarnOppslag.extend({
    fødselsdato: zISODate,
    mellomnavn: z.string().optional(),
});

export const registrerteBarnListeSchema = zBarnOppslagListe.extend({
    barn: z.array(registrertBarnSchema),
});

// Eksportere type med nytt navn
export type RegistrertBarn = z.infer<typeof registrertBarnSchema>;
