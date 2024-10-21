import * as z from 'zod';

export enum SIF_ENV {
    'ENV' = 'ENV',
    'APP_VERSION' = 'APP_VERSION',
    'PUBLIC_PATH' = 'PUBLIC_PATH',
    'GITHUB_REF_NAME' = 'GITHUB_REF_NAME',
    'SIF_PUBLIC_DEKORATOR_URL' = 'SIF_PUBLIC_DEKORATOR_URL',
    'SIF_PUBLIC_LOGIN_URL' = 'SIF_PUBLIC_LOGIN_URL',
    'SIF_PUBLIC_MINSIDE_URL' = 'SIF_PUBLIC_MINSIDE_URL',
    'SIF_PUBLIC_INNSYN_URL' = 'SIF_PUBLIC_INNSYN_URL',
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
    [SIF_ENV.ENV]: z.string().min(1),
    [SIF_ENV.APP_VERSION]: z.string().min(1),
    [SIF_ENV.PUBLIC_PATH]: z.string().min(1),
    [SIF_ENV.GITHUB_REF_NAME]: z.string().min(1),
    [SIF_ENV.SIF_PUBLIC_APPSTATUS_DATASET]: z.string().min(1),
    [SIF_ENV.SIF_PUBLIC_APPSTATUS_PROJECT_ID]: z.string().min(1),
    [SIF_ENV.SIF_PUBLIC_DEKORATOR_URL]: z.string().min(1),
    [SIF_ENV.SIF_PUBLIC_LOGIN_URL]: z.string().min(1),
    [SIF_ENV.SIF_PUBLIC_MINSIDE_URL]: z.string().min(1),
    [SIF_ENV.SIF_PUBLIC_USE_AMPLITUDE]: z.string().optional(),
    [SIF_ENV.K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH]: z.string().min(1),
    [SIF_ENV.K9_BRUKERDIALOG_PROSESSERING_API_SCOPE]: z.string().min(1),
    [SIF_ENV.K9_BRUKERDIALOG_PROSESSERING_API_URL]: z.string().min(1),
});

export type CommonEnv = z.infer<typeof commonEnvSchema>;

/**
 * SifInnsyn
 */
export const sifInnsynEnvSchema = z.object({
    [SIF_ENV.SIF_INNSYN_FRONTEND_PATH]: z.string().min(1),
    [SIF_ENV.SIF_INNSYN_API_SCOPE]: z.string().min(1),
    [SIF_ENV.SIF_INNSYN_API_URL]: z.string().min(1),
});
export type SifInnsynBrowserEnv = z.infer<typeof sifInnsynEnvSchema>;

/**
 * k9SakInnsyn
 */
export const k9SakInnsynEnvSchema = z.object({
    [SIF_ENV.K9_SAK_INNSYN_FRONTEND_PATH]: z.string().min(1),
    [SIF_ENV.K9_SAK_INNSYN_API_SCOPE]: z.string().min(1),
    [SIF_ENV.K9_SAK_INNSYN_API_URL]: z.string().min(1),
});
export type K9SakInnsynBrowserEnv = z.infer<typeof k9SakInnsynEnvSchema>;

/**
 * UngDeltakelse
 */
export const ungDeltakelseOpplyserEnvSchema = z.object({
    [SIF_ENV.UNG_DELTAKELSE_OPPLYSER_FRONTEND_PATH]: z.string().min(1),
    [SIF_ENV.UNG_DELTAKELSE_OPPLYSER_API_SCOPE]: z.string().min(1),
    [SIF_ENV.UNG_DELTAKELSE_OPPLYSER_API_URL]: z.string().min(1),
});
export type UngDeltakelseOpplyserBrowserEnv = z.infer<typeof ungDeltakelseOpplyserEnvSchema>;
