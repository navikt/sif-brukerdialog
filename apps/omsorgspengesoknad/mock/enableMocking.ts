import { getMaybeEnv } from '@navikt/sif-common-env';

export async function enableMocking() {
    if (getMaybeEnv('ENV') !== 'development' || import.meta.env.MODE !== 'msw') {
        return;
    }
    const { worker } = await import('./msw/browser');
    return worker.start();
}
