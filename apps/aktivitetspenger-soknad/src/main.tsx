import { initApm } from '@sif/apm';
import { AktivitetspengerSoknadApp } from '@navikt/sif-app-register';
import { getMaybeEnv } from '@navikt/sif-common-env';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { enableMocking } from '../mock/enableMocking';
import { App } from './App';

void initApm({ app: AktivitetspengerSoknadApp.key, namespace: 'dusseldorf', version: getMaybeEnv('APP_VERSION') });

const renderApp = () => {
    createRoot(document.getElementById('root')!).render(
        <StrictMode>
            <App />
        </StrictMode>,
    );
};

void enableMocking()
    .then(renderApp)
    .catch((error: unknown) => {
        // eslint-disable-next-line no-console
        console.error('Kunne ikke starte MSW', error);
        renderApp();
    });
