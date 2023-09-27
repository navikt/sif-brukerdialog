import getSentryLoggerForApp from '@navikt/sif-common-sentry';

const appSentryLogger = getSentryLoggerForApp('pleiepenger-i-livets-sluttfase-soknad', [
    'pleiepenger-i-livets-sluttfase.nav.no/dist/js',
]);

export default appSentryLogger;
