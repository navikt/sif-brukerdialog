import { commonEnvSchema, ungBrukerdialogApiEnvSchema, ungDeltakelseOpplyserEnvSchema } from '@navikt/sif-common-env';
import * as z from 'zod';

/**
 * Påkrevd fil for alle apper
 * For at disse skal bli tilgjengelige i appen, må denne filen oppdateres:
 * - appEnv.ts - på server
 * */

export enum AppEnvKey {
    SIF_PUBLIC_URL_AKTIVITETSPENGER = 'SIF_PUBLIC_URL_AKTIVITETSPENGER',
    SIF_PUBLIC_URL_SAKSBEHANDLINGSTIDER = 'SIF_PUBLIC_URL_SAKSBEHANDLINGSTIDER',
}

export const appEnvSchema = z
    .object({
        SIF_PUBLIC_URL_AKTIVITETSPENGER: z.url(),
        SIF_PUBLIC_URL_SAKSBEHANDLINGSTIDER: z.url(),
    })
    .extend(commonEnvSchema.shape)
    .extend(ungDeltakelseOpplyserEnvSchema.shape)
    .extend(ungBrukerdialogApiEnvSchema.shape);

export type AppEnv = z.infer<typeof appEnvSchema>;
