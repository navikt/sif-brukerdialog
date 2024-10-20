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
    'SIF_PUBLIC_MINSIDE_URL' = 'SIF_PUBLIC_MINSIDE_URL',
}

export enum SANITY_ENV {
    'SIF_PUBLIC_APPSTATUS_PROJECT_ID' = 'SIF_PUBLIC_APPSTATUS_PROJECT_ID',
    'SIF_PUBLIC_APPSTATUS_DATASET' = 'SIF_PUBLIC_APPSTATUS_DATASET',
}

export enum AMPLITUDE_ENV {
    'SIF_PUBLIC_USE_AMPLITUDE' = 'SIF_PUBLIC_USE_AMPLITUDE',
}

export enum API_ENV {
    'K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH' = 'K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH',
    'K9_BRUKERDIALOG_PROSESSERING_API_URL' = 'K9_BRUKERDIALOG_PROSESSERING_API_URL',
    'K9_SAK_INNSYN_FRONTEND_PATH' = 'K9_SAK_INNSYN_FRONTEND_PATH',
    'K9_SAK_INNSYN_API_URL' = 'K9_SAK_INNSYN_API_URL',
    'SIF_INNSYN_FRONTEND_PATH' = 'SIF_INNSYN_FRONTEND_PATH',
    'SIF_INNSYN_API_URL' = 'SIF_INNSYN_API_URL',
}

type COMMON_ENV = BASE_ENV | SANITY_ENV | API_ENV | AMPLITUDE_ENV;

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

interface CommonEnv {
    ENV: string;
    APP_VERSION: string;
    PUBLIC_PATH: string;
    SIF_PUBLIC_DEKORATOR_URL: string;
    SIF_PUBLIC_LOGIN_URL: string;
    SIF_PUBLIC_MINSIDE_URL: string;
    SIF_PUBLIC_USE_AMPLITUDE: string;
    SIF_PUBLIC_APPSTATUS_PROJECT_ID: string;
    SIF_PUBLIC_APPSTATUS_DATASET: string;
    K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH: string;
    K9_BRUKERDIALOG_PROSESSERING_API_URL: string;
    K9_SAK_INNSYN_FRONTEND_PATH?: string;
    K9_SAK_INNSYN_API_URL?: string;
    SIF_INNSYN_FRONTEND_PATH?: string;
    SIF_INNSYN_API_URL?: string;
}

const getCommonEnv = (): CommonEnv => {
    return {
        ENV: getRequiredEnv(BASE_ENV.ENV),
        APP_VERSION: getRequiredEnv(BASE_ENV.APP_VERSION),
        PUBLIC_PATH: getRequiredEnv(BASE_ENV.PUBLIC_PATH),
        SIF_PUBLIC_DEKORATOR_URL: getRequiredEnv(BASE_ENV.SIF_PUBLIC_DEKORATOR_URL),
        SIF_PUBLIC_LOGIN_URL: getRequiredEnv(BASE_ENV.SIF_PUBLIC_LOGIN_URL),
        SIF_PUBLIC_MINSIDE_URL: getRequiredEnv(BASE_ENV.SIF_PUBLIC_MINSIDE_URL),
        SIF_PUBLIC_USE_AMPLITUDE: getRequiredEnv(AMPLITUDE_ENV.SIF_PUBLIC_USE_AMPLITUDE),
        SIF_PUBLIC_APPSTATUS_PROJECT_ID: getRequiredEnv(SANITY_ENV.SIF_PUBLIC_APPSTATUS_PROJECT_ID),
        SIF_PUBLIC_APPSTATUS_DATASET: getRequiredEnv(SANITY_ENV.SIF_PUBLIC_APPSTATUS_DATASET),
        K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH: getRequiredEnv(API_ENV.K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH),
        K9_BRUKERDIALOG_PROSESSERING_API_URL: getRequiredEnv(API_ENV.K9_BRUKERDIALOG_PROSESSERING_API_URL),
        K9_SAK_INNSYN_FRONTEND_PATH: getEnv(API_ENV.K9_SAK_INNSYN_FRONTEND_PATH) || '',
        K9_SAK_INNSYN_API_URL: getEnv(API_ENV.K9_SAK_INNSYN_API_URL) || '',
        SIF_INNSYN_FRONTEND_PATH: getEnv(API_ENV.SIF_INNSYN_FRONTEND_PATH) || '',
        SIF_INNSYN_API_URL: getEnv(API_ENV.SIF_INNSYN_API_URL) || '',
    };
};

export const isDevMode = getEnv('APP_VERSION') === 'dev';
export const isProd = getEnv('APP_VERSION') === 'prod';

export const commonEnv = getCommonEnv();
