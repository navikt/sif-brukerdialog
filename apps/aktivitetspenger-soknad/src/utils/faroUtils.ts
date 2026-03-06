import { faro, LogLevel } from '@grafana/faro-web-sdk';

export const logFaroError = (title: string, error?: string) => {
    faro.api?.pushLog([title, error ?? ''], { level: LogLevel.ERROR });
};
