import { getMaybeEnv, getRequiredEnv } from '@navikt/sif-common-env';

export async function enableMocking() {
    const ENV = getMaybeEnv('ENV');
    if (ENV !== 'development') {
        return;
    }
    const { worker } = await import('./browser');
    if (document.location.pathname === '/') {
        document.location.replace(getRequiredEnv('PUBLIC_PATH'));
    }
    try {
        if (__IS_GITHUB_PAGES__) {
            return worker.start({
                serviceWorker: {
                    url: getRequiredEnv('PUBLIC_PATH') + '/mockServiceWorker.js',
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
