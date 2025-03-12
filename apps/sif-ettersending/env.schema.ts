import { commonEnvSchema } from '@navikt/sif-common-env';
import * as z from 'zod';

export const appEnvSchema = commonEnvSchema.extend({
    SIF_PUBLIC_ENDRINGSMELDING_PP: z.string().min(1),
    SIF_PUBLIC_INNSYN_PP: z.string().min(1),
    SIF_PUBLIC_PLEIEPENGER_SYKT_BARN_URL: z.string().min(1),
    SIF_PUBLIC_FEATURE_NYNORSK: z.enum(['on', 'off']).optional(),
    SIF_PUBLIC_FEATURE_OPPLARINGSPENGER: z.enum(['on', 'off']).optional(),
});

export type AppEnv = z.infer<typeof appEnvSchema>;
