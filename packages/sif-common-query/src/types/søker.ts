import { zSøker } from '@navikt/k9-brukerdialog-prosessering-api';
import { z } from 'zod';
import { parseMaybeDateStringToDate } from '../utils/dateUtils';

export const søkerSchema = zSøker.extend({
    fornavn: z.string().min(1),
    etternavn: z.string().min(1),
    fødselsdato: z.preprocess(parseMaybeDateStringToDate, z.date()),
});

export type Søker = z.infer<typeof søkerSchema>;
