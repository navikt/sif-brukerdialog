import { faro } from '@grafana/faro-web-sdk';

export const logErrorToFaro = (error: Error, componentStack: string) => {
    faro.api?.pushError(error, { context: { componentStack } });
};
