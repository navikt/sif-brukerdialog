import { zSøker } from '@navikt/k9-brukerdialog-prosessering-api';
import { z } from 'zod';
import { jsonParseUtils } from '../utils/jsonParseUtils';

export const søkerSchema = zSøker.extend({
    fornavn: z.string().min(1),
    etternavn: z.string().min(1),
    fødselsdato: z.preprocess(jsonParseUtils.parseMaybeDateStringToDate, z.date()),
});

export type Søker = z.infer<typeof søkerSchema>;
