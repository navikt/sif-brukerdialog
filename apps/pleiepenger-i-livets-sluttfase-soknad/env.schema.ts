import { commonEnvSchema } from '@sif/env';
import * as z from 'zod';

export const appEnvSchema = commonEnvSchema.extend({
    SIF_PUBLIC_FEATURE_SOKE_TIDLIGERE: z.enum(['on', 'off']),
});

export type AppEnv = z.infer<typeof appEnvSchema>;
