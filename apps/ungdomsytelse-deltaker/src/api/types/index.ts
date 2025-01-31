import { z } from 'zod';
import { deltakelserSchema } from '../schemas/deltakelserSchema';
import { deltakelseSchema, rapporteringsperiodeSchema } from '../schemas/deltakelseSchema';
import { periodeMedInntektSchema } from '../schemas/periodeMedInntektSchema';
import { søknadApiDataSchema } from '../schemas/søknadApiDataSchema';
import { inntektSchema } from '../schemas/inntektSchema';

export type Deltakelse = z.infer<typeof deltakelseSchema>;
export type Deltakelser = z.infer<typeof deltakelserSchema>;
export type PeriodeMedInntekt = z.infer<typeof periodeMedInntektSchema>;
export type Inntekt = z.infer<typeof inntektSchema>;
export type Rapporteringsperiode = z.infer<typeof rapporteringsperiodeSchema>;
export type SøknadApiData = z.infer<typeof søknadApiDataSchema>;
