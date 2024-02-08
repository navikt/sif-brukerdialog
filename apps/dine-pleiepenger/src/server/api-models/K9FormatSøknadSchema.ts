import { z } from 'zod';
import { YtelseSchema } from './YtelseSchema';
import { parseMaybeDateStringToDate } from '../../utils/jsonParseUtils';

export type K9FormatSøknad = z.infer<typeof K9FormatSøknadSchema>;

export const K9FormatSøknadSchema = z.object({
    søknadId: z.string(),
    // versjon: z.string(),
    mottattDato: z.preprocess((val) => parseMaybeDateStringToDate(val), z.date()),
    // søker: z.object({
    //     norskIdentitetsnummer: z.string(),
    // }),
    ytelse: YtelseSchema,
});
