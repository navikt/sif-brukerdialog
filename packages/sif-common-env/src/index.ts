import { getEnv, getRequiredEnv } from './envUtils';
import { K9SakInnsynBrowserEnv, CommonEnv, SifInnsynBrowserEnv, UngDeltakelseOpplyserBrowserEnv } from './schemas';
import { API_BROWSER_ENV, SIF_ENV } from './types';

export * from './envUtils';
export * from './schemas';
export * from './types';

export const getCommonEnv = (): CommonEnv => {
    return {
        ENV: getRequiredEnv(SIF_ENV.ENV),
        APP_VERSION: getRequiredEnv(SIF_ENV.APP_VERSION),
        PUBLIC_PATH: getRequiredEnv(SIF_ENV.PUBLIC_PATH),
        GITHUB_REF_NAME: getRequiredEnv(SIF_ENV.GITHUB_REF_NAME),
        SIF_PUBLIC_DEKORATOR_URL: getRequiredEnv(SIF_ENV.SIF_PUBLIC_DEKORATOR_URL),
        SIF_PUBLIC_LOGIN_URL: getRequiredEnv(SIF_ENV.SIF_PUBLIC_LOGIN_URL),
        SIF_PUBLIC_MINSIDE_URL: getRequiredEnv(SIF_ENV.SIF_PUBLIC_MINSIDE_URL),
        SIF_PUBLIC_USE_AMPLITUDE: getEnv(SIF_ENV.SIF_PUBLIC_USE_AMPLITUDE),
        SIF_PUBLIC_APPSTATUS_PROJECT_ID: getRequiredEnv(SIF_ENV.SIF_PUBLIC_APPSTATUS_PROJECT_ID),
        SIF_PUBLIC_APPSTATUS_DATASET: getRequiredEnv(SIF_ENV.SIF_PUBLIC_APPSTATUS_DATASET),
        SIF_PUBLIC_INNSYN_URL: getRequiredEnv(SIF_ENV.SIF_PUBLIC_INNSYN_URL),
        K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH: getRequiredEnv(
            API_BROWSER_ENV.K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH,
        ),
        K9_BRUKERDIALOG_PROSESSERING_API_URL: getRequiredEnv(API_BROWSER_ENV.K9_BRUKERDIALOG_PROSESSERING_API_URL),
    };
};
export const getK9SakInnsynBrowserEnv = (): K9SakInnsynBrowserEnv => {
    return {
        K9_SAK_INNSYN_FRONTEND_PATH: getEnv(API_BROWSER_ENV.K9_SAK_INNSYN_FRONTEND_PATH) || '',
        K9_SAK_INNSYN_API_URL: getEnv(API_BROWSER_ENV.K9_SAK_INNSYN_API_URL) || '',
    };
};
export const getSifInnsynBrowserEnv = (): SifInnsynBrowserEnv => {
    return {
        SIF_INNSYN_FRONTEND_PATH: getEnv(API_BROWSER_ENV.SIF_INNSYN_FRONTEND_PATH) || '',
        SIF_INNSYN_API_URL: getEnv(API_BROWSER_ENV.SIF_INNSYN_API_URL) || '',
    };
};
export const getUngDeltakelseOpplyserBrowserEnv = (): UngDeltakelseOpplyserBrowserEnv => {
    return {
        UNG_DELTAKELSE_OPPLYSER_API_URL: getEnv(API_BROWSER_ENV.UNG_DELTAKELSE_OPPLYSER_API_URL) || '',
        UNG_DELTAKELSE_OPPLYSER_FRONTEND_PATH: getEnv(API_BROWSER_ENV.UNG_DELTAKELSE_OPPLYSER_FRONTEND_PATH) || '',
    };
};
export const commonEnv = getCommonEnv();
