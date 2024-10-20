import * as z from 'zod';

const baseEnvSchema = z.object({
    ENV: z.string(),
    APP_VERSION: z.string(),
    PUBLIC_PATH: z.string(),
    GITHUB_REF_NAME: z.string(),
});

const commonSifPublicSchema = z.object({
    SIF_PUBLIC_APPSTATUS_DATASET: z.string(),
    SIF_PUBLIC_APPSTATUS_PROJECT_ID: z.string(),
    SIF_PUBLIC_DEKORATOR_URL: z.string(),
    SIF_PUBLIC_INNSYN_URL: z.string(),
    SIF_PUBLIC_LOGIN_URL: z.string(),
    SIF_PUBLIC_MINSIDE_URL: z.string(),
    SIF_PUBLIC_USE_AMPLITUDE: z.string().optional(),
});

const commonK9BrukerdialogProsesseringSchema = z.object({
    K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH: z.string(),
    K9_BRUKERDIALOG_PROSESSERING_API_URL: z.string(),
});

const appEnvSchema = z.object({
    MOCK_DATE: z.string().optional(),
    USE_MOCK_DATE: z.string().optional(),
});

export const envSchema = baseEnvSchema
    .merge(commonSifPublicSchema)
    .merge(commonK9BrukerdialogProsesseringSchema)
    .merge(appEnvSchema);
