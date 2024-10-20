import { commonEnvSchema, sifInnsynBrowserEnvSchema } from '@navikt/sif-common-env';
import * as z from 'zod';

export const appEnvSchema = commonEnvSchema.merge(sifInnsynBrowserEnvSchema).extend({
    MOCK_DATE: z.string().optional(),
    USE_MOCK_DATE: z.string().optional(),
});

export type AppEnv = z.infer<typeof appEnvSchema>;
