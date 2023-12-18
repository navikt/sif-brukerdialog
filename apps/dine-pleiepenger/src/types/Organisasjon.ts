import { z } from 'zod';
import { OrganisasjonSchema } from '../server/api-models/OrganisasjonSchema';

export type Organisasjon = z.infer<typeof OrganisasjonSchema>;
