import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { injectDecoratorClientSide } from '@navikt/nav-dekoratoren-moduler';
import { getMaybeEnv } from '@navikt/sif-common-env';
import { enableMocking } from '../../mock/enableMocking';
import App from './App';

if (getMaybeEnv('INJECT_DECORATOR') === 'true') {
    injectDecoratorClientSide({
        env: 'dev',
        params: {
            simple: false,
            chatbot: true,
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
