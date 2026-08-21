import { initApm } from '@sif/apm';
import { AktivitetspengerApp } from '@navikt/sif-app-register';
import { getMaybeEnv } from '@navikt/sif-common-env';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { enableMocking } from '../mock/enableMocking';
import { App } from './App';

void initApm({ app: AktivitetspengerApp.key, namespace: 'dusseldorf', version: getMaybeEnv('APP_VERSION') });

enableMocking().then(() => {
    createRoot(document.getElementById('root')!).render(
        <StrictMode>
            <App />
        </StrictMode>,
    );
});
