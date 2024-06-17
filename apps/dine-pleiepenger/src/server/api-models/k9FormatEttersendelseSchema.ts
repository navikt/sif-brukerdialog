import { z } from 'zod';
import { parseMaybeDateStringToDate } from '../../utils/jsonParseUtils';
import { Ettersendelsestype } from '../../types/EttersendelseType';

export const K9FormatEttersendelseSchema = z.object({
    søknadId: z.string(),
    mottattDato: z.preprocess(parseMaybeDateStringToDate, z.date()),
    type: z.nativeEnum(Ettersendelsestype),
});
