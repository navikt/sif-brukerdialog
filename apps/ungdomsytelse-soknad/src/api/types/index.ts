import { z } from 'zod';
import { søknadApiDataSchema } from '../schemas/søknadApiDataSchema';
import { deltakelseSchema } from '../schemas/deltakelseSchema';
import { deltakelserResponseSchema } from '../schemas/deltakelserSchema';

export type SøknadApiData = z.infer<typeof søknadApiDataSchema>;
export type Deltakelse = z.infer<typeof deltakelseSchema>;
export type Deltakelser = z.infer<typeof deltakelserResponseSchema>;
