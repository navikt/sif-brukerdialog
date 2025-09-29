import { commonEnvSchema } from '@navikt/sif-common-env';
import * as z from 'zod';

export const appEnvSchema = commonEnvSchema.extend({
    SIF_PUBLIC_OMS_IKKE_TILSYN_URL: z.string().min(1),
    SIF_PUBLIC_USE_FARO: z.enum(['true', 'false']).optional(),
});

export type AppEnv = z.infer<typeof appEnvSchema>;
