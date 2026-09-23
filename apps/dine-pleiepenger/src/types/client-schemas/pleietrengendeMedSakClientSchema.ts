import z from 'zod';

import { inntektsmeldingClientSchema } from './inntektsmeldingClientSchema';
import { pleietrengendeClientSchema } from './pleietrengendeClientSchema';
import { sakClientSchema } from './sakClientSchema';

export const pleietrengendeMedSakClientSchema = z.object({
    pleietrengende: pleietrengendeClientSchema,
    sak: sakClientSchema,
    inntektsmeldinger: z.array(inntektsmeldingClientSchema).default([]),
});
