import getSentryLoggerForApp from '@navikt/sif-common-sentry';

const appSentryLogger = getSentryLoggerForApp('omsorgspengerutbetaling-arbeidstaker-soknad', [
    'omsorgspengerutbetaling-arbeidstaker-soknad.nav.no/dist/js',
]);

export default appSentryLogger;
