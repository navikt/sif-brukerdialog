import { getMaybeEnv } from '@navikt/sif-common-env';

export async function enableMocking() {
    const isE2E = getMaybeEnv('E2E_TEST') === 'true';

    if (import.meta.env.MODE !== 'msw' || isE2E) {
        return;
    }
    const { worker } = await import('./browser');
    if (typeof __IS_GITHUB_PAGES__ !== 'undefined' && __IS_GITHUB_PAGES__) {
        /** Service worker ligger under base-pathen på GitHub Pages, ikke på roten */
        return worker.start({
            serviceWorker: {
                url: `${import.meta.env.BASE_URL}mockServiceWorker.js`,
            },
        });
    }
    return worker.start();
}
