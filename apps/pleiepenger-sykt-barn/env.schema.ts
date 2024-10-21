import { commonEnvSchema, sifInnsynEnvSchema } from '@navikt/sif-common-env';
import * as z from 'zod';

export const appEnvSchema = commonEnvSchema.merge(sifInnsynEnvSchema).extend({
    SIF_PUBLIC_INNSYN_URL: z.string(),
    MOCK_DATE: z.string().optional(),
    USE_MOCK_DATE: z.string().optional(),
});

export type AppEnv = z.infer<typeof appEnvSchema>;
