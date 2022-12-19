export const getEnvironmentVariable = (variableName: string): string => (window as any).appSettings[variableName];

export const getEnvVariableOrDefault = (key: string, defaultValue: string): string => {
    const value = getEnvironmentVariable(key);
    return value === undefined || value === 'undefined' ? defaultValue : value;
};
