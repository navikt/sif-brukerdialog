import { z } from 'zod';
import { deltakelseSchema } from '../schemas/deltakelseSchema';
import { deltakelserSchema } from '../schemas/deltakelserSchema';
import { deltakelseRequestSchema } from '../schemas/deltakelseRequestSchema';
import { personSchema } from '../schemas/personSchema';

export type Deltakelse = z.infer<typeof deltakelseSchema>;
export type Deltakelser = z.infer<typeof deltakelserSchema>;
export type DeltakelseRequestDTO = z.infer<typeof deltakelseRequestSchema>;
export type Person = z.infer<typeof personSchema>;
