import { createRoot } from 'react-dom/client';
import App from './App';
import { getMaybeEnv } from '@navikt/sif-common-env';
import { injectDecoratorClientSide } from '@navikt/nav-dekoratoren-moduler';
import { enableMocking } from '../../mock/msw/enableMocking';
import { StrictMode } from 'react';

if (getMaybeEnv('INJECT_DECORATOR') === 'true') {
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
