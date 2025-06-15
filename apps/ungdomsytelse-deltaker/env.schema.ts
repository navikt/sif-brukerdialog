import { commonEnvSchema, ungDeltakelseOpplyserEnvSchema } from '@navikt/sif-common-env';
import * as z from 'zod';

/**
 * For at disse skal bli tilgjengelige i appen, må disse filene oppdateres:
 * - appEnv.ts - på server
 * - getAppSettings.cjs (lokalt)
 *
 * I tillegg til at env filene må inneholde verdiene
 */

export enum AppEnvKey {
    'VELG_SCENARIO' = 'VELG_SCENARIO',
    'DEV_IS_STORYBOOK' = 'DEV_IS_STORYBOOK',
    'SIF_PUBLIC_URL_RETT_OG_PLIKT' = 'SIF_PUBLIC_URL_RETT_OG_PLIKT',
    'SIF_PUBLIC_URL_PERSONOPPLYSNINGER' = 'SIF_PUBLIC_URL_PERSONOPPLYSNINGER',
    'SIF_PUBLIC_URL_PERSONVERN' = 'SIF_PUBLIC_URL_PERSONVERN',
    'SIF_PUBLIC_URL_OM_UNGDOMSPROGRAMYTELSEN' = 'SIF_PUBLIC_URL_OM_UNGDOMSPROGRAMYTELSEN',
    'SIF_PUBLIC_URL_SKATTEETATEN' = 'SIF_PUBLIC_URL_SKATTEETATEN',
    'SIF_PUBLIC_MINSIDE_URL' = 'SIF_PUBLIC_MINSIDE_URL',
    'SIF_PUBLIC_URL_DOKUMENTARKIV' = 'SIF_PUBLIC_URL_DOKUMENTARKIV',
    'SIF_PUBLIC_URL_ENDRE_KONTONUMMER' = 'SIF_PUBLIC_URL_ENDRE_KONTONUMMER',
    'SIF_PUBLIC_URL_SKRIV_TIL_OSS' = 'SIF_PUBLIC_URL_SKRIV_TIL_OSS',
}

export const appEnvSchema = z
    .object({
        [AppEnvKey.VELG_SCENARIO]: z.string().optional(),
        [AppEnvKey.DEV_IS_STORYBOOK]: z.string().optional(),
        [AppEnvKey.SIF_PUBLIC_URL_RETT_OG_PLIKT]: z.string(),
        [AppEnvKey.SIF_PUBLIC_URL_PERSONOPPLYSNINGER]: z.string(),
        [AppEnvKey.SIF_PUBLIC_URL_PERSONVERN]: z.string(),
        [AppEnvKey.SIF_PUBLIC_URL_OM_UNGDOMSPROGRAMYTELSEN]: z.string(),
        [AppEnvKey.SIF_PUBLIC_URL_SKATTEETATEN]: z.string(),
        [AppEnvKey.SIF_PUBLIC_MINSIDE_URL]: z.string(),
        [AppEnvKey.SIF_PUBLIC_URL_DOKUMENTARKIV]: z.string(),
        [AppEnvKey.SIF_PUBLIC_URL_ENDRE_KONTONUMMER]: z.string(),
        [AppEnvKey.SIF_PUBLIC_URL_SKRIV_TIL_OSS]: z.string(),
    })
    .merge(commonEnvSchema)
    .merge(ungDeltakelseOpplyserEnvSchema);

export type AppEnv = z.infer<typeof appEnvSchema>;
