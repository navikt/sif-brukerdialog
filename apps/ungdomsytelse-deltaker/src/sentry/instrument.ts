import * as Sentry from '@sentry/react';

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

const isErrorFromDekoratøren = (event: Sentry.ErrorEvent): boolean => {
    const values = event.exception?.values ?? [];
    const frames = values.flatMap((v) => v.stacktrace?.frames ?? []);
    if (frames.some((f) => (f.filename ?? '').includes('/dekoratoren/'))) {
        return true;
    }
    const firstValue = values[0];
    if (firstValue?.type === 'UnhandledRejection') {
        const message = firstValue.value ?? '';
        if (['Request timeout', 'dekoratoren'].some((pattern) => message.includes(pattern))) {
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

Sentry.init({
    dsn: 'https://01c0cdacd803d88882c2eab4c345c610@sentry.gc.nav.no/179',
    environment: window.location.hostname.includes('localhost') ? 'localhost' : import.meta.env.MODE,
    enabled: window.location.hostname.endsWith('.nav.no') || window.location.hostname === 'nav.no',
    initialScope: {
        tags: { application: 'ungdomsytelse-deltaker' },
    },
    ignoreErrors: errorsToIgnore,
    allowUrls: [/https?:\/\/.*\.?nav\.no/],
    sendDefaultPii: false,
    beforeSend(event) {
        if (isErrorFromDekoratøren(event)) {
            return null;
        }
        return scrubEvent(event);
    },
});
