import getSentryLoggerForApp from '@navikt/sif-common-sentry';

const appSentryLogger = getSentryLoggerForApp('opplaringspenger', ['opplaringspenger.nav.no/dist/js']);

export default appSentryLogger;
