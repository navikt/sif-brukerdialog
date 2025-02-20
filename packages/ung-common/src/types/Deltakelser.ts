import { z } from 'zod';
import { deltakelseSchema } from './Deltakelse';

export const deltakelserSchema = z.array(deltakelseSchema);

export type Deltakelser = z.infer<typeof deltakelserSchema>;
