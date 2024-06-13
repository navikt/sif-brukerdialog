import { z } from 'zod';
import { Kildesystem } from '../../types/Kildesystem';
import { parseMaybeDateStringToDate } from '../../utils/jsonParseUtils';
import { YtelseSchema } from './YtelseSchema';

export type k9FormatSøknad = z.infer<typeof k9FormatSøknadSchema>;

export const k9FormatSøknadSchema = z.object({
    søknadId: z.string(),
    mottattDato: z.preprocess(parseMaybeDateStringToDate, z.date()),
    ytelse: YtelseSchema,
    kildesystem: z.nativeEnum(Kildesystem).optional().nullable(),
});
