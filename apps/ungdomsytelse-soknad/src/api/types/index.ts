import { z } from 'zod';
import { søknadApiDataSchema } from '../schemas/søknadApiDataSchema';

export type SøknadApiData = z.infer<typeof søknadApiDataSchema>;
