import { z } from 'zod';

export const InnsendtSøknadArbeidsgiverSchema = z.object({
    erAnsatt: z.boolean(),
    navn: z.string(),
    organisasjonsnummer: z.string(),
    sluttetFørSøknadsperiode: z.preprocess((val) => (val === null ? undefined : val), z.boolean().optional()),
});
