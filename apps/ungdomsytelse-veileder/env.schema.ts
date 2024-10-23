import { commonEnvSchema, ungDeltakelseOpplyserEnvSchema } from '@navikt/sif-common-env';
import * as z from 'zod';

export const appEnvSchema = commonEnvSchema.merge(ungDeltakelseOpplyserEnvSchema);

export type AppEnv = z.infer<typeof appEnvSchema>;
