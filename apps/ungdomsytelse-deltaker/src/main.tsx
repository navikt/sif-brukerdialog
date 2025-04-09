import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { getMaybeEnv, getRequiredEnv } from '@navikt/sif-common-env';
import App from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

async function enableMocking() {
    const ENV = getMaybeEnv('ENV');

    if (ENV !== 'development') {
        return;
    }
    const { worker } = await import('../mock/msw/browser');

    const publicPath = getRequiredEnv('PUBLIC_PATH');

    if (publicPath === '/') {
        return worker.start();
    }
    return worker.start({
        serviceWorker: {
            options: { scope: `${publicPath}/` },
            url: `${publicPath}/mockServiceWorker.js`,
        },
    });
}

const queryClient = new QueryClient();

enableMocking().then(() =>
    createRoot(document.getElementById('root')!).render(
        <StrictMode>
            <QueryClientProvider client={queryClient}>
                <App />
            </QueryClientProvider>
        </StrictMode>,
    ),
);
