const settingsNode = document.getElementById('nav:appSettings') as HTMLScriptElement;
const appSettingsInline = settingsNode ? JSON.parse(settingsNode.text) : undefined;

const getEnvFromAppSettings = (envName: string): string | undefined => {
    const envs = appSettingsInline || (window as any).appSettings || {};
    const envValue = envs[envName] || envs[`SIF_PUBLIC_${envName}`];
    return envValue === undefined || envValue === 'undefined' ? undefined : envValue;
};

export enum BASE_ENV {
    'ENV' = 'ENV',
    'APP_VERSION' = 'APP_VERSION',
    'PUBLIC_PATH' = 'PUBLIC_PATH',
    'SIF_PUBLIC_DEKORATOR_URL' = 'SIF_PUBLIC_DEKORATOR_URL',
    'SIF_PUBLIC_LOGIN_URL' = 'SIF_PUBLIC_LOGIN_URL',
}

export enum SANITY_ENV {
    'APPSTATUS_PROJECT_ID' = 'APPSTATUS_PROJECT_ID',
    'APPSTATUS_DATASET' = 'APPSTATUS_DATASET',
}

export enum API_ENV {
    'K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH' = 'K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH',
    'K9_BRUKERDIALOG_PROSESSERING_API_URL' = 'K9_BRUKERDIALOG_PROSESSERING_API_URL',
    'K9_SAK_INNSYN_FRONTEND_PATH' = 'K9_SAK_INNSYN_FRONTEND_PATH',
    'K9_SAK_INNSYN_API_URL' = 'K9_SAK_INNSYN_API_URL',
    'SIF_INNSYN_FRONTEND_PATH' = 'SIF_INNSYN_FRONTEND_PATH',
    'SIF_INNSYN_API_URL' = 'SIF_INNSYN_API_URL',
}

type COMMON_ENV = BASE_ENV | SANITY_ENV | API_ENV;

export const getRequiredEnv = (key: COMMON_ENV | string): string => {
    const env = getEnvFromAppSettings(key);
    if (!env) {
        throw new Error(`Mangler miljøvariabel ${key}`);
    }
    return env;
};

export const getEnv = (key: BASE_ENV | string): string | undefined => {
    const env = getEnvFromAppSettings(key);
    if (!env) {
        // eslint-disable-next-line no-console
        console.warn(`Mangler miljøvariabel ${key}`);
    }
    return env;
};

export const getCommitShaFromEnv = () => {
    const image = getRequiredEnv('IMAGE') || '';
    const parts = image.split('mono:');
    return parts.length === 2 ? parts[1] : undefined;
};

const getCommonEnv = () => {
    return {
        ENV: getRequiredEnv(BASE_ENV.ENV),
        APP_VERSION: getRequiredEnv(BASE_ENV.APP_VERSION),
        PUBLIC_PATH: getRequiredEnv(BASE_ENV.PUBLIC_PATH),
        SIF_PUBLIC_DEKORATOR_URL: getRequiredEnv(BASE_ENV.SIF_PUBLIC_DEKORATOR_URL),
        SIF_PUBLIC_LOGIN_URL: getRequiredEnv(BASE_ENV.SIF_PUBLIC_LOGIN_URL),
        APPSTATUS_PROJECT_ID: getRequiredEnv(SANITY_ENV.APPSTATUS_PROJECT_ID),
        APPSTATUS_DATASET: getRequiredEnv(SANITY_ENV.APPSTATUS_DATASET),
        K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH: getRequiredEnv(API_ENV.K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH),
        K9_BRUKERDIALOG_PROSESSERING_API_URL: getRequiredEnv(API_ENV.K9_BRUKERDIALOG_PROSESSERING_API_URL),
        K9_SAK_INNSYN_FRONTEND_PATH: getEnv(API_ENV.K9_SAK_INNSYN_FRONTEND_PATH),
        K9_SAK_INNSYN_API_URL: getEnv(API_ENV.K9_SAK_INNSYN_API_URL),
        SIF_INNSYN_FRONTEND_PATH: getEnv(API_ENV.SIF_INNSYN_FRONTEND_PATH),
        SIF_INNSYN_API_URL: getEnv(API_ENV.SIF_INNSYN_API_URL),
    };
};

export const isDevMode = getEnv('APP_VERSION') === 'dev';

export const commonEnv = getCommonEnv();
