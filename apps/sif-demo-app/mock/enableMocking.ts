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
        return worker.start({
            onUnhandledRequest: 'warn',
        });
    } catch {
        // do nothing
    }

    return worker.start();
}
