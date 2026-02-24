import * as Sentry from '@sentry/nextjs';
import { isErrorFromDekoratoren, maskUrlIds, SENTRY_DSN, SENTRY_IGNORE_ERRORS } from './utils/sentryUtils';

const getSentryEnvironment = (): string => {
    const env = process.env.NEXT_PUBLIC_RUNTIME_ENVIRONMENT;
    if (env === 'production') return 'prod';
    if (env === 'development') return 'q';
    return env || 'unknown';
};

const getCommonSentryOptions = () => ({
    dsn: SENTRY_DSN,
    environment: getSentryEnvironment(),
    enabled: process.env.NODE_ENV === 'production',
    tracesSampleRate: 0.1,
    ignoreErrors: SENTRY_IGNORE_ERRORS,
    beforeSend(event: Sentry.ErrorEvent) {
        const frames = event.exception?.values?.flatMap((v) => v.stacktrace?.frames ?? []) ?? [];
        if (isErrorFromDekoratoren(frames)) {
            return null;
        }
        if (event.request?.url) {
            event.request.url = maskUrlIds(event.request.url);
        }
        if (event.transaction) {
            event.transaction = maskUrlIds(event.transaction);
        }
        return event;
    },
});

export async function register() {
    if (process.env.NEXT_RUNTIME === 'nodejs' || process.env.NEXT_RUNTIME === 'edge') {
        Sentry.init(getCommonSentryOptions());
    }
}

export const onRequestError = Sentry.captureRequestError;
