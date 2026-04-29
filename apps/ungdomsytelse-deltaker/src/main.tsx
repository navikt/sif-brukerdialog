import './sentry/instrument';

import { reactErrorHandler } from '@sentry/react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { enableMocking } from '../mock/enableMocking';
import App from './App';

enableMocking().then(() => {
    createRoot(document.getElementById('root')!, {
        onUncaughtError: reactErrorHandler(),
        onCaughtError: reactErrorHandler(),
        onRecoverableError: reactErrorHandler(),
    }).render(
        <StrictMode>
            <App />
        </StrictMode>,
    );
});
