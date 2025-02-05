import { commonEnvSchema } from '@navikt/sif-common-env';
import * as z from 'zod';

export const appEnvSchema = commonEnvSchema.extend({
    SIF_PUBLIC_INNSYN_URL: z.string(),
    MOCK_DATE: z.string().optional(),
    USE_MOCK_DATE: z.string().optional(),
    SIF_PUBLIC_FEATURE_NYNORSK: z.enum(['on', 'off']).optional(),
});

export type AppEnv = z.infer<typeof appEnvSchema>;
