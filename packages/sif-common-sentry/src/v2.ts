import * as Sentry from '@sentry/react';

let redirectingToLogin = false;

export const setRedirectingToLogin = (): void => {
    redirectingToLogin = true;
};

export const isRedirectingToLogin = (): boolean => redirectingToLogin;

export const scrubUrl = (url: string): string => url.replace(/\/[0-9]+(?=\/|$)/g, '/[id]');

export const scrubEvent = (event: Sentry.ErrorEvent): Sentry.ErrorEvent => {
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

export const defaultSentryIgnoreErrors: Array<string | RegExp> = [
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
