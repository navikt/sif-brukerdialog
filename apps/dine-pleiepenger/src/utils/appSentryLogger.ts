import getSentryLoggerForApp from '@navikt/sif-common-sentry';

const appSentryLogger = getSentryLoggerForApp('sif-innsyn', ['sykdom-i-familien']);

export default appSentryLogger;
