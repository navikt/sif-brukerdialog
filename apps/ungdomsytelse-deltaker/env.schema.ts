import { commonEnvSchema, ungBrukerdialogApiEnvSchema, ungDeltakelseOpplyserEnvSchema } from '@navikt/sif-common-env';
import * as z from 'zod';

export enum AppEnvKey {
}

export const appEnvSchema = z
    .object({
    })
    .extend(commonEnvSchema.shape)
    .extend(ungDeltakelseOpplyserEnvSchema.shape)
    .extend(ungBrukerdialogApiEnvSchema.shape);

export type AppEnv = z.infer<typeof appEnvSchema>;
