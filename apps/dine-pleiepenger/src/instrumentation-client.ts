import * as Sentry from '@sentry/nextjs';

const SENTRY_DSN = 'https://037e190b6b4e6e9703cc67ee6d49d565@sentry.gc.nav.no/187';

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
    /Non-Error promise rejection captured with value: Request timeout/,
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

const scrubUrl = (url: string): string => url.replace(/\/[0-9]+(?=\/|$)/g, '/[id]');

const scrubEvent = (event: Sentry.ErrorEvent): Sentry.ErrorEvent => {
    if (event.request?.url) {
        event.request.url = scrubUrl(event.request.url);
    }
    if (event.request?.headers?.Referer) {
        event.request.headers.Referer = scrubUrl(event.request.headers.Referer);
    }
    if (event.transaction) {
        event.transaction = scrubUrl(event.transaction);
    }
    if (event.tags?.transaction) {
        event.tags.transaction = scrubUrl(String(event.tags.transaction));
    }
    const breadcrumbs = event.breadcrumbs ?? [];
    for (const bc of breadcrumbs) {
        if (bc.data?.url) bc.data.url = scrubUrl(bc.data.url);
        if (bc.data?.from) bc.data.from = scrubUrl(bc.data.from);
        if (bc.data?.to) bc.data.to = scrubUrl(bc.data.to);
    }
    return event;
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

    tracesSampleRate: 0.1,
    replaysSessionSampleRate: 0,
    replaysOnErrorSampleRate: 0.1,

    ignoreErrors: errorsToIgnore,
    allowUrls: [/https?:\/\/.*\.?nav\.no/],
    sendDefaultPii: false,

    beforeSend(event: Sentry.ErrorEvent) {
        if (isErrorFromDekoratøren(event)) {
            return null;
        }
        if (process.env.NEXT_PUBLIC_SCRUB_SENTRY === 'off') {
            return event;
        }
        return scrubEvent(event);
    },

    beforeSendTransaction(event) {
        if (process.env.NEXT_PUBLIC_SCRUB_SENTRY === 'off') {
            return event;
        }
        if (event.transaction) {
            event.transaction = scrubUrl(event.transaction);
        }
        if (event.request?.url) {
            event.request.url = scrubUrl(event.request.url);
        }
        return event;
    },

    integrations: [Sentry.browserTracingIntegration()],
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
