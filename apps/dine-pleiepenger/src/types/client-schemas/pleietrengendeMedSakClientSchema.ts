import z from 'zod';

import { pleietrengendeClientSchema } from './pleietrengendeClientSchema';
import { sakClientSchema } from './sakClientSchema';
import { inntektsmeldingClientSchema } from './inntektsmeldingClientSchema';

export const pleietrengendeMedSakClientSchema = z.object({
    pleietrengende: pleietrengendeClientSchema,
    sak: sakClientSchema,
    inntektsmeldinger: z.array(inntektsmeldingClientSchema).default([]),
});
