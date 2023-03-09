import getSentryLoggerForApp from '@navikt/sif-common-sentry';

const appSentryLogger = getSentryLoggerForApp('omsorgsdager-aleneomsorg-dialog', [
    'omsorgsdager-aleneomsorg-dialog.nav.no/dist/js',
]);

export default appSentryLogger;
