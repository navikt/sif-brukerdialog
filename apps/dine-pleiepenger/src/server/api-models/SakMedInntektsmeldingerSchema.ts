import { z } from 'zod';

import { PleietrengendeMedSakSchema } from './PleietrengendeMedSakSchema';

export type SakMedInntektsmeldinger = z.infer<typeof SakMedInntektsmeldingerSchema>;

export const SakMedInntektsmeldingerSchema = PleietrengendeMedSakSchema.omit({
    pleietrengende: true,
});
