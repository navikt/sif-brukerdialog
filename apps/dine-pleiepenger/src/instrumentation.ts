import * as Sentry from '@sentry/nextjs';

export async function register() {
    if (process.env.NEXT_RUNTIME === 'nodejs') {
        Sentry.init({
            dsn: 'https://20da9cbb958c4f5695d79c260eac6728@sentry.gc.nav.no/30',
            environment: process.env.NEXT_PUBLIC_RUNTIME_ENVIRONMENT || 'unknown',
            enabled: process.env.NODE_ENV === 'production',
            tracesSampleRate: 0.1,
            ignoreErrors: ['TypeError: Failed to fetch', 'Request failed with status code 401', /\[401\]/, /\[0\]/],
        });
    }

    if (process.env.NEXT_RUNTIME === 'edge') {
        Sentry.init({
            dsn: 'https://20da9cbb958c4f5695d79c260eac6728@sentry.gc.nav.no/30',
            environment: process.env.NEXT_PUBLIC_RUNTIME_ENVIRONMENT || 'unknown',
            enabled: process.env.NODE_ENV === 'production',
            tracesSampleRate: 0.1,
        });
    }
}

export const onRequestError = Sentry.captureRequestError;
