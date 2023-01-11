import getSentryLoggerForApp from '@navikt/sif-common-sentry';

const appSentryLogger = getSentryLoggerForApp('app-template', ['sif-app-template.nav.no/dist/js']);

export default appSentryLogger;
