import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { enableMocking } from '../mock/enableMocking';
import { App } from './App';
import { AppErrorBoundary } from './app/setup/app-error-boundary/AppErrorBoundary';

enableMocking().then(() => {
    createRoot(document.getElementById('root')!).render(
        <StrictMode>
            <AppErrorBoundary>
                <App />
            </AppErrorBoundary>
        </StrictMode>,
    );
});
