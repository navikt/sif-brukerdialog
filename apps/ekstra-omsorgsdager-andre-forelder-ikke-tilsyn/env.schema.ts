import { commonEnvSchema } from '@sif/env';
import * as z from 'zod';

export const appEnvSchema = commonEnvSchema;

export type AppEnv = z.infer<typeof appEnvSchema>;
