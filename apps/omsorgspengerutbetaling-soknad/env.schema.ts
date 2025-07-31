import { commonEnvSchema } from '@navikt/sif-common-env';
import * as z from 'zod';

export const appEnvSchema = commonEnvSchema;

export const appDevEnvSchema = appEnvSchema.extend({
    MOCK_DATE: z.string().optional(),
    USE_MOCK_DATE: z.string().optional(),
});

export type AppEnv = z.infer<typeof appEnvSchema>;
export type AppDevEnv = z.infer<typeof appDevEnvSchema>;
