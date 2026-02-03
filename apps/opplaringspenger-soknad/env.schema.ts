import { commonEnvSchema, k9SakInnsynEnvSchema } from '@navikt/sif-common-env';
import * as z from 'zod';

const localSchema = z.object({
    SIF_PUBLIC_FEATURE_TOGGLE_FRAVÆR_FRA_ARBEID: z.string().optional().default('off'),
});

export const appEnvSchema = commonEnvSchema.merge(k9SakInnsynEnvSchema).merge(localSchema);

export type AppEnv = z.infer<typeof appEnvSchema>;
