import { commonEnvSchema, ungDeltakelseOpplyserEnvSchema } from '@navikt/sif-common-env';
import * as z from 'zod';

const localSchema = z.object({
    isLocal: z.boolean().optional(),
});

export const appEnvSchema = commonEnvSchema.merge(ungDeltakelseOpplyserEnvSchema).merge(localSchema);

export type AppEnv = z.infer<typeof appEnvSchema>;
