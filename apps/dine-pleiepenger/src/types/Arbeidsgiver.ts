import { z } from 'zod';
import { ArbeidsgiverSchema } from '../server/api-models/ArbeidsgiverSchema';

export type Arbeidsgiver = z.infer<typeof ArbeidsgiverSchema>;
