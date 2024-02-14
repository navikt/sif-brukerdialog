import { z } from 'zod';
import { SakSchema } from '../server/api-models/SakSchema';

export type Saker = z.infer<typeof SakSchema>;
