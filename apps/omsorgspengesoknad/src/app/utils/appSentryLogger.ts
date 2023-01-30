import getSentryLoggerForApp from '@navikt/sif-common-sentry';

const appSentryLogger = getSentryLoggerForApp('omsorgspengesøknad', ['omsorgspengesoknad.nav.no/dist/js'], [/401/]);

export default appSentryLogger;
