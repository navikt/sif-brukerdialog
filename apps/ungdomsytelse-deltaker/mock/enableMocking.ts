import { getMaybeEnv, getRequiredEnv } from '@navikt/sif-common-env';

export async function enableMocking() {
    const ENV = getMaybeEnv('ENV');

    if (ENV !== 'development' || import.meta.env.MODE !== 'msw') {
        return;
    }

    const { worker } = await import('./msw/browser');
    if (document.location.pathname === '/') {
        document.location.replace(getRequiredEnv('PUBLIC_PATH'));
    }
    try {
        if (__IS_GITHUB_PAGES__) {
            return worker.start({
                serviceWorker: {
                    url: import.meta.env.BASE_URL + 'mockServiceWorker.js',
                },
            });
        } else {
            return worker.start();
        }
    } catch {
        // do nothing
    }
    return worker.start();
}
