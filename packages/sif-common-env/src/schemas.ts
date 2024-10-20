import * as z from 'zod';
import { API_BROWSER_ENV, API_SERVER_ENV, SIF_ENV } from './types';

/**
 * ZOD schemas
 */

export const commonEnvSchema = z.object({
    [SIF_ENV.ENV]: z.string(),
    [SIF_ENV.APP_VERSION]: z.string(),
    [SIF_ENV.PUBLIC_PATH]: z.string(),
    [SIF_ENV.GITHUB_REF_NAME]: z.string(),
    [SIF_ENV.SIF_PUBLIC_APPSTATUS_DATASET]: z.string(),
    [SIF_ENV.SIF_PUBLIC_APPSTATUS_PROJECT_ID]: z.string(),
    [SIF_ENV.SIF_PUBLIC_DEKORATOR_URL]: z.string(),
    [SIF_ENV.SIF_PUBLIC_INNSYN_URL]: z.string(),
    [SIF_ENV.SIF_PUBLIC_LOGIN_URL]: z.string(),
    [SIF_ENV.SIF_PUBLIC_MINSIDE_URL]: z.string(),
    [SIF_ENV.SIF_PUBLIC_USE_AMPLITUDE]: z.string().optional(),
    [API_BROWSER_ENV.K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH]: z.string(),
    [API_BROWSER_ENV.K9_BRUKERDIALOG_PROSESSERING_API_URL]: z.string(),
});
export type CommonEnv = z.infer<typeof commonEnvSchema>;

/**
 * K9BrukerdialogProsessering
 */
export const k9BrukerdialogProsesseringServerEnvSchema = z.object({
    [API_SERVER_ENV.K9_BRUKERDIALOG_PROSESSERING_API_SCOPE]: z.string().min(1),
});

/**
 * SifInnsyn
 */
export const sifInnsynBrowserEnvSchema = z.object({
    [API_BROWSER_ENV.SIF_INNSYN_FRONTEND_PATH]: z.string().min(1),
    [API_BROWSER_ENV.SIF_INNSYN_API_URL]: z.string().min(1),
});
export const sifInnsynServerEnvSchema = sifInnsynBrowserEnvSchema.extend({
    [API_SERVER_ENV.K9_SAK_INNSYN_API_SCOPE]: z.string().min(1),
});
export type SifInnsynBrowserEnv = z.infer<typeof sifInnsynBrowserEnvSchema>;

/**
 * k9SakInnsyn
 */
export const k9SakInnsynBrowserEnvSchema = z.object({
    [API_BROWSER_ENV.K9_SAK_INNSYN_FRONTEND_PATH]: z.string().min(1),
    [API_BROWSER_ENV.K9_SAK_INNSYN_API_URL]: z.string().min(1),
});
export const k9SakInnsynServerEnvSchema = k9SakInnsynBrowserEnvSchema.extend({
    [API_SERVER_ENV.K9_SAK_INNSYN_API_SCOPE]: z.string().min(1),
});
export type K9SakInnsynBrowserEnv = z.infer<typeof k9SakInnsynBrowserEnvSchema>;

/**
 * UngDeltakelse
 */
export const ungDeltakelseOpplyserBrowserEnvSchema = z.object({
    [API_BROWSER_ENV.UNG_DELTAKELSE_OPPLYSER_FRONTEND_PATH]: z.string().min(1),
    [API_BROWSER_ENV.UNG_DELTAKELSE_OPPLYSER_API_URL]: z.string().min(1),
});
export const ungDeltakelseOpplyserServerEnvSchema = ungDeltakelseOpplyserBrowserEnvSchema.extend({
    [API_SERVER_ENV.UNG_DELTAKELSE_OPPLYSER_API_SCOPE]: z.string().min(1),
});
export type UngDeltakelseOpplyserBrowserEnv = z.infer<typeof ungDeltakelseOpplyserBrowserEnvSchema>;
