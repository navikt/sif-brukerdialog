import { z } from 'zod';
import { søknadApiDataSchema } from '../schemas/søknadApiDataSchema';
import { deltakelseSchema, deltakelseSøktForSchema } from '../schemas/deltakelseSchema';
import { deltakelserResponseSchema } from '../schemas/deltakelserSchema';
import { periodeMedInntektSchema } from '../schemas/periodeMedInntektSchema';

export type SøknadApiData = z.infer<typeof søknadApiDataSchema>;
export type Deltakelse = z.infer<typeof deltakelseSchema>;
export type DeltakelseSøktFor = z.infer<typeof deltakelseSøktForSchema>;
export type Deltakelser = z.infer<typeof deltakelserResponseSchema>;
export type PeriodeMedInntekt = z.infer<typeof periodeMedInntektSchema>;
