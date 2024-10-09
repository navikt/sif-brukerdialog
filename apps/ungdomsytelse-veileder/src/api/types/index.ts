import { z } from 'zod';
import { deltakelseSchema } from '../schemas/deltakelseSchema';
import { deltakelserResponseSchema } from '../schemas/deltakelserSchema';
import { deltakelseRequestSchema } from '../schemas/deltakelseRequestSchema';

export type Deltakelse = z.infer<typeof deltakelseSchema>;
export type Deltakelser = z.infer<typeof deltakelserResponseSchema>;
export type DeltakelseRequestDTO = z.infer<typeof deltakelseRequestSchema>;
