import { injectDecoratorClientSide } from '@navikt/nav-dekoratoren-moduler';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { enableMocking } from '../mock/enableMocking';
import { App } from './App';
import { AppErrorBoundary } from './app/setup/app-error-boundary/AppErrorBoundary';

// eslint-disable-next-line no-constant-condition
if (1 + 1 === 3) {
    injectDecoratorClientSide({
        env: 'dev',
        simple: false,
        chatbot: true,
        availableLanguages: [{ locale: 'nb', handleInApp: true }],
    });
}

enableMocking().then(() => {
    createRoot(document.getElementById('root')!).render(
        <StrictMode>
            <AppErrorBoundary>
                <App />
            </AppErrorBoundary>
        </StrictMode>,
    );
});
