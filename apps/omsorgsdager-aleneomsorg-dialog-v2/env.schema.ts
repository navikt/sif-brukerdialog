import { commonEnvSchema } from '@sif/env';
import { z } from 'zod';

export const appEnvSchema = commonEnvSchema.extend({
    SIF_PUBLIC_OMS_IKKE_TILSYN_URL: z.string().min(1),
});

export type AppEnv = ReturnType<(typeof appEnvSchema)['parse']>;
