import { commonEnvSchema, k9SakInnsynEnvSchema } from '@navikt/sif-common-env';
import * as z from 'zod';

export const appEnvSchema = commonEnvSchema.merge(k9SakInnsynEnvSchema);

export type AppEnv = z.infer<typeof appEnvSchema>;
