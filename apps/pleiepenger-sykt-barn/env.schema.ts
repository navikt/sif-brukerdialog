import { commonEnvSchema } from '@navikt/sif-common-env';
import * as z from 'zod';

export const appEnvSchema = commonEnvSchema.extend({
    MOCK_DATE: z.string().optional(),
    USE_MOCK_DATE: z.string().optional(),
    SIF_PUBLIC_INNSYN_URL: z.string(),
    SIF_PUBLIC_FEATURE_VIS_SPM_SLUTTET_I_PERIODE: z.enum(['on', 'off']).optional(),
    SIF_PUBLIC_FEATURE_NORMALARBEIDST_IKKE_FRILANSER: z.enum(['on', 'off']).optional(),
});

export type AppEnv = z.infer<typeof appEnvSchema>;
