import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { getMaybeEnv } from '@navikt/sif-common-env';
import App from './App';

async function enableMocking() {
    const ENV = getMaybeEnv('ENV');
    if (ENV !== 'development') {
        return;
    }
    const { worker } = await import('../mock/msw/browser');
    return worker.start();
}

enableMocking().then(() =>
    createRoot(document.getElementById('root')!).render(
        <StrictMode>
            <BrowserRouter basename={'/'}>
                <App />
            </BrowserRouter>
        </StrictMode>,
    ),
);
