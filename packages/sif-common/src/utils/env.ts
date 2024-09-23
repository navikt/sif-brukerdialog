import { z } from 'zod';
import { getMaybeEnvironmentVariable } from './envUtils';

const apiEnvSchema = z.object({
    BRUKERDIALOG_PROSESSERING_FRONTEND_API_PATH: z.string(),
    BRUKERDIALOG_PROSESSERING_SERVER_URL: z.string(),
    BRUKERDIALOG_PROSESSERING_TOKENX_AUDIENCE: z.string(),
    K9_SAK_INNSYN_FRONTEND_API_PATH: z.string(),
    K9_SAK_INNSYN_SERVER_URL: z.string(),
    K9_SAK_INNSYN_TOKENX_AUDIENCE: z.string(),
    SIF_INNSYN_FRONTEND_API_PATH: z.string(),
    SIF_INNSYN_SERVER_URL: z.string(),
    SIF_INNSYN_TOKENX_AUDIENCE: z.string(),
});

const apiEnv = apiEnvSchema.parse({
    BRUKERDIALOG_PROSESSERING_FRONTEND_API_PATH: getMaybeEnvironmentVariable(
        'BRUKERDIALOG_PROSESSERING_FRONTEND_API_PATH',
    ),
    BRUKERDIALOG_PROSESSERING_SERVER_URL: getMaybeEnvironmentVariable('BRUKERDIALOG_PROSESSERING_SERVER_URL'),
    BRUKERDIALOG_PROSESSERING_TOKENX_AUDIENCE: getMaybeEnvironmentVariable('BRUKERDIALOG_PROSESSERING_TOKENX_AUDIENCE'),
    K9_SAK_INNSYN_FRONTEND_API_PATH: getMaybeEnvironmentVariable('K9_SAK_INNSYN_FRONTEND_API_PATH'),
    K9_SAK_INNSYN_SERVER_URL: getMaybeEnvironmentVariable('K9_SAK_INNSYN_SERVER_URL'),
    K9_SAK_INNSYN_TOKENX_AUDIENCE: getMaybeEnvironmentVariable('K9_SAK_INNSYN_TOKENX_AUDIENCE'),
    SIF_INNSYN_FRONTEND_API_PATH: getMaybeEnvironmentVariable('SIF_INNSYN_FRONTEND_API_PATH'),
    SIF_INNSYN_SERVER_URL: getMaybeEnvironmentVariable('SIF_INNSYN_SERVER_URL'),
    SIF_INNSYN_TOKENX_AUDIENCE: getMaybeEnvironmentVariable('SIF_INNSYN_TOKENX_AUDIENCE'),
});

const globalEnvSchema = z.object({
    IS_DEV_MODE: z.boolean(),
    IMAGE: z.string(),
});

const globalEnv = globalEnvSchema.parse({
    IS_DEV_MODE: getMaybeEnvironmentVariable('APP_VERSION') === 'dev',
    IMAGE: getMaybeEnvironmentVariable('APP_VERSION') === 'dev',
});

export const CommonEnvSchema = z.object({
    api: apiEnvSchema,
    global: globalEnvSchema,
});

export type CommonEnv = z.infer<typeof CommonEnvSchema>;

export const commonEnv: CommonEnv = {
    api: apiEnv,
    global: globalEnv,
};
