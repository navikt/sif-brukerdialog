import getSentryLoggerForApp from '@navikt/sif-common-sentry';
import { APPLICATION_KEY } from '../App';

const appSentryLogger = getSentryLoggerForApp(APPLICATION_KEY);

export default appSentryLogger;
