import * as Sentry from '@sentry/react';

enum SentryEnvironment {
    localhost = 'localhost',
    dev = 'dev',
    prod = 'prod',
}

const resolveEnvironment = (): SentryEnvironment | undefined => {
    const hostname = window.location.hostname || undefined;
    if (hostname) {
        if (hostname.includes('localhost')) {
            return SentryEnvironment.localhost;
        } else if (hostname.includes('dev.nav.no')) {
            return SentryEnvironment.dev;
        } else if (hostname.includes('www.nav.no')) {
            return SentryEnvironment.prod;
        }
    }
    return undefined;
};

export const initSentry = () => {
    const environment = resolveEnvironment();
    if (!environment) {
        return;
    }
    Sentry.init({
        dsn: 'https://01c0cdacd803d88882c2eab4c345c610@sentry.gc.nav.no/179',
        integrations: [Sentry.browserTracingIntegration()],
        environment,
        tracesSampleRate: 0.0, //  Skru av default tracing
    });
};
