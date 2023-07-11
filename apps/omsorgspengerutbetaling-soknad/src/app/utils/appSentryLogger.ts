import getSentryLoggerForApp from '@navikt/sif-common-sentry';

const appSentryLogger = getSentryLoggerForApp('omsorgspengerutbetaling-soknad', [
    'omsorgspengerutbetaling-soknad.nav.no/dist/js',
]);

export default appSentryLogger;
