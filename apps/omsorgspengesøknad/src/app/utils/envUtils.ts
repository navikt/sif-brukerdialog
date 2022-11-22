import { getEnvironmentVariable } from '@navikt/sif-common-core-ds/lib/utils/envUtils';

export const getEnvVariableOrDefault = (key: string, defaultValue: string): string => {
    const value = getEnvironmentVariable(key);
    return value === undefined || value === 'undefined' ? defaultValue : value;
};
