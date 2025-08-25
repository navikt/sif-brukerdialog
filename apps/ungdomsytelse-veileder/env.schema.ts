import { baseEnvSchema, ungDeltakelseOpplyserEnvSchema } from '@navikt/sif-common-env';
import * as z from 'zod';

const localSchema = z.object({
    DEV_IS_STORYBOOK: z
        .union([z.boolean(), z.string()])
        .optional()
        .transform((val) => (typeof val === 'boolean' ? val : val === 'true'))
        .optional(),
    SIF_PUBLIC_API_BASE_URL: z.string(),
    SIF_PUBLIC_USE_FARO: z
        .union([z.boolean(), z.string()])
        .optional()
        .transform((val) => (typeof val === 'boolean' ? val : val === 'true')),
    SIF_PUBLIC_UMAMI_NETTSIDE_ID: z.string().optional(),
    SIF_PUBLIC_NAIS_FRONTEND_TELEMETRY_COLLECTOR_URL: z.string().optional(),
});

export const appEnvSchema = baseEnvSchema.merge(ungDeltakelseOpplyserEnvSchema).merge(localSchema);

export type AppEnv = z.infer<typeof appEnvSchema>;
