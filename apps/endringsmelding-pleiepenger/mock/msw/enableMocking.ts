import { getMaybeEnv } from '@navikt/sif-common-env';

export async function enableMocking() {
    const isE2E = getMaybeEnv('E2E_TEST') === 'true';

    if (import.meta.env.MODE !== 'msw' || isE2E) {
        return;
    }
    const { worker } = await import('./browser');
    return worker.start();
}
