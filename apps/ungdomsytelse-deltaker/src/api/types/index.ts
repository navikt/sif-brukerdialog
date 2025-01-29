import { z } from 'zod';
import { deltakelserSchema } from '../schemas/deltakelserSchema';
import { deltakelseSchema, rapporteringsperiodeSchema } from '../schemas/deltakelseSchema';
import { inntektSchema, periodeMedInntektSchema } from '../schemas/periodeMedInntektSchema';

export type Deltakelse = z.infer<typeof deltakelseSchema>;
export type Deltakelser = z.infer<typeof deltakelserSchema>;
export type PeriodeMedInntekt = z.infer<typeof periodeMedInntektSchema>;
export type Inntekt = z.infer<typeof inntektSchema>;
export type Rapporteringsperiode = z.infer<typeof rapporteringsperiodeSchema>;
