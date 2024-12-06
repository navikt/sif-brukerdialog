import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { getMaybeEnv } from '@navikt/sif-common-env';

async function enableMocking() {
    const ENV = getMaybeEnv('ENV');
    if (ENV !== 'demo') {
        return;
    }
    const { worker } = await import('../msw/browser');
    // `worker.start()` returns a Promise that resolves
    // once the Service Worker is up and ready to intercept requests.
    return worker.start({
        serviceWorker: {
            url: '/assets/mockServiceWorker.js',
        },
    });
}
enableMocking().then(() =>
    createRoot(document.getElementById('root')!).render(
        <StrictMode>
            <App />
        </StrictMode>,
    ),
);
