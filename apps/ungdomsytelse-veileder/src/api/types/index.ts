import { z } from 'zod';
import { deltakelseRequestSchema } from '../schemas/deltakelseRequestSchema';
import { deltakelserSchema } from '../schemas/deltakelserSchema';
import { deltakelseSchema } from '../schemas/deltakelseSchema';
import { deltakerOgDeltakelserSchema } from '../schemas/deltakerOgDeltakelserSchema';
import { deltakerSchema } from '../schemas/personSchema';

export type Deltakelse = z.infer<typeof deltakelseSchema>;
export type Deltakelser = z.infer<typeof deltakelserSchema>;
export type DeltakelseRequestDTO = z.infer<typeof deltakelseRequestSchema>;
export type Deltaker = z.infer<typeof deltakerSchema>;
export type DeltakerOgDeltakelser = z.infer<typeof deltakerOgDeltakelserSchema>;
