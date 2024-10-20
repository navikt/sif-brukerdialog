import { SIF_ENV_KEY } from './types';

let appSettingsInline;

const extractAppSettings = () => {
    if (typeof document !== 'undefined') {
        const settingsNode = document.getElementById('nav:appSettings') as HTMLScriptElement;
        appSettingsInline = settingsNode ? JSON.parse(settingsNode.text) : undefined;
    }
};

const getEnvFromAppSettings = (envName: string): string | undefined => {
    if (!appSettingsInline) {
        extractAppSettings();
    }
    const envs = appSettingsInline || (window as any).appSettings || {};
    const envValue = envs[envName] || envs[`SIF_PUBLIC_${envName}`];
    return envValue === undefined || envValue === 'undefined' ? undefined : envValue;
};

export const getRequiredEnv = (key: SIF_ENV_KEY | string): string => {
    const env = getEnvFromAppSettings(key);
    if (!env) {
        throw new Error(`Mangler miljøvariabel ${key}`);
    }
    return env;
};

export const getEnv = (key: SIF_ENV_KEY | string): string | undefined => {
    const env = getEnvFromAppSettings(key);
    if (!env) {
        // eslint-disable-next-line no-console
        console.warn(`Mangler miljøvariabel ${key}`);
    }
    return env;
};

export const isDevMode = getEnv('APP_VERSION') === 'dev';
export const isProd = getEnv('APP_VERSION') === 'prod';
