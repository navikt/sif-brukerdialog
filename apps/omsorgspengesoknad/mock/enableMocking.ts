import { getMaybeEnv } from '@navikt/sif-common-env';

export async function enableMocking() {
    const ENV = getMaybeEnv('ENV');

    if (ENV !== 'development' || import.meta.env.MODE !== 'msw') {
        return;
    }

    const { worker } = await import('./msw/browser');

    return worker.start();
}
