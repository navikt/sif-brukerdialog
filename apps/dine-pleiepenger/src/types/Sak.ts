import { z } from 'zod';
import { SakSchema } from '../server/api-models/SakSchema';

export type Sak = z.infer<typeof SakSchema>;
