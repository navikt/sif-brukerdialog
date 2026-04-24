import { commonEnvSchema, ungBrukerdialogApiEnvSchema, ungDeltakelseOpplyserEnvSchema } from '@navikt/sif-common-env';
import * as z from 'zod';

export enum AppEnvKey {
    'SIF_PUBLIC_NAIS_FRONTEND_TELEMETRY_COLLECTOR_URL' = 'SIF_PUBLIC_NAIS_FRONTEND_TELEMETRY_COLLECTOR_URL',
    'SIF_PUBLIC_USE_FARO' = 'SIF_PUBLIC_USE_FARO',
}

export const appEnvSchema = z
    .object({
        [AppEnvKey.SIF_PUBLIC_USE_FARO]: z.string().optional(),
        [AppEnvKey.SIF_PUBLIC_NAIS_FRONTEND_TELEMETRY_COLLECTOR_URL]: z.string().optional(),
    })
    .extend(commonEnvSchema.shape)
    .extend(ungDeltakelseOpplyserEnvSchema.shape)
    .extend(ungBrukerdialogApiEnvSchema.shape);

export type AppEnv = z.infer<typeof appEnvSchema>;
