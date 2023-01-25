import getSentryLoggerForApp from '@navikt/sif-common-sentry';

const appSentryLogger = getSentryLoggerForApp('pleiepengesoknad', ['pleiepengesoknad.nav.no/dist/js']);

export default appSentryLogger;
