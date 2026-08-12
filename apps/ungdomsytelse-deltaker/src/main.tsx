import { init } from '@nais/apm';
import { getMaybeEnv } from '@navikt/sif-common-env';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { enableMocking } from '../mock/enableMocking';
import App from './App';

void init({ app: 'ungdomsytelse-deltaker', namespace: 'k9saksbehandling', version: getMaybeEnv('APP_VERSION') });

enableMocking().then(() => {
    createRoot(document.getElementById('root')!).render(
        <StrictMode>
            <App />
        </StrictMode>,
    );
});
