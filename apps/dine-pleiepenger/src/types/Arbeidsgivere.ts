import { z } from 'zod';
import { ArbeidsgivereSchema } from '../server/api-models/ArbeidsgivereSchema';

export type Arbeidsgivere = z.infer<typeof ArbeidsgivereSchema>;
