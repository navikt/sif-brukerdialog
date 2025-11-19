import z from 'zod';

import { sakClientSchema } from './sakClientSchema';

export const sakMedInntektsmeldingerClientSchema = z.object({
    sak: sakClientSchema,
    inntektsmeldinger: z.array(z.any()).default([]), // TODO: Definer inntektsmeldingClientSchema og bruk her
});
