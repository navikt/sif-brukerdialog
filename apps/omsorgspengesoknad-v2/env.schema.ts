import { commonEnvSchema, k9SakInnsynEnvSchema } from '@navikt/sif-common-env';
import * as z from 'zod';

export enum AppEnvKey {
    'VELG_SCENARIO' = 'VELG_SCENARIO',
}

export const appEnvSchema = commonEnvSchema
    .extend(k9SakInnsynEnvSchema.shape)
    .extend({
        [AppEnvKey.VELG_SCENARIO]: z.string().optional(),
    });

export type AppEnv = z.infer<typeof appEnvSchema>;
