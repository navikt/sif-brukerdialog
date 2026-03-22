import * as Sentry from '@sentry/react';

Sentry.init({
    dsn: 'https://20da9cbb958c4f5695d79c260eac6728@sentry.gc.nav.no/30',
    environment: window.location.hostname.includes('localhost') ? 'localhost' : import.meta.env.MODE,
    enabled: !window.location.hostname.includes('localhost'),
    initialScope: {
        tags: { application: 'aktivitetspenger-soknad' },
    },
});
