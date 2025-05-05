import { commonEnvSchema, ungDeltakelseOpplyserEnvSchema } from '@navikt/sif-common-env';
import * as z from 'zod';

export enum AppEnvKey {
    'SIF_PUBLIC_PERSONALIA_URL' = 'SIF_PUBLIC_PERSONALIA_URL',
    'VELG_SCENARIO' = 'VELG_SCENARIO',
    'SIF_PUBLIC_URL_RETT_OG_PLIKT' = 'SIF_PUBLIC_URL_RETT_OG_PLIKT',
    'SIF_PUBLIC_URL_PERSONOPPLYSNINGER' = 'SIF_PUBLIC_URL_PERSONOPPLYSNINGER',
    'SIF_PUBLIC_URL_PERSONVERN' = 'SIF_PUBLIC_URL_PERSONVERN',
    'SIF_PUBLIC_URL_OM_UNGDOMSPROGRAMYTELSEN' = 'SIF_PUBLIC_URL_OM_UNGDOMSPROGRAMYTELSEN',
}

export const appEnvSchema = z
    .object({
        [AppEnvKey.SIF_PUBLIC_PERSONALIA_URL]: z.string().min(1),
        [AppEnvKey.VELG_SCENARIO]: z.string().optional(),
    })
    .merge(commonEnvSchema)
    .merge(ungDeltakelseOpplyserEnvSchema);

export type AppEnv = z.infer<typeof appEnvSchema>;
