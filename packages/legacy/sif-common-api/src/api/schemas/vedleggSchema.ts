import { z } from 'zod';

export const vedleggEksistensResponseSchema = z.array(
    z.object({
        vedleggId: z.string(),
        finnes: z.boolean(),
    }),
);
