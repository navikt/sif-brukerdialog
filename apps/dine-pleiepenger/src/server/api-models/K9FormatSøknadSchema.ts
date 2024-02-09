import { z } from 'zod';
import { YtelseSchema } from './YtelseSchema';
import { parseMaybeDateStringToDate } from '../../utils/jsonParseUtils';

export type K9FormatSøknad = z.infer<typeof K9FormatSøknadSchema>;

export const K9FormatSøknadSchema = z.object({
    søknadId: z.string(),
    mottattDato: z.preprocess(parseMaybeDateStringToDate, z.date()),
    ytelse: YtelseSchema,
});
