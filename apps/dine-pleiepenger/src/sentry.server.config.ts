import * as Sentry from '@sentry/nextjs';

const SENTRY_DSN = 'https://037e190b6b4e6e9703cc67ee6d49d565@sentry.gc.nav.no/187';

const getEnvironment = (): string => {
    const env = process.env.NEXT_PUBLIC_RUNTIME_ENVIRONMENT;
    if (env === 'production') return 'prod';
    if (env === 'dev') return 'dev';
    return 'localhost';
};

const isEnabled = getEnvironment() !== 'localhost';

const scrubUrl = (url: string): string =>
    url
        .replace(/\/sak\/[^/]+/g, '/sak/[saksnr]')
        .replace(/\/inntektsmelding\/[^/]+/g, '/inntektsmelding/[journalpostId]');

Sentry.init({
    dsn: SENTRY_DSN,
    environment: getEnvironment(),

    tracesSampleRate: 0.1,

    enabled: isEnabled,

    beforeSend(event) {
        if (process.env.NEXT_PUBLIC_SCRUB_SENTRY === 'off') {
            return event;
        }
        if (event.request?.url) {
            event.request.url = scrubUrl(event.request.url);
        }
        if (event.transaction) {
            event.transaction = scrubUrl(event.transaction);
        }
        return event;
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
});
