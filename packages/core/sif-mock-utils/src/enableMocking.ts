import { getMaybeEnv, getRequiredEnv } from '@sif/env';

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
        await worker.start({ onUnhandledRequest: 'warn' });
    } catch (error) {
        // Appen skal fortsatt rendres, men uten mock
        // eslint-disable-next-line no-console
        console.error('Kunne ikke starte MSW', error);
    }
}
