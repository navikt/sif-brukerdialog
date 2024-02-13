import { z } from 'zod';
import { YtelseSchema } from './YtelseSchema';
import { parseMaybeDateStringToDate } from '../../utils/jsonParseUtils';

export type K9FormatSøknad = z.infer<typeof K9FormatSøknadSchema>;

export enum Kildesystem {
    'søknadsdialog' = 'søknadsdialog',
    'endringsdialog' = 'endringsdialog',
}

export const K9FormatSøknadSchema = z.object({
    søknadId: z.string(),
    kildesystem: z.nativeEnum(Kildesystem).or(z.undefined()),
    mottattDato: z.preprocess(parseMaybeDateStringToDate, z.date()),
    ytelse: YtelseSchema,
});
