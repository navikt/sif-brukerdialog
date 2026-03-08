import { faro } from '@grafana/faro-web-sdk';

export const logErrorToFaro = (app: string, error: Error, componentStack: string) => {
    faro.api?.pushError(error, { context: { app, componentStack } });
};
