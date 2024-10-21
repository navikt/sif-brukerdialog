import { commonEnvSchema, sifInnsynEnvSchema } from '@navikt/sif-common-env';
import * as z from 'zod';

export const appEnvSchema = commonEnvSchema.merge(sifInnsynEnvSchema).extend({
    SIF_PUBLIC_INNSYN_URL: z.string().min(1),
    SIF_PUBLIC_DOMAIN_URL: z.string().min(1),
    VELG_SCENARIO: z.string().optional(),
    DEBUG: z.string().optional(),
});

export const appDevEnvSchema = appEnvSchema.extend({
    MSW: z.string().optional(),
    NOW: z.string().optional(),
});

export type AppEnv = z.infer<typeof appEnvSchema>;
export type AppDevEnv = z.infer<typeof appDevEnvSchema>;
