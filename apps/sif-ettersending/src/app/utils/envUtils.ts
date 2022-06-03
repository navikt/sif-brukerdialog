export const getEnvironmentVariable = (variableName: string): string => (window as any).appSettings[variableName];
