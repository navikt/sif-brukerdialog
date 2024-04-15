import { z } from 'zod';
import { PleietrengendeSchema } from './PleietrengendeSchema';
import { SakSchema } from './SakSchema';

export type PleietrengendeMedSak = z.infer<typeof PleietrengendeMedSakSchema>;

export const PleietrengendeMedSakSchema = z.object({
    pleietrengende: PleietrengendeSchema,
    sak: SakSchema,
});

export const PleietrengendeMedSakResponseSchema = z.array(PleietrengendeMedSakSchema);
