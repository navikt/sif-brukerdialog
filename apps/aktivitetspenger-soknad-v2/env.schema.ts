import { commonEnvSchema, ungDeltakelseOpplyserEnvSchema } from '@navikt/sif-common-env';
import * as z from 'zod';

/**
 * Påkrevd fil for alle apper
 * For at disse skal bli tilgjengelige i appen, må denne filen oppdateres:
 * - appEnv.ts - på server
 * */

export enum AppEnvKey {
    'VELG_SCENARIO' = 'VELG_SCENARIO',
    'SIF_PUBLIC_URL_SKATTEETATEN' = 'SIF_PUBLIC_URL_SKATTEETATEN',
    'SIF_PUBLIC_NAIS_FRONTEND_TELEMETRY_COLLECTOR_URL' = 'SIF_PUBLIC_NAIS_FRONTEND_TELEMETRY_COLLECTOR_URL',
    'SIF_PUBLIC_USE_FARO' = 'SIF_PUBLIC_USE_FARO',
}

export const appEnvSchema = z
    .object({
        [AppEnvKey.VELG_SCENARIO]: z.string().optional(),
        [AppEnvKey.SIF_PUBLIC_USE_FARO]: z.string().optional(),
        [AppEnvKey.SIF_PUBLIC_NAIS_FRONTEND_TELEMETRY_COLLECTOR_URL]: z.string().optional(),
        [AppEnvKey.SIF_PUBLIC_URL_SKATTEETATEN]: z.string(),
    })
    .extend(commonEnvSchema.shape)
    .extend(ungDeltakelseOpplyserEnvSchema.shape);

export type AppEnv = z.infer<typeof appEnvSchema>;
