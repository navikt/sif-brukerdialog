import * as Sentry from '@sentry/nextjs';

const getEnvironment = (): string => {
    if (typeof window === 'undefined') return 'server';
    const host = window.location.host;
    if (host.includes('localhost')) return 'localhost';
    if (host.includes('intern.dev.nav.no') || host.includes('www-q0.nav.no')) return 'q';
    if (host.includes('www.nav.no')) return 'prod';
    return 'unknown';
};

Sentry.init({
    dsn: 'https://20da9cbb958c4f5695d79c260eac6728@sentry.gc.nav.no/30',
    environment: getEnvironment(),
    enabled: true, // TODO: Sett tilbake til: typeof window !== 'undefined' && !window.location.host.includes('localhost')
    debug: true,
    tracesSampleRate: 0.1,
    replaysSessionSampleRate: 0,
    replaysOnErrorSampleRate: 0,
    ignoreErrors: [
        'TypeError: Failed to fetch',
        'TypeError: Load failed',
        'TypeError: NetworkError when attempting to fetch resource.',
        'TypeError: cancelled',
        'Request failed with status code 401',
        /\[401\]/,
        /\[0\]/,
    ],
    allowUrls: [/https?:\/\/[^/]*nav\.no/],
    beforeSend(event) {
        const frames = event.exception?.values?.flatMap((v) => v.stacktrace?.frames ?? []) ?? [];
        if (frames.some((f) => (f.filename ?? '').includes('/dekoratoren/'))) {
            return null;
        }
        return event;
    },
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;

// For testing i konsollen - fjern før commit
if (typeof window !== 'undefined') {
    (window as unknown as { Sentry: typeof Sentry }).Sentry = Sentry;
}
