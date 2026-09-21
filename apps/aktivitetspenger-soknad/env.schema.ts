import { commonEnvSchema, ungBrukerdialogApiEnvSchema, ungDeltakelseOpplyserEnvSchema } from '@navikt/sif-common-env';
import * as z from 'zod';

/**
 * Påkrevd fil for alle apper
 * For at disse skal bli tilgjengelige i appen, må denne filen oppdateres:
 * - appEnv.ts - på server
 * */

export enum AppEnvKey {
    SIF_PUBLIC_AKTIVITETSPENGER_INNSYN_URL = 'SIF_PUBLIC_AKTIVITETSPENGER_INNSYN_URL',
    SIF_PUBLIC_SEND_BESKJED = 'SIF_PUBLIC_SEND_BESKJED',
}

export const appEnvSchema = z
    .object({
        SIF_PUBLIC_AKTIVITETSPENGER_INNSYN_URL: z.url(),
        SIF_PUBLIC_SEND_BESKJED: z.url(),
    })
    .extend(commonEnvSchema.shape)
    .extend(ungDeltakelseOpplyserEnvSchema.shape)
    .extend(ungBrukerdialogApiEnvSchema.shape);

export type AppEnv = z.infer<typeof appEnvSchema>;
