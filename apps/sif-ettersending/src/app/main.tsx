import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { injectDecoratorClientSide } from '@navikt/nav-dekoratoren-moduler';
import { enableMocking } from '../../mock/msw/enableMocking';
import App from './App';

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
