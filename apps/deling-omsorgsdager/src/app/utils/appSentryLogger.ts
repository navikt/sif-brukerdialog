import getSentryLoggerForApp from '@navikt/sif-common-sentry';

const APPLICATION_KEY = 'deling-omsorgsdager';
const appSentryLogger = getSentryLoggerForApp(APPLICATION_KEY);

export default appSentryLogger;
