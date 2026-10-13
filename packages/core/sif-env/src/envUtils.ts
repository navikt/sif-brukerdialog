import {
    BaseEnv,
    CommonEnv,
    EnvKey,
    K9SakInnsynBrowserEnv,
    SifInnsynBrowserEnv,
    UngBrukerdialogApiBrowserEnv,
    UngDeltakelseOpplyserBrowserEnv,
} from './schemas';

type AppSettingsValue = string | boolean | undefined;
export type AppSettings = Record<string, AppSettingsValue>;

declare global {
    interface Window {
        appSettings?: AppSettings;
    }
}

let envs: AppSettings | undefined;

const parseAppSettings = (settingsText: string): AppSettings => {
    let parsedSettings: unknown;

    try {
        parsedSettings = JSON.parse(settingsText);
    } catch {
        throw new Error('Kunne ikke lese appSettings: innholdet er ikke gyldig JSON');
    }

    if (typeof parsedSettings !== 'object' || parsedSettings === null || Array.isArray(parsedSettings)) {
        throw new Error('Kunne ikke lese appSettings: innholdet må være et objekt');
    }

    const entries = Object.entries(parsedSettings);
    if (entries.some(([, value]) => typeof value !== 'string' && typeof value !== 'boolean')) {
        throw new Error('Kunne ikke lese appSettings: alle verdier må være strenger eller boolske verdier');
    }

    return Object.fromEntries(entries);
};

const getEnvFromAppSettings = (envName: string): AppSettingsValue => {
    if (!envs) {
        const settingsNode = document.getElementById('nav:appSettings') as HTMLScriptElement;
        // Denne modulen er kun ment brukt i nettleseren, hvor document og window finnes.
        envs = settingsNode ? parseAppSettings(settingsNode.text) : (window.appSettings ?? {});
    }
    const resolvedEnvs = envs!;
    const envValue = resolvedEnvs[envName] ?? resolvedEnvs[`SIF_PUBLIC_${envName}`];
    return envValue === undefined || envValue === 'undefined' ? undefined : envValue;
};

export const getRequiredEnv = (key: EnvKey | string): string => {
    const env = getEnvFromAppSettings(key);
    if (!env || typeof env !== 'string') {
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
    return typeof env === 'boolean' ? String(env) : env;
};

export const getMaybeBoolEnv = (key: EnvKey | string): boolean => {
    const env = getEnvFromAppSettings(key);
    if (!env && !isProd()) {
        // eslint-disable-next-line no-console
        console.warn(`Mangler miljøvariabel ${key}`);
    }
    return env === 'true' || env === true;
};

export const isDevMode = () => getMaybeEnv('APP_VERSION') === 'dev';
export const isProd = () => getMaybeEnv('APP_VERSION') === 'prod';

export const getBaseEnv = (): BaseEnv => {
    return {
        [EnvKey.ENV]: getRequiredEnv(EnvKey.ENV),
        [EnvKey.APP_VERSION]: getRequiredEnv(EnvKey.APP_VERSION),
        [EnvKey.PUBLIC_PATH]: getRequiredEnv(EnvKey.PUBLIC_PATH),
        [EnvKey.GITHUB_REF_NAME]: getRequiredEnv(EnvKey.GITHUB_REF_NAME),
    };
};

export const getCommonEnv = (): CommonEnv => {
    return {
        [EnvKey.ENV]: getRequiredEnv(EnvKey.ENV),
        [EnvKey.APP_VERSION]: getRequiredEnv(EnvKey.APP_VERSION),
        [EnvKey.PUBLIC_PATH]: getRequiredEnv(EnvKey.PUBLIC_PATH),
        [EnvKey.GITHUB_REF_NAME]: getRequiredEnv(EnvKey.GITHUB_REF_NAME),
        [EnvKey.SIF_PUBLIC_DEKORATOR_URL]: getRequiredEnv(EnvKey.SIF_PUBLIC_DEKORATOR_URL),
        [EnvKey.SIF_PUBLIC_LOGIN_URL]: getRequiredEnv(EnvKey.SIF_PUBLIC_LOGIN_URL),
        [EnvKey.SIF_PUBLIC_MINSIDE_URL]: getRequiredEnv(EnvKey.SIF_PUBLIC_MINSIDE_URL),
        [EnvKey.SIF_PUBLIC_USE_ANALYTICS]: getMaybeEnv(EnvKey.SIF_PUBLIC_USE_ANALYTICS),
        [EnvKey.SIF_PUBLIC_APPSTATUS_PROJECT_ID]: getRequiredEnv(EnvKey.SIF_PUBLIC_APPSTATUS_PROJECT_ID),
        [EnvKey.SIF_PUBLIC_APPSTATUS_DATASET]: getRequiredEnv(EnvKey.SIF_PUBLIC_APPSTATUS_DATASET),
        [EnvKey.SIF_PUBLIC_FEATURE_NYNORSK]: getMaybeEnv(EnvKey.SIF_PUBLIC_FEATURE_NYNORSK) === 'on' ? 'on' : 'off',
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

export const getUngBrukerdialogApiBrowserEnv = (): UngBrukerdialogApiBrowserEnv => {
    return {
        [EnvKey.UNG_BRUKERDIALOG_API_FRONTEND_PATH]: getRequiredEnv(EnvKey.UNG_BRUKERDIALOG_API_FRONTEND_PATH),
        [EnvKey.UNG_BRUKERDIALOG_API_API_SCOPE]: getRequiredEnv(EnvKey.UNG_BRUKERDIALOG_API_API_SCOPE),
        [EnvKey.UNG_BRUKERDIALOG_API_API_URL]: getRequiredEnv(EnvKey.UNG_BRUKERDIALOG_API_API_URL),
    };
};
