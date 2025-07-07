import { zBarnOppslag, zBarnOppslagListe } from '@navikt/k9-brukerdialog-prosessering-api';
import { z } from 'zod';
import { parseMaybeDateStringToDate } from '../utils/dateUtils';

// Schema with proper date parsing for barn
export const barnOppslagSchema = zBarnOppslag.extend({
    fødselsdato: z.preprocess(parseMaybeDateStringToDate, z.date()),
});

export const barnOppslagListeSchema = zBarnOppslagListe.extend({
    barn: z.array(barnOppslagSchema),
});

// Types with parsed dates
export type BarnOppslag = z.infer<typeof barnOppslagSchema>;
export type BarnOppslagListe = z.infer<typeof barnOppslagListeSchema>;
