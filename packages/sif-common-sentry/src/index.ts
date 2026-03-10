import * as Sentry from '@sentry/browser';
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

export const logToSentry = (
    message: string,
    severity: Sentry.SeverityLevel,
    application: string,
    extras?: Extras,
): void => {
    Sentry.withScope((scope) => {
        if (extras) {
            scope.setExtras(extras);
        }
        scope.setTag(TAG_APPLICATION, application);
        Sentry.captureMessage(message, severity);
    });
};

const logToSentryOrConsole = (
    message: string,
    severity: Sentry.SeverityLevel,
    application: string,
    extras?: Extras,
): void => {
    if (isRunningLocally(window.location.hostname)) {
        // eslint-disable-next-line no-console
        console.warn(`Severity: ${severity}. Message: ${message}`, extras);
    } else {
        logToSentry(message, severity, application, extras);
    }
};

const logApiCallErrorToSentryOrConsole = (error: AxiosError, application: string, context?: string): void => {
    const headers = error?.response?.headers;
    const maybeXRequestId: string | undefined = headers ? headers['x-request-id'] : undefined;
    const maybeCorrelationId: string | undefined = headers ? headers['x-correlation-id'] : undefined;
    const errorMsg: string | undefined = error?.message;

    const status = error.response?.status;

    // Axios gir ikke alltid status 0, men gir ERR_NETWORK
    if (status === 401 || status === 0 || error.code === 'ERR_NETWORK') {
        return;
    }
    logToSentryOrConsole('Api call error', 'error', application, {
        XRequestId: maybeXRequestId || undefined,
        errorMsg: errorMsg,
        context,
        maybeCorrelationId,
    });
};

interface CaptureExceptionOptions {
    tags?: Record<string, string>;
    extra?: Extras;
    context?: string;
}

export type { CaptureExceptionOptions };

type BreadcrumbCategory = 'api' | 'fetch' | 'navigation' | 'user' | 'system';

interface BreadcrumbOptions {
    category: BreadcrumbCategory;
    message: string;
    data?: Record<string, unknown>;
    level?: Sentry.SeverityLevel;
}

export type { BreadcrumbOptions };

const addBreadcrumbToSentry = ({ category, message, data, level = 'info' }: BreadcrumbOptions): void => {
    if (isRunningLocally(window.location.hostname)) {
        // eslint-disable-next-line no-console
        console.debug(`[Sentry Breadcrumb] ${category}: ${message}`, data);
        return;
    }
    Sentry.addBreadcrumb({
        category,
        message,
        data,
        level,
        timestamp: Date.now() / 1000,
    });
};

const captureExceptionToSentryOrConsole = (
    error: Error | unknown,
    application: string,
    options?: CaptureExceptionOptions,
): void => {
    if (isRunningLocally(window.location.hostname)) {
        // eslint-disable-next-line no-console
        console.error(`[Sentry] Exception captured:`, error, options);
        return;
    }

    Sentry.withScope((scope) => {
        scope.setTag(TAG_APPLICATION, application);

        if (options?.tags) {
            Object.entries(options.tags).forEach(([key, value]) => {
                scope.setTag(key, value);
            });
        }

        if (options?.extra) {
            scope.setExtras(options.extra);
        }

        if (options?.context) {
            scope.setTransactionName(options.context);
        }

        Sentry.captureException(error);
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
    } catch {
        /* empty */
    }
    return { allowUrls, ignoreErrors };
};

const dekoratorenTimeoutPatterns = ['Request timeout', 'dekoratoren'];

export const isErrorFromDekoratøren = (event: Sentry.ErrorEvent): boolean => {
    const values = event.exception?.values ?? [];

    const frames = values.flatMap((v) => v.stacktrace?.frames ?? []);
    if (frames.some((f) => (f.filename ?? '').includes('/dekoratoren/'))) {
        return true;
    }

    const firstValue = values[0];
    if (firstValue?.type === 'UnhandledRejection') {
        const message = firstValue.value ?? '';
        if (dekoratorenTimeoutPatterns.some((pattern) => message.includes(pattern))) {
            return true;
        }
    }

    return false;
};

export const beforeSendFilter = (event: Sentry.ErrorEvent): Sentry.ErrorEvent | null => {
    if (isErrorFromDekoratøren(event)) {
        return null;
    }
    return event;
};

const initSentryForSIF = (initProps: SentryInitProps = {}) => {
    Sentry.init({
        dsn: 'https://20da9cbb958c4f5695d79c260eac6728@sentry.gc.nav.no/30',
        environment: setSentryEnvironmentFromHost(),
        ...initProps,
        ...setupIgnoreErrorsAndAllowUrls(initProps),
        beforeSend: beforeSendFilter,
    });
};

const getSentryLoggerForApp = (application: string, allowUrls: AllowUrlsType, ignoreErrors?: IgnoreErrorsType) => ({
    init: () => initSentryForSIF({ allowUrls, ignoreErrors }),
    log: (message: string, severity: Sentry.SeverityLevel, payload?: string) =>
        logToSentryOrConsole(message, severity, application, payload ? { info: payload } : undefined),
    logInfo: (message: string, payload?: string | Extras) =>
        logToSentryOrConsole(message, 'info', application, payload ? { info: payload } : undefined),
    logError: (message: string, payload?: string) =>
        logToSentryOrConsole(message, 'error', application, payload ? { info: payload } : undefined),
    logApiError: (error: AxiosError, context?: string) => logApiCallErrorToSentryOrConsole(error, application, context),
    logToSentry: (message: string, severity: Sentry.SeverityLevel, payload?: string) =>
        logToSentry(message, severity, application, payload ? { info: payload } : undefined),
    captureException: (error: Error | unknown, options?: CaptureExceptionOptions) =>
        captureExceptionToSentryOrConsole(error, application, options),
    addBreadcrumb: (options: BreadcrumbOptions) => addBreadcrumbToSentry(options),
});

export default getSentryLoggerForApp;
