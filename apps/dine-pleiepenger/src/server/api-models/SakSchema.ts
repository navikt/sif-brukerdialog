import { z } from 'zod';
import { parseMaybeDateStringToDate } from '../../utils/jsonParseUtils';
import { BehandlingSchema } from './BehandlingSchema';

export type Sak = z.infer<typeof SakSchema>;

export const SakSchema = z.object({
  saksnummer: z.string(),
  saksbehandlingsFrist: z.union([
    z.preprocess((val) => {
      // Ensure only non-null string values are processed
      if (val === null || typeof val !== 'string') return undefined;

      // Attempt to parse the date string, handling any errors gracefully
      try {
        const date = parseMaybeDateStringToDate(val);
        return date;
      } catch (error) {
        console.error(`Error parsing date: ${error}`);
        return undefined;
      }
    }, z.date()),
    z.undefined(),
  ]),
  behandlinger: z.array(BehandlingSchema),
});

