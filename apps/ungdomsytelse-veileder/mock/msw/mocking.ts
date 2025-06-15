import { getMaybeEnv } from '@navikt/sif-common-env';

export async function enableMocking() {
    const ENV = getMaybeEnv('ENV');
    const DEV_USE_MSW = getMaybeEnv('DEV_USE_MSW');

    if (ENV !== 'development' || !DEV_USE_MSW) {
        return;
    }
    const { worker } = await import('./browser');
    return worker.start({
        onUnhandledRequest: 'bypass',
    });
}
