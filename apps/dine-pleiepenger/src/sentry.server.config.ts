import * as Sentry from '@sentry/nextjs';

const SENTRY_DSN = 'https://20da9cbb958c4f5695d79c260eac6728@sentry.gc.nav.no/30';

const getEnvironment = (): string => {
    const env = process.env.NEXT_PUBLIC_RUNTIME_ENVIRONMENT;
    if (env === 'production') return 'prod';
    if (env === 'dev') return 'dev';
    return 'localhost';
};

Sentry.init({
    dsn: SENTRY_DSN,
    environment: getEnvironment(),

    tracesSampleRate: 0.1,

    // Ikke kjør i localhost
    enabled: getEnvironment() !== 'localhost',
});
