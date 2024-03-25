import { z } from 'zod';
import { InnsendtSøknadArbeidsgiverSchema } from './InnsendtSøknadArbeidsgiverSchema';
import { OrganisasjonSchema } from './OrganisasjonSchema';

export const OrganisasjonerSchema = z.object({
    organisasjoner: z.array(OrganisasjonSchema),
});

export const InnsendtSøknadArbeidsgivereSchema = z.union([
    z.array(InnsendtSøknadArbeidsgiverSchema),
    OrganisasjonerSchema,
]);

export type InnsendtSøknadArbeidsgiver = z.infer<typeof InnsendtSøknadArbeidsgiverSchema>;
export type InnsendtSøknadArbeidsgivere = z.infer<typeof InnsendtSøknadArbeidsgivereSchema>;
