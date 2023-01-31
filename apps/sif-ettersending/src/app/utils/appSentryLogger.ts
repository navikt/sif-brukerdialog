import getSentryLoggerForApp from '@navikt/sif-common-sentry';

const appSentryLogger = getSentryLoggerForApp('ettersending', ['sykdom-i-familien'], [/401/]);

export default appSentryLogger;
