import { commonEnvSchema } from '@navikt/sif-common-env';
import * as z from 'zod';

export const appEnvSchema = commonEnvSchema;

export type AppEnv = z.infer<typeof appEnvSchema>;
