import getSentryLoggerForApp from '@navikt/sif-common-sentry';

const appSentryLogger = getSentryLoggerForApp('ekstra-omsorgsdager-andre-forelder-ikke-tilsyn', [
    'ekstra-omsorgsdager-andre-forelder-ikke-tilsyn.nav.no/dist/js',
]);

export default appSentryLogger;
