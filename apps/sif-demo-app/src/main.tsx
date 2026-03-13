import './sentry/instrument'; // Must be first import

import { AppErrorBoundary } from '@app/setup/wrappers/AppErrorBoundary';
import { injectDecoratorClientSide } from '@navikt/nav-dekoratoren-moduler';
import { reactErrorHandler } from '@sentry/react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { enableMocking } from '../mock/enableMocking';
import { App } from './App';

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
    createRoot(document.getElementById('root')!, {
        onUncaughtError: reactErrorHandler(),
        onCaughtError: reactErrorHandler(),
        onRecoverableError: reactErrorHandler(),
    }).render(
        <StrictMode>
            <AppErrorBoundary>
                <App />
            </AppErrorBoundary>
        </StrictMode>,
    );
});
