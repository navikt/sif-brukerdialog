import { getMaybeEnvironmentVariable } from '../utils/envUtils';

export enum COMMON_ENV {
    'PUBLIC_PATH' = 'PUBLIC_PATH',
    'SIF_PUBLIC_DEKORATOR_URL' = 'SIF_PUBLIC_DEKORATOR_URL',
    'SIF_PUBLIC_LOGIN_URL' = 'SIF_PUBLIC_LOGIN_URL',
}

export enum API_ENV {
    'K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH' = 'K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH',
    'K9_BRUKERDIALOG_PROSESSERING_API_URL' = 'K9_BRUKERDIALOG_PROSESSERING_API_URL',
    'K9_BRUKERDIALOG_PROSESSERING_API_TOKEN' = 'K9_BRUKERDIALOG_PROSESSERING_API_TOKEN',
    'K9_SAK_INNSYN_FRONTEND_PATH' = 'K9_SAK_INNSYN_FRONTEND_PATH',
    'K9_SAK_INNSYN_API_URL' = 'K9_SAK_INNSYN_API_URL',
    'K9_SAK_INNSYN_API_TOKEN' = 'K9_SAK_INNSYN_API_TOKEN',
    'SIF_INNSYN_FRONTEND_PATH' = 'SIF_INNSYN_FRONTEND_PATH',
    'SIF_INNSYN_API_URL' = 'SIF_INNSYN_API_URL',
    'SIF_INNSYN_API_TOKEN' = 'SIF_INNSYN_API_TOKEN',
}

export const getCommonEnv = (key: COMMON_ENV): string => {
    const env = getMaybeEnvironmentVariable(key);
    if (!env) {
        throw new Error(`Mangler miljøvariabel ${key}`);
    }
    return env;
};

export const getApiEnv = (key: API_ENV): string => {
    const env = getMaybeEnvironmentVariable(key);
    if (!env) {
        throw new Error(`Mangler miljøvariabel ${key}`);
    }
    return env;
};

export const commonEnv = () => {
    return {
        PUBLIC_PATH: getCommonEnv(COMMON_ENV.PUBLIC_PATH),
        SIF_PUBLIC_DEKORATOR_URL: getCommonEnv(COMMON_ENV.SIF_PUBLIC_DEKORATOR_URL),
        SIF_PUBLIC_LOGIN_URL: getCommonEnv(COMMON_ENV.SIF_PUBLIC_LOGIN_URL),
    };
};
