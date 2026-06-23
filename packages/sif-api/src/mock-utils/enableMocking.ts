import { getMaybeEnv, getRequiredEnv } from '@navikt/sif-common-env';

interface SetupWorker {
    start: (options?: { onUnhandledRequest?: 'bypass' | 'warn' | 'error' }) => Promise<unknown>;
}

interface EnableMockingOptions {
    loadWorker: () => Promise<{ worker: SetupWorker }>;
    mode: string;
}

export async function enableMocking({ loadWorker, mode }: EnableMockingOptions) {
    const ENV = getMaybeEnv('ENV');
    const isDevelopment = ENV === 'development';
    const isMockMode = mode === 'msw' || mode === 'playwright';

    if (!isDevelopment || !isMockMode) {
        return;
    }

    const { worker } = await loadWorker();

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
