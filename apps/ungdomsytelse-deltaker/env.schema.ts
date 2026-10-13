import { commonEnvSchema, ungBrukerdialogApiEnvSchema, ungDeltakelseOpplyserEnvSchema } from '@sif/env';
import * as z from 'zod';

export const appEnvSchema = commonEnvSchema
    .extend(ungDeltakelseOpplyserEnvSchema.shape)
    .extend(ungBrukerdialogApiEnvSchema.shape);

export type AppEnv = z.infer<typeof appEnvSchema>;
