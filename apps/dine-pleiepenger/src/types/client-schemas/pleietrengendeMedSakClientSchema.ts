import z from 'zod';

import { pleietrengendeClientSchema } from './pleietrengendeClientSchema';
import { sakClientSchema } from './sakClientSchema';

export const pleietrengendeMedSakClientSchema = z.object({
    pleietrengende: pleietrengendeClientSchema,
    sak: sakClientSchema,
    inntektsmeldinger: z.array(z.any()).default([]), // TODO: Definer inntektsmeldingClientSchema og bruk her
});
