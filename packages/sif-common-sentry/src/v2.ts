import type { ErrorEvent } from '@sentry/browser';
import * as Sentry from '@sentry/browser';

import { isErrorFromDekoratøren } from './sentryFilters';

export { beforeSendFilter, isErrorFromDekoratøren } from './sentryFilters';

let redirectingToLogin = false;

export const setRedirectingToLogin = (): void => {
    redirectingToLogin = true;
};

export const isRedirectingToLogin = (): boolean => redirectingToLogin;

export const scrubUrl = (url: string): string => url.replace(/\/[0-9]+(?=\/|$)/g, '/[id]');

export const scrubEvent = (event: ErrorEvent): ErrorEvent => {
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

export interface SentryConfig {
    dsn: string;
    application: string;
}

export const initSentry = ({ dsn, application }: SentryConfig): void => {
    const importMetaEnv = (import.meta as { env?: { MODE?: string } }).env;
    Sentry.init({
        dsn,
        environment: window.location.hostname.includes('localhost') ? 'localhost' : (importMetaEnv?.MODE ?? 'unknown'),
        enabled: window.location.hostname.endsWith('.nav.no') || window.location.hostname === 'nav.no',
        initialScope: {
            tags: { application },
        },
        ignoreErrors: defaultSentryIgnoreErrors,
        allowUrls: [/https?:\/\/.*\.?nav\.no/],
        sendDefaultPii: false,
        beforeSend(event) {
            if (isRedirectingToLogin()) {
                return null;
            }
            if (isErrorFromDekoratøren(event)) {
                return null;
            }
            return scrubEvent(event);
        },
    });
};
