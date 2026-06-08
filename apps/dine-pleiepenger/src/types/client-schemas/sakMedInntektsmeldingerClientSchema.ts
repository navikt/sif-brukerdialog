import z from 'zod';

import { inntektsmeldingerClientSchema } from './inntektsmeldingClientSchema';
import { sakClientSchema } from './sakClientSchema';

export const sakMedInntektsmeldingerClientSchema = z.object({
    sak: sakClientSchema,
    inntektsmeldinger: inntektsmeldingerClientSchema,
});
