import { zBarnOppslag, zBarnOppslagListe } from '@navikt/k9-brukerdialog-prosessering-api';
import { z } from 'zod';
import { parseMaybeDateStringToDate } from '../utils/dateUtils';

// Schema for barn oppdatert med date for fødselsdato
const registrertBarnSchema = zBarnOppslag.extend({
    fødselsdato: z.preprocess(parseMaybeDateStringToDate, z.date()),
});

export const registrerteBarnListeSchema = zBarnOppslagListe.extend({
    barn: z.array(registrertBarnSchema),
});

// Eksportere type med nytt navn
export type RegistrertBarn = z.infer<typeof registrertBarnSchema>;
