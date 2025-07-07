import { zSøker } from '@navikt/k9-brukerdialog-prosessering-api';
import { z } from 'zod';
import { parseMaybeDateStringToDate } from '../utils/dateUtils';

export const søkerResponseSchema = zSøker.extend({
    fødselsdato: z.preprocess(parseMaybeDateStringToDate, z.date()),
});

export type Søker = z.infer<typeof søkerResponseSchema>;
