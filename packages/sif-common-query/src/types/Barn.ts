import { zBarnOppslag, zBarnOppslagListe } from '@navikt/k9-brukerdialog-prosessering-api';
import { z } from 'zod';

import { zISODate } from '../schemas/zDateSchemas';

// Schema for barn oppdatert med date for fødselsdato
const registrertBarnSchema = zBarnOppslag.extend({
    fødselsdato: zISODate,
});

export const registrerteBarnListeSchema = zBarnOppslagListe.extend({
    barn: z.array(registrertBarnSchema),
});

// Eksportere type med nytt navn
export type RegistrertBarn = z.infer<typeof registrertBarnSchema>;
