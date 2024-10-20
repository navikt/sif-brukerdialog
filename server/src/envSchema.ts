import z from 'zod';

/** Denne fila erstattes av app schema når image bygges */

const baseEnvSchema = z.object({
    ENV: z.string().min(1),
    APP_VERSION: z.string().min(1),
    PUBLIC_PATH: z.string().min(1),
    GITHUB_REF_NAME: z.string().min(1),
});

const commonSifPublicSchema = z.object({
    SIF_PUBLIC_APPSTATUS_DATASET: z.string().min(1),
    SIF_PUBLIC_APPSTATUS_PROJECT_ID: z.string().min(1),
    SIF_PUBLIC_DEKORATOR_URL: z.string().min(1),
    SIF_PUBLIC_INNSYN_URL: z.string().min(1),
    SIF_PUBLIC_LOGIN_URL: z.string().min(1),
    SIF_PUBLIC_MINSIDE_URL: z.string().min(1),
    SIF_PUBLIC_USE_AMPLITUDE: z.string().optional(),
});

// const commonK9BrukerdialogProsesseringSchema = z.object({
//     K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH: z.string().min(1),
//     K9_BRUKERDIALOG_PROSESSERING_API_URL: z.string().min(1),
// });

// const sifInnsynEnvSchema = z.object({
//     SIF_INNSYN_FRONTEND_PATH: z.string().min(1),
//     SIF_INNSYN_API_SCOPE: z.string().min(1),
//     SIF_INNSYN_API_URL: z.string().min(1),
// });

// const k9SakInnsynEnvSchema = z.object({
//     K9_SAK_INNSYN_FRONTEND_PATH: z.string().min(1),
//     K9_SAK_INNSYN_API_SCOPE: z.string().min(1),
//     K9_SAK_INNSYN_API_URL: z.string().min(1),
// });

// const ungDeltakelseEnvSchema = z.object({
//     UNG_DELTAKELSE_OPPLYSER_FRONTEND_PATH: z.string().min(1),
//     UNG_DELTAKELSE_OPPLYSER_API_SCOPE: z.string().min(1),
//     UNG_DELTAKELSE_OPPLYSER_API_URL: z.string().min(1),
// });

export const envSchema = baseEnvSchema.merge(commonSifPublicSchema).merge(commonK9BrukerdialogProsesseringSchema);
// .merge(sifInnsynEnvSchema)
// .merge(k9SakInnsynEnvSchema)
// .merge(ungDeltakelseEnvSchema);
