import { getMaybeEnv } from '@navikt/sif-common-env';

export async function enableMocking() {
    const ENV = getMaybeEnv('ENV');
    const SIF_PUBLIC_USE_MSW = getMaybeEnv('SIF_PUBLIC_USE_MSW');

    if (ENV !== 'development' || !SIF_PUBLIC_USE_MSW) {
        return;
    }
    const { worker } = await import('./browser');
    return worker.start();
}
