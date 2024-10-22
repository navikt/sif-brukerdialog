import { commonEnvSchema } from '@navikt/sif-common-env';
import * as z from 'zod';

export const appEnvSchema = commonEnvSchema.extend({});

export type AppEnv = z.infer<typeof appEnvSchema>;
