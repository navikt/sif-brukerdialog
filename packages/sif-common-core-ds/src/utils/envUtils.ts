const settingsNode = document.getElementById('nav:appSettings') as HTMLScriptElement;
const appSettingsInline = settingsNode ? JSON.parse(settingsNode.text) : undefined;

export const getEnvironmentVariable = (variableName: string): string => {
    return (appSettingsInline || (window as any).appSettings || {})[variableName];
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
