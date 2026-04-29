import {
    defaultSentryIgnoreErrors,
    isErrorFromDekoratøren,
    isRedirectingToLogin,
    scrubEvent,
} from '@navikt/sif-common-sentry';
import * as Sentry from '@sentry/react';

export { setRedirectingToLogin } from '@navikt/sif-common-sentry';

Sentry.init({
    dsn: 'https://20da9cbb958c4f5695d79c260eac6728@sentry.gc.nav.no/30',
    environment: window.location.hostname.includes('localhost') ? 'localhost' : import.meta.env.MODE,
    enabled: window.location.hostname.endsWith('.nav.no') || window.location.hostname === 'nav.no',
    initialScope: {
        tags: { application: 'aktivitetspenger-innsyn' },
    },
    ignoreErrors: defaultSentryIgnoreErrors,
    allowUrls: [/https?:\/\/.*\.?nav\.no/],
    sendDefaultPii: false,
    beforeSend(event) {
        if (isRedirectingToLogin()) {
            return null;
        }
        if (isErrorFromDekoratøren(event)) {
            return null;
        }
        return scrubEvent(event);
    },
});
