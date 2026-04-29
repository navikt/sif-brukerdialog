import {
    defaultSentryIgnoreErrors,
    isErrorFromDekoratøren,
    isRedirectingToLogin,
    scrubEvent,
} from '@navikt/sif-common-sentry';
import * as Sentry from '@sentry/react';

export { setRedirectingToLogin } from '@navikt/sif-common-sentry';

Sentry.init({
    dsn: 'https://01c0cdacd803d88882c2eab4c345c610@sentry.gc.nav.no/179',
    environment: window.location.hostname.includes('localhost') ? 'localhost' : import.meta.env.MODE,
    enabled: window.location.hostname.endsWith('.nav.no') || window.location.hostname === 'nav.no',
    initialScope: {
        tags: { application: 'ungdomsytelse-deltaker' },
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
