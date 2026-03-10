import * as Sentry from '@sentry/nextjs';

const SENTRY_DSN = 'https://20da9cbb958c4f5695d79c260eac6728@sentry.gc.nav.no/30';

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

const dekoratorenTimeoutPatterns = ['Request timeout', 'dekoratoren'];

const isErrorFromDekoratøren = (event: Sentry.ErrorEvent): boolean => {
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

const getEnvironment = (): string => {
    const host = typeof window !== 'undefined' ? window.location.host : '';
    if (host.includes('localhost')) return 'localhost';
    if (host.includes('intern.dev.nav.no') || host.includes('www-q0.nav.no')) return 'dev';
    if (host.includes('www.nav.no')) return 'prod';
    return 'unknown';
};

Sentry.init({
    dsn: SENTRY_DSN,
    environment: getEnvironment(),

    tracesSampleRate: 0.1, // 100% for testing, reduser til 0.1 i prod
    replaysSessionSampleRate: 0,
    replaysOnErrorSampleRate: 0.1,

    ignoreErrors: errorsToIgnore,
    allowUrls: [/https?:\/\/.*\.?nav\.no/],

    beforeSend(event) {
        if (isErrorFromDekoratøren(event)) {
            return null;
        }
        return event;
    },

    integrations: [Sentry.browserTracingIntegration()],
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
