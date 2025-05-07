import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { getMaybeEnv, getRequiredEnv } from '@navikt/sif-common-env';
import App from './App';

async function enableMocking() {
    const ENV = getMaybeEnv('ENV');
    if (ENV !== 'development') {
        return;
    }
    const { worker } = await import('../mock/msw/browser');
    if (document.location.pathname === '/') {
        document.location.replace(getRequiredEnv('PUBLIC_PATH'));
    }
    return worker.start({
        serviceWorker: {
            url: getRequiredEnv('PUBLIC_PATH') + '/mockServiceWorker.js',
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
