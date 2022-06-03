import { SeverityLevel } from '@sentry/types';
import { AxiosError } from 'axios';
export declare enum SentryEnvironment {
    LOCALHOST = "LOCALHOST",
    q = "q",
    prod = "prod",
    hostUndefined = "hostUndefined"
}
export declare const TAG_APPLICATION = "application";
export declare const isRunningLocally: (hostname: string) => boolean;
declare type Extras = {
    [key: string]: any;
};
export declare const logToSentry: (message: string, severity: SeverityLevel, application: string, extras?: Extras) => void;
export declare const setSentryEnvironment: (maybeHost: string | undefined) => SentryEnvironment;
declare type allowUrlsType = Array<string | RegExp>;
declare const getSentryLoggerForApp: (application: string, allowUrls?: allowUrlsType) => {
    init: () => void;
    log: (message: string, severity: SeverityLevel, payload?: string) => void;
    logInfo: (message: string, payload?: string) => void;
    logError: (message: string, payload?: string) => void;
    logApiError: (error: AxiosError) => void;
    logToSentry: (message: string, severity: SeverityLevel, payload?: string) => void;
};
export default getSentryLoggerForApp;
//# sourceMappingURL=index.d.ts.map