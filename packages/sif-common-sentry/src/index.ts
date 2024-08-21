import * as Sentry from '@sentry/browser';
import { SeverityLevel } from '@sentry/types';
import { AxiosError } from 'axios';

export enum SentryEnvironment {
    LOCALHOST = 'LOCALHOST',
    q = 'q',
    prod = 'prod',
    hostUndefined = 'hostUndefined',
}

export const TAG_APPLICATION = 'application';

export const isRunningLocally = (hostname: string): boolean => hostname.includes('localhost');

type Extras = { [key: string]: any };

export const logToSentry = (message: string, severity: SeverityLevel, application: string, extras?: Extras): void => {
    Sentry.withScope((scope) => {
        if (extras) {
            scope.setExtras(extras);
        }
        scope.setTag(TAG_APPLICATION, application);
        Sentry.captureMessage(message, severity);
    });
};

const logToSentryOrConsole = (message: string, severity: SeverityLevel, application: string, extras?: Extras): void => {
    if (isRunningLocally(window.location.hostname)) {
        // eslint-disable-next-line no-console
        console.warn(`Severity: ${severity}. Message: ${message}`, extras);
    } else {
        logToSentry(message, severity, application, extras);
    }
};

const logApiCallErrorToSentryOrConsole = (error: AxiosError, application: string): void => {
    const headers = error?.response?.headers;
    const maybeXRequestId: string | undefined = headers ? headers['x-request-id'] : undefined;
    const errorMsg: string | undefined = error?.message;

    if (['0', '401'].includes(`${error.response?.status || ''}`)) {
        return;
    }

    logToSentryOrConsole('Api call error', 'fatal', application, {
        XRequestId: maybeXRequestId || undefined,
        errorMsg: errorMsg,
    });
};

export const setSentryEnvironment = (maybeHost: string | undefined): SentryEnvironment => {
    if (maybeHost && typeof maybeHost === 'string') {
        if (maybeHost.indexOf('localhost') > -1) {
            return SentryEnvironment.LOCALHOST;
        }
        if (maybeHost.indexOf('www-q0.nav.no') > -1 || maybeHost.indexOf('intern.dev.nav.no') > -1) {
            return SentryEnvironment.q;
        }
        if (maybeHost.indexOf('www.nav.no') > -1) {
            return SentryEnvironment.prod;
        }
    }
    return SentryEnvironment.hostUndefined;
};

const setSentryEnvironmentFromHost = (): SentryEnvironment => setSentryEnvironment(window?.location?.host);

type AllowUrlsType = Array<string | RegExp>;
type IgnoreErrorsType = Array<string | RegExp>;

interface SentryInitProps {
    allowUrls?: AllowUrlsType;
    ignoreErrors?: IgnoreErrorsType;
}

const errorsToIgnore = [
    'TypeError: Failed to fetch',
    'TypeError: Load failed',
    'TypeError: NetworkError when attempting to fetch resource.',
    'TypeError: cancelled',
    'TypeError: avbrutt',
    'TypeError: cancelado',
    'TypeError: anulowane',
    'TypeError: avbruten',
    'TypeError: anulat',
    'Request failed with status code 401',
    /\[401\]/,
    /\[0\]/,
    '*Non-Error promise rejection captured with value: Request timeout*',
];

export const setupIgnoreErrorsAndAllowUrls = (
    initProps: SentryInitProps,
): {
    allowUrls: AllowUrlsType;
    ignoreErrors: IgnoreErrorsType;
} => {
    const allowUrls: AllowUrlsType = initProps.allowUrls || [/https?:\/\/((dev|www)\.)?nav\.no/];
    const ignoreErrors: IgnoreErrorsType = initProps.ignoreErrors || [];
    try {
        ignoreErrors.push(...errorsToIgnore);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
        /* empty */
    }
    return { allowUrls, ignoreErrors };
};

const initSentryForSIF = (initProps: SentryInitProps = {}) => {
    Sentry.init({
        dsn: 'https://20da9cbb958c4f5695d79c260eac6728@sentry.gc.nav.no/30',
        environment: setSentryEnvironmentFromHost(),
        ...initProps,
        ...setupIgnoreErrorsAndAllowUrls(initProps),
    });
};

const getSentryLoggerForApp = (application: string, allowUrls: AllowUrlsType, ignoreErrors?: IgnoreErrorsType) => ({
    init: () => initSentryForSIF({ allowUrls, ignoreErrors }),
    log: (message: string, severity: SeverityLevel, payload?: string) =>
        logToSentryOrConsole(message, severity, application, payload ? { info: payload } : undefined),
    logInfo: (message: string, payload?: string | Extras) =>
        logToSentryOrConsole(message, 'info', application, payload ? { info: payload } : undefined),
    logError: (message: string, payload?: string) =>
        logToSentryOrConsole(message, 'error', application, payload ? { info: payload } : undefined),
    logApiError: (error: AxiosError) => logApiCallErrorToSentryOrConsole(error, application),
    logToSentry: (message: string, severity: SeverityLevel, payload?: string) =>
        logToSentry(message, severity, application, payload ? { info: payload } : undefined),
});

export default getSentryLoggerForApp;
