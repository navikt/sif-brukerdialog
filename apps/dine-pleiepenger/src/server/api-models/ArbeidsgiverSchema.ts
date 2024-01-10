import { z } from 'zod';

export const ArbeidsgiverSchema = z.object({
    erAnsatt: z.boolean(),
    navn: z.string(),
    organisasjonsnummer: z.string(),
    sluttetFørSøknadsperiode: z.union([z.undefined(), z.boolean()]),
});
