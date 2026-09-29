import { getMaybeEnv } from '@navikt/sif-common-env';
import { enableMocking as enableMockingBase } from '@sif/api/mock-utils';

import { isGitHubPages } from '../src/app/utils/isGitHubPages';

export async function enableMocking() {
    if (isGitHubPages()) {
        // MSW registreres på origin-roten som standard - må settes eksplisitt under gh-pages sin base-path.
        if (getMaybeEnv('ENV') !== 'development') {
            return;
        }
        const { worker } = await import('./msw/browser');
        return worker.start({
            serviceWorker: {
                url: import.meta.env.BASE_URL + 'mockServiceWorker.js',
            },
        });
    }

    return enableMockingBase({
        loadWorker: () => import('./msw/browser'),
        mode: import.meta.env.MODE,
    });
}
