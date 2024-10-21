import {
    CommonEnv,
    K9SakInnsynBrowserEnv,
    SIF_ENV,
    SifInnsynBrowserEnv,
    UngDeltakelseOpplyserBrowserEnv,
} from './schemas';

const settingsNode = document.getElementById('nav:appSettings') as HTMLScriptElement;
const appSettingsInline = settingsNode ? JSON.parse(settingsNode.text) : undefined;

const getEnvFromAppSettings = (envName: string): string | undefined => {
    const envs = appSettingsInline || (window as any).appSettings || {};
    const envValue = envs[envName] || envs[`SIF_PUBLIC_${envName}`];
    return envValue === undefined || envValue === 'undefined' ? undefined : envValue;
};

export const getRequiredEnv = (key: SIF_ENV | string): string => {
    const env = getEnvFromAppSettings(key);
    if (!env) {
        throw new Error(`Mangler miljøvariabel ${key}`);
    }
    return env;
};

export const getEnv = (key: SIF_ENV | string): string | undefined => {
    const env = getEnvFromAppSettings(key);
    if (!env) {
        // eslint-disable-next-line no-console
        console.warn(`Mangler miljøvariabel ${key}`);
    }
    return env;
};

export const isDevMode = () => getEnv('APP_VERSION') === 'dev';
export const isProd = () => getEnv('APP_VERSION') === 'prod';

export const getCommonEnv = (): CommonEnv => {
    return {
        [SIF_ENV.ENV]: getRequiredEnv(SIF_ENV.ENV),
        [SIF_ENV.APP_VERSION]: getRequiredEnv(SIF_ENV.APP_VERSION),
        [SIF_ENV.PUBLIC_PATH]: getRequiredEnv(SIF_ENV.PUBLIC_PATH),
        [SIF_ENV.GITHUB_REF_NAME]: getRequiredEnv(SIF_ENV.GITHUB_REF_NAME),
        [SIF_ENV.SIF_PUBLIC_DEKORATOR_URL]: getRequiredEnv(SIF_ENV.SIF_PUBLIC_DEKORATOR_URL),
        [SIF_ENV.SIF_PUBLIC_LOGIN_URL]: getRequiredEnv(SIF_ENV.SIF_PUBLIC_LOGIN_URL),
        [SIF_ENV.SIF_PUBLIC_MINSIDE_URL]: getRequiredEnv(SIF_ENV.SIF_PUBLIC_MINSIDE_URL),
        [SIF_ENV.SIF_PUBLIC_USE_AMPLITUDE]: getEnv(SIF_ENV.SIF_PUBLIC_USE_AMPLITUDE),
        [SIF_ENV.SIF_PUBLIC_APPSTATUS_PROJECT_ID]: getRequiredEnv(SIF_ENV.SIF_PUBLIC_APPSTATUS_PROJECT_ID),
        [SIF_ENV.SIF_PUBLIC_APPSTATUS_DATASET]: getRequiredEnv(SIF_ENV.SIF_PUBLIC_APPSTATUS_DATASET),
        [SIF_ENV.K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH]: getRequiredEnv(
            SIF_ENV.K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH,
        ),
        [SIF_ENV.K9_BRUKERDIALOG_PROSESSERING_API_SCOPE]: getRequiredEnv(
            SIF_ENV.K9_BRUKERDIALOG_PROSESSERING_API_SCOPE,
        ),
        [SIF_ENV.K9_BRUKERDIALOG_PROSESSERING_API_URL]: getRequiredEnv(SIF_ENV.K9_BRUKERDIALOG_PROSESSERING_API_URL),
    };
};

export const getK9SakInnsynEnv = (): K9SakInnsynBrowserEnv => {
    return {
        [SIF_ENV.K9_SAK_INNSYN_FRONTEND_PATH]: getRequiredEnv(SIF_ENV.K9_SAK_INNSYN_FRONTEND_PATH),
        [SIF_ENV.K9_SAK_INNSYN_API_SCOPE]: getRequiredEnv(SIF_ENV.K9_SAK_INNSYN_API_SCOPE),
        [SIF_ENV.K9_SAK_INNSYN_API_URL]: getRequiredEnv(SIF_ENV.K9_SAK_INNSYN_API_URL),
    };
};
export const getSifInnsynBrowserEnv = (): SifInnsynBrowserEnv => {
    return {
        [SIF_ENV.SIF_INNSYN_FRONTEND_PATH]: getRequiredEnv(SIF_ENV.SIF_INNSYN_FRONTEND_PATH),
        [SIF_ENV.SIF_INNSYN_API_SCOPE]: getRequiredEnv(SIF_ENV.SIF_INNSYN_API_SCOPE),
        [SIF_ENV.SIF_INNSYN_API_URL]: getRequiredEnv(SIF_ENV.SIF_INNSYN_API_URL),
    };
};
export const getUngDeltakelseOpplyserBrowserEnv = (): UngDeltakelseOpplyserBrowserEnv => {
    return {
        [SIF_ENV.UNG_DELTAKELSE_OPPLYSER_FRONTEND_PATH]: getRequiredEnv(SIF_ENV.UNG_DELTAKELSE_OPPLYSER_FRONTEND_PATH),
        [SIF_ENV.UNG_DELTAKELSE_OPPLYSER_API_SCOPE]: getRequiredEnv(SIF_ENV.UNG_DELTAKELSE_OPPLYSER_API_SCOPE),
        [SIF_ENV.UNG_DELTAKELSE_OPPLYSER_API_URL]: getRequiredEnv(SIF_ENV.UNG_DELTAKELSE_OPPLYSER_API_URL),
    };
};
