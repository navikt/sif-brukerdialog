import { initFromConfigUrl } from '@nais/apm';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { enableMocking } from '../mock/enableMocking';
import { App } from './App';

void initFromConfigUrl('/nais.json', { app: 'aktivitetspenger-innsyn', namespace: 'dusseldorf' });

enableMocking().then(() => {
    createRoot(document.getElementById('root')!).render(
        <StrictMode>
            <App />
        </StrictMode>,
    );
});
