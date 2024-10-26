import {
    CommonEnv,
    EnvKey,
    K9SakInnsynBrowserEnv,
    SifInnsynBrowserEnv,
    UngDeltakelseOpplyserBrowserEnv,
} from './schemas';

let envs;

const getEnvFromAppSettings = (envName: string): string | undefined => {
    if (!envs) {
        const settingsNode = document.getElementById('nav:appSettings') as HTMLScriptElement;
        const appSettingsInline = settingsNode ? JSON.parse(settingsNode.text) : undefined;
        envs = appSettingsInline || (window as any).appSettings || {};
    }
    const envValue = envs[envName] || envs[`SIF_PUBLIC_${envName}`];
    return envValue === undefined || envValue === 'undefined' ? undefined : envValue;
};

export const getRequiredEnv = (key: EnvKey | string): string => {
    const env = getEnvFromAppSettings(key);
    if (!env) {
        throw new Error(`Mangler miljøvariabel ${key}`);
    }
    return env;
};

export const getMaybeEnv = (key: EnvKey | string): string | undefined => {
    const env = getEnvFromAppSettings(key);
    if (!env && !isProd()) {
        // eslint-disable-next-line no-console
        console.warn(`Mangler miljøvariabel ${key}`);
    }
    return env;
};

export const isDevMode = () => getMaybeEnv('APP_VERSION') === 'dev';
export const isProd = () => getMaybeEnv('APP_VERSION') === 'prod';

export const getCommonEnv = (): CommonEnv => {
    return {
        [EnvKey.ENV]: getRequiredEnv(EnvKey.ENV),
        [EnvKey.APP_VERSION]: getRequiredEnv(EnvKey.APP_VERSION),
        [EnvKey.PUBLIC_PATH]: getRequiredEnv(EnvKey.PUBLIC_PATH),
        [EnvKey.GITHUB_REF_NAME]: getRequiredEnv(EnvKey.GITHUB_REF_NAME),
        [EnvKey.SIF_PUBLIC_DEKORATOR_URL]: getRequiredEnv(EnvKey.SIF_PUBLIC_DEKORATOR_URL),
        [EnvKey.SIF_PUBLIC_LOGIN_URL]: getRequiredEnv(EnvKey.SIF_PUBLIC_LOGIN_URL),
        [EnvKey.SIF_PUBLIC_MINSIDE_URL]: getRequiredEnv(EnvKey.SIF_PUBLIC_MINSIDE_URL),
        [EnvKey.SIF_PUBLIC_USE_AMPLITUDE]: getMaybeEnv(EnvKey.SIF_PUBLIC_USE_AMPLITUDE),
        [EnvKey.SIF_PUBLIC_AMPLITUDE_API_KEY]: getRequiredEnv(EnvKey.SIF_PUBLIC_AMPLITUDE_API_KEY),
        [EnvKey.SIF_PUBLIC_APPSTATUS_PROJECT_ID]: getRequiredEnv(EnvKey.SIF_PUBLIC_APPSTATUS_PROJECT_ID),
        [EnvKey.SIF_PUBLIC_APPSTATUS_DATASET]: getRequiredEnv(EnvKey.SIF_PUBLIC_APPSTATUS_DATASET),
        [EnvKey.K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH]: getRequiredEnv(
            EnvKey.K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH,
        ),
        [EnvKey.K9_BRUKERDIALOG_PROSESSERING_API_SCOPE]: getRequiredEnv(EnvKey.K9_BRUKERDIALOG_PROSESSERING_API_SCOPE),
        [EnvKey.K9_BRUKERDIALOG_PROSESSERING_API_URL]: getRequiredEnv(EnvKey.K9_BRUKERDIALOG_PROSESSERING_API_URL),
    };
};

export const getK9SakInnsynEnv = (): K9SakInnsynBrowserEnv => {
    return {
        [EnvKey.K9_SAK_INNSYN_FRONTEND_PATH]: getRequiredEnv(EnvKey.K9_SAK_INNSYN_FRONTEND_PATH),
        [EnvKey.K9_SAK_INNSYN_API_SCOPE]: getRequiredEnv(EnvKey.K9_SAK_INNSYN_API_SCOPE),
        [EnvKey.K9_SAK_INNSYN_API_URL]: getRequiredEnv(EnvKey.K9_SAK_INNSYN_API_URL),
    };
};
export const getSifInnsynBrowserEnv = (): SifInnsynBrowserEnv => {
    return {
        [EnvKey.SIF_INNSYN_FRONTEND_PATH]: getRequiredEnv(EnvKey.SIF_INNSYN_FRONTEND_PATH),
        [EnvKey.SIF_INNSYN_API_SCOPE]: getRequiredEnv(EnvKey.SIF_INNSYN_API_SCOPE),
        [EnvKey.SIF_INNSYN_API_URL]: getRequiredEnv(EnvKey.SIF_INNSYN_API_URL),
    };
};
export const getUngDeltakelseOpplyserBrowserEnv = (): UngDeltakelseOpplyserBrowserEnv => {
    return {
        [EnvKey.UNG_DELTAKELSE_OPPLYSER_FRONTEND_PATH]: getRequiredEnv(EnvKey.UNG_DELTAKELSE_OPPLYSER_FRONTEND_PATH),
        [EnvKey.UNG_DELTAKELSE_OPPLYSER_API_SCOPE]: getRequiredEnv(EnvKey.UNG_DELTAKELSE_OPPLYSER_API_SCOPE),
        [EnvKey.UNG_DELTAKELSE_OPPLYSER_API_URL]: getRequiredEnv(EnvKey.UNG_DELTAKELSE_OPPLYSER_API_URL),
    };
};
