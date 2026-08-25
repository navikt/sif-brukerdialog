import { commonEnvSchema, k9SakInnsynEnvSchema } from '@navikt/sif-common-env';
import * as z from 'zod';

export const appEnvSchema = z
    .object({})
    .extend(commonEnvSchema.shape)
    .extend(k9SakInnsynEnvSchema.shape);

export type AppEnv = z.infer<typeof appEnvSchema>;
