const settingsNode = document.getElementById('nav:appSettings') as HTMLScriptElement;
const appSettingsInline = settingsNode ? JSON.parse(settingsNode.text) : undefined;

export const getEnvironmentVariable = (envName: string): string => {
    const envs = appSettingsInline || (window as any).appSettings || {};
    return envs[envName] || envs[`SIF_PUBLIC_${envName}`];
};

export const getMaybeEnvironmentVariable = (variableName: string): string | undefined => {
    const value = getEnvironmentVariable(variableName);
    return value === undefined || value === 'undefined' ? undefined : value;
};

export const getEnvVariableOrDefault = (key: string, defaultValue: string): string => {
    const value = getEnvironmentVariable(key);
    return value === undefined || value === 'undefined' ? defaultValue : value;
};

export const getCommitShaFromEnv = () => {
    const image = getEnvironmentVariable('IMAGE') || '';
    const parts = image.split('mono:');
    return parts.length === 2 ? parts[1] : undefined;
};

export const isDevMode = getEnvironmentVariable('APP_VERSION') === 'dev';
