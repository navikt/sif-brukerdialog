import { commonEnvSchema, k9SakInnsynEnvSchema } from '@navikt/sif-common-env';
import * as z from 'zod';

export const appEnvSchema = commonEnvSchema.merge(k9SakInnsynEnvSchema).extend({
    INJECT_DECORATOR: z.enum(['true', 'false']).optional(),
});

export type AppEnv = z.infer<typeof appEnvSchema>;
