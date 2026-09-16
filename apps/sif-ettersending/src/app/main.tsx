import { initApm } from '@sif/apm';
import { EttersendelseApp } from '@navikt/sif-app-register';
import { injectDecoratorClientSide } from '@navikt/nav-dekoratoren-moduler';
import { getMaybeEnv } from '@navikt/sif-common-env';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { enableMocking } from '../../mock/msw/enableMocking';
import App from './App';

void initApm({ app: EttersendelseApp.key, namespace: 'dusseldorf', version: getMaybeEnv('APP_VERSION') });

if (import.meta.env.INJECT_DECORATOR) {
    injectDecoratorClientSide({
        env: 'dev',
        params: {
            simple: true,
            chatbot: false,
        },
    });
}

enableMocking().then(() => {
    createRoot(document.getElementById('root')!).render(
        <StrictMode>
            <App />
        </StrictMode>,
    );
});
