import * as Sentry from '@sentry/nextjs';

const getSentryEnvironment = (): string => {
    const env = process.env.NEXT_PUBLIC_RUNTIME_ENVIRONMENT;
    if (env === 'production') return 'prod';
    if (env === 'development') return 'q';
    return env || 'unknown';
};

const getCommonSentryOptions = () => ({
    dsn: 'https://20da9cbb958c4f5695d79c260eac6728@sentry.gc.nav.no/30',
    environment: getSentryEnvironment(),
    enabled: process.env.NODE_ENV === 'production',
    tracesSampleRate: 0.1,
    ignoreErrors: [
        'TypeError: Failed to fetch',
        'TypeError: Load failed',
        'TypeError: NetworkError when attempting to fetch resource.',
        'TypeError: cancelled',
        'Request failed with status code 401',
        /\[401\]/,
        /\[0\]/,
    ],
    beforeSend(event: Sentry.ErrorEvent) {
        const frames = event.exception?.values?.flatMap((v) => v.stacktrace?.frames ?? []) ?? [];
        if (frames.some((f) => (f.filename ?? '').includes('/dekoratoren/'))) {
            return null;
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
