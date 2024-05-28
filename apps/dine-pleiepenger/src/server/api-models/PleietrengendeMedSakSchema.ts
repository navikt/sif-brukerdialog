import { z } from 'zod';
import { PleietrengendeAnonymisertSchema, PleietrengendeSchema } from './PleietrengendeSchema';
import { SakSchema } from './SakSchema';

export type PleietrengendeMedSak = z.infer<typeof PleietrengendeMedSakSchema>;

export const PleietrengendeMedSakSchema = z.object({
    pleietrengende: z.union([PleietrengendeSchema, PleietrengendeAnonymisertSchema]),
    sak: SakSchema,
});

export const PleietrengendeMedSakResponseSchema = z.array(PleietrengendeMedSakSchema);
