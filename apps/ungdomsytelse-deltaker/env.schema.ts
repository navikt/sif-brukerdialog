import { commonEnvSchema, ungDeltakelseOpplyserEnvSchema } from '@navikt/sif-common-env';
import * as z from 'zod';

export enum AppEnvKey {
    'SIF_PUBLIC_PERSONALIA_URL' = 'SIF_PUBLIC_PERSONALIA_URL',
    'VELG_SCENARIO' = 'VELG_SCENARIO',
}

export const appEnvSchema = z
    .object({
        [AppEnvKey.SIF_PUBLIC_PERSONALIA_URL]: z.string().min(1),
        [AppEnvKey.VELG_SCENARIO]: z.string().optional(),
    })
    .merge(commonEnvSchema)
    .merge(ungDeltakelseOpplyserEnvSchema);

export type AppEnv = z.infer<typeof appEnvSchema>;
