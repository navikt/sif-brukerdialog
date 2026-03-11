import * as Sentry from '@sentry/nextjs';

const SENTRY_DSN = 'https://037e190b6b4e6e9703cc67ee6d49d565@sentry.gc.nav.no/187';

const getEnvironment = (): string => {
    const env = process.env.NEXT_PUBLIC_RUNTIME_ENVIRONMENT;
    if (env === 'production') return 'prod';
    if (env === 'dev') return 'dev';
    return 'localhost';
};

const isEnabled = getEnvironment() !== 'localhost';

Sentry.init({
    dsn: SENTRY_DSN,
    environment: getEnvironment(),

    tracesSampleRate: 0.1, // 100% for testing, reduser til 0.1 i prod

    enabled: isEnabled,
});
