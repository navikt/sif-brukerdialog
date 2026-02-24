import * as Sentry from '@sentry/nextjs';
import { isErrorFromDekoratoren, maskUrlIds, SENTRY_DSN, SENTRY_IGNORE_ERRORS } from './utils/sentryUtils';

const getEnvironment = (): string => {
    if (typeof window === 'undefined') return 'server';
    const host = window.location.host;
    if (host.includes('localhost')) return 'localhost';
    if (host.includes('intern.dev.nav.no') || host.includes('www-q0.nav.no')) return 'q';
    if (host.includes('www.nav.no')) return 'prod';
    return 'unknown';
};

Sentry.init({
    dsn: SENTRY_DSN,
    environment: getEnvironment(),
    enabled: true, // TODO: Sett tilbake til: typeof window !== 'undefined' && !window.location.host.includes('localhost')
    debug: true,
    tracesSampleRate: 0.1,
    replaysSessionSampleRate: 0,
    replaysOnErrorSampleRate: 0,
    ignoreErrors: SENTRY_IGNORE_ERRORS,
    allowUrls: [/https?:\/\/[^/]*nav\.no/],
    beforeSend(event) {
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
    beforeBreadcrumb(breadcrumb) {
        if (breadcrumb.category === 'navigation') {
            if (breadcrumb.data?.to) {
                breadcrumb.data.to = maskUrlIds(breadcrumb.data.to);
            }
            if (breadcrumb.data?.from) {
                breadcrumb.data.from = maskUrlIds(breadcrumb.data.from);
            }
        }
        if (breadcrumb.data?.url) {
            breadcrumb.data.url = maskUrlIds(breadcrumb.data.url);
        }
        return breadcrumb;
    },
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;

// For testing i konsollen - fjern før commit
if (typeof window !== 'undefined') {
    (window as unknown as { Sentry: typeof Sentry }).Sentry = Sentry;
}
