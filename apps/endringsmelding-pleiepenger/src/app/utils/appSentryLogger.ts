import getSentryLoggerForApp from '@navikt/sif-common-sentry';

export const appSentryLogger = getSentryLoggerForApp('pleiepengesoknad', ['pleiepengesoknad.nav.no/dist/js']);
