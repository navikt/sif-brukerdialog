import * as z from 'zod';

export enum EnvKey {
    'ENV' = 'ENV',
    'APP_VERSION' = 'APP_VERSION',
    'PUBLIC_PATH' = 'PUBLIC_PATH',
    'GITHUB_REF_NAME' = 'GITHUB_REF_NAME',
    'SIF_PUBLIC_DEKORATOR_URL' = 'SIF_PUBLIC_DEKORATOR_URL',
    'SIF_PUBLIC_LOGIN_URL' = 'SIF_PUBLIC_LOGIN_URL',
    'SIF_PUBLIC_MINSIDE_URL' = 'SIF_PUBLIC_MINSIDE_URL',
    'SIF_PUBLIC_INNSYN_URL' = 'SIF_PUBLIC_INNSYN_URL',
    'SIF_PUBLIC_AMPLITUDE_API_KEY' = 'SIF_PUBLIC_AMPLITUDE_API_KEY',
    'SIF_PUBLIC_APPSTATUS_PROJECT_ID' = 'SIF_PUBLIC_APPSTATUS_PROJECT_ID',
    'SIF_PUBLIC_APPSTATUS_DATASET' = 'SIF_PUBLIC_APPSTATUS_DATASET',
    'SIF_PUBLIC_USE_AMPLITUDE' = 'SIF_PUBLIC_USE_AMPLITUDE',
    'K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH' = 'K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH',
    'K9_BRUKERDIALOG_PROSESSERING_API_SCOPE' = 'K9_BRUKERDIALOG_PROSESSERING_API_SCOPE',
    'K9_BRUKERDIALOG_PROSESSERING_API_URL' = 'K9_BRUKERDIALOG_PROSESSERING_API_URL',
    'K9_SAK_INNSYN_FRONTEND_PATH' = 'K9_SAK_INNSYN_FRONTEND_PATH',
    'K9_SAK_INNSYN_API_SCOPE' = 'K9_SAK_INNSYN_API_SCOPE',
    'K9_SAK_INNSYN_API_URL' = 'K9_SAK_INNSYN_API_URL',
    'SIF_INNSYN_FRONTEND_PATH' = 'SIF_INNSYN_FRONTEND_PATH',
    'SIF_INNSYN_API_SCOPE' = 'SIF_INNSYN_API_SCOPE',
    'SIF_INNSYN_API_URL' = 'SIF_INNSYN_API_URL',
    'UNG_DELTAKELSE_OPPLYSER_FRONTEND_PATH' = 'UNG_DELTAKELSE_OPPLYSER_FRONTEND_PATH',
    'UNG_DELTAKELSE_OPPLYSER_API_SCOPE' = 'UNG_DELTAKELSE_OPPLYSER_API_SCOPE',
    'UNG_DELTAKELSE_OPPLYSER_API_URL' = 'UNG_DELTAKELSE_OPPLYSER_API_URL',
}
/**
 * ZOD schemas
 */

export const commonEnvSchema = z.object({
    [EnvKey.ENV]: z.string(), //.min(1),
    [EnvKey.APP_VERSION]: z.string().min(1),
    [EnvKey.PUBLIC_PATH]: z.string().min(1),
    [EnvKey.GITHUB_REF_NAME]: z.string().min(1),
    [EnvKey.SIF_PUBLIC_AMPLITUDE_API_KEY]: z.string().min(1),
    [EnvKey.SIF_PUBLIC_APPSTATUS_DATASET]: z.string().min(1),
    [EnvKey.SIF_PUBLIC_APPSTATUS_PROJECT_ID]: z.string().min(1),
    [EnvKey.SIF_PUBLIC_DEKORATOR_URL]: z.string().min(1),
    [EnvKey.SIF_PUBLIC_LOGIN_URL]: z.string().min(1),
    [EnvKey.SIF_PUBLIC_MINSIDE_URL]: z.string().min(1),
    [EnvKey.SIF_PUBLIC_USE_AMPLITUDE]: z.string().optional(),
    [EnvKey.K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH]: z.string().min(1),
    [EnvKey.K9_BRUKERDIALOG_PROSESSERING_API_SCOPE]: z.string().min(1),
    [EnvKey.K9_BRUKERDIALOG_PROSESSERING_API_URL]: z.string().min(1),
});

export type CommonEnv = z.infer<typeof commonEnvSchema>;

/**
 * SifInnsyn
 */
export const sifInnsynEnvSchema = z.object({
    [EnvKey.SIF_INNSYN_FRONTEND_PATH]: z.string().min(1),
    [EnvKey.SIF_INNSYN_API_SCOPE]: z.string().min(1),
    [EnvKey.SIF_INNSYN_API_URL]: z.string().min(1),
});
export type SifInnsynBrowserEnv = z.infer<typeof sifInnsynEnvSchema>;

/**
 * k9SakInnsyn
 */
export const k9SakInnsynEnvSchema = z.object({
    [EnvKey.K9_SAK_INNSYN_FRONTEND_PATH]: z.string().min(1),
    [EnvKey.K9_SAK_INNSYN_API_SCOPE]: z.string().min(1),
    [EnvKey.K9_SAK_INNSYN_API_URL]: z.string().min(1),
});
export type K9SakInnsynBrowserEnv = z.infer<typeof k9SakInnsynEnvSchema>;

/**
 * UngDeltakelse
 */
export const ungDeltakelseOpplyserEnvSchema = z.object({
    [EnvKey.UNG_DELTAKELSE_OPPLYSER_FRONTEND_PATH]: z.string().min(1),
    [EnvKey.UNG_DELTAKELSE_OPPLYSER_API_SCOPE]: z.string().min(1),
    [EnvKey.UNG_DELTAKELSE_OPPLYSER_API_URL]: z.string().min(1),
});
export type UngDeltakelseOpplyserBrowserEnv = z.infer<typeof ungDeltakelseOpplyserEnvSchema>;
