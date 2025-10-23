import { z } from 'zod';

import { Ettersendelsestype } from '../../types/EttersendelseType';
import { parseMaybeDateStringToDate } from '../../utils/jsonParseUtils';

export const K9FormatEttersendelseSchema = z.object({
    søknadId: z.string(),
    mottattDato: z.preprocess(parseMaybeDateStringToDate, z.date()),
    type: z.nativeEnum(Ettersendelsestype).optional().nullable(),
});
