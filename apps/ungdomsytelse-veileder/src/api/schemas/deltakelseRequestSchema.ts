import { z } from 'zod';

export const deltakelseRequestSchema = z.object({
    id: z.string(),
    deltakerId: z.string(),
    fraOgMed: z.string(),
    tilOgMed: z.string().optional(),
});
