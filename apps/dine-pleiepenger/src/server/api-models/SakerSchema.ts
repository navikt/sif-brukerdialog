import { z } from 'zod';
import { SakSchema } from './SakSchema';

export type Saker = z.infer<typeof SakerSchema>;

export const SakerSchema = z.array(SakSchema);
