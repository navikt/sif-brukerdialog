import { baseEnvSchema, ungDeltakelseOpplyserEnvSchema } from '@navikt/sif-common-env';
import * as z from 'zod';

const localSchema = z.object({
    SIF_PUBLIC_USE_MSW: z
        .union([z.boolean(), z.string()])
        .optional()
        .transform((val) => (typeof val === 'boolean' ? val : val === 'true')),
});

export const appEnvSchema = baseEnvSchema.merge(ungDeltakelseOpplyserEnvSchema).merge(localSchema);

export type AppEnv = z.infer<typeof appEnvSchema>;
