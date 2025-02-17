import { commonEnvSchema } from '@navikt/sif-common-env';
import * as z from 'zod';

export const appEnvSchema = commonEnvSchema.extend({
    SIF_PUBLIC_FEATURE_NYNORSK: z.enum(['on', 'off']),
    SIF_PUBLIC_FEATURE_SOKE_TRE_AAR_TILBAKE: z.enum(['on', 'off']),
});

export type AppEnv = z.infer<typeof appEnvSchema>;
