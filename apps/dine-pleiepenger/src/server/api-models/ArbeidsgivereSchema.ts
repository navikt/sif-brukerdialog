import { z } from 'zod';
import { ArbeidsgiverSchema } from './ArbeidsgiverSchema';
import { OrganisasjonSchema } from './OrganisasjonSchema';

export const OrganisasjonerSchema = z.object({
    organisasjoner: z.array(OrganisasjonSchema),
});

export const ArbeidsgivereSchema = z.union([z.array(ArbeidsgiverSchema), OrganisasjonerSchema]);

export type Arbeidsgiver = z.infer<typeof ArbeidsgiverSchema>;
export type Arbeidsgivere = z.infer<typeof ArbeidsgivereSchema>;
